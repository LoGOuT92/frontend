import React, { useEffect, useState, useContext } from "react";
import styles from "./ArticulePage.module.css";
import image from "../../assets/images/articules/Przechwytywanie.PNG";
import Comments from "../../Components/UI/Comments/Comments";
import { useParams } from "react-router-dom";
import CommentForm from "../../Components/UI/CommentsForm/CommentForm";
import LoadingIcon from "../../Components/UI/LoadingIcon/LoadingIcon";
import AuthContext from "../../Context/authContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ArticulePage(props) {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);
  const history = useHistory();
  const [adminOptions, setAdminOptions] = useState({
    isEdit: false,
    editHeader: "",
    editContext: "",
  });
  console.log(comments, slug);
  const fetchArticule = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/post/${slug}`);
      const content = res.data.post;
      console.log(res.data.post);
      setData(content);
      if (content.comments) {
        setComments(content.comments.reverse());
      }
    } catch (err) {
      console.log(err);
    }
    setAdminOptions({
      editHeader: data.header,
      editContext: data.context,
    });
    setLoading(false);
  };
  useEffect((e) => {
    fetchArticule();
  }, []);

  const updateComments = (comment) => {
    const arrayComents = comment.reverse();
    setComments(arrayComents);
  };
  const editPost = (e) => {
    e.preventDefault();
    AdminPanel();
  };
  const deletePost = async (e) => {
    const { _id } = data;
    try {
      const res = await axios.delete(`http://localhost:3001/api/post/${_id}`);
      history.push("/");
    } catch (ex) {
      console.log(ex);
    }
  };
  const AdminPanel = () => {
    setAdminOptions({
      ...adminOptions,
      isEdit: !adminOptions.isEdit,
    });
  };
  const sendEdit = async (e) => {
    e.preventDefault();
    const { _id } = data;
    const user = JSON.parse(window.localStorage.getItem("user"));
    try {
      const res = await axios.put(`http://localhost:3001/api/post/${_id}`, {
        header: adminOptions.editHeader,
        context: adminOptions.editContext,
        author: user._id,
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  const likesCountHandler = async (commID, value) => {
    const { _id } = data;
    const userID = JSON.parse(window.localStorage.getItem("user"));
    try {
      const res = await axios.post(
        `http://localhost:3001/api/likeCount/${_id}`,
        {
          commentID: commID,
          user: userID._id,
          value: value,
        }
      );
      if (res.data.comments) {
        setComments(res.data.comments.reverse());
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className={styles.ArticulePageContainer}>
          {auth.isModerator || (auth.isAdmin && auth.isAuthenticated) ? (
            <div
              style={{
                display: "flex",
                padding: "10px",
                margin: "10px",
                gap: "20px",
              }}
            >
              <button className="btn btn-primary" onClick={(e) => editPost(e)}>
                Edytuj Post
              </button>
              <button className="btn btn-danger" onClick={(e) => deletePost(e)}>
                Usun Post
              </button>
            </div>
          ) : null}
          <div className={styles.image}>
            <img
              src={`http://localhost:3001/public/uploads/${data.image}`}
              alt="ArticuleImage"
            />
            <div className={styles.header}>
              <label>{data.header}</label>
              <label>{data.author.username}</label>
            </div>
            {/* admin */}
            {auth.isAdmin || (auth.isModerator && adminOptions.isEdit) ? (
              <textarea
                value={adminOptions.editHeader}
                onChange={(e) =>
                  setAdminOptions({
                    ...adminOptions,
                    editHeader: e.target.value,
                  })
                }
              ></textarea>
            ) : null}
          </div>
          <div className={styles.text}>
            <h5>{data.context}</h5>
            {/* admin */}
            {auth.isAdmin || (auth.isModerator && adminOptions.isEdit) ? (
              <>
                <textarea
                  value={adminOptions.editContext}
                  onChange={(e) =>
                    setAdminOptions({
                      ...adminOptions,
                      editContext: e.target.value,
                    })
                  }
                ></textarea>
                <div>
                  {" "}
                  <button
                    className="btn btn-success"
                    onClick={(e) => sendEdit(e)}
                  >
                    zapisz
                  </button>
                </div>
              </>
            ) : null}
          </div>
          {auth.isAuthenticated ? (
            <CommentForm
              {...props}
              id={slug}
              updateComments={(comment) => updateComments(comment)}
              commets={comments}
            />
          ) : (
            <div className="alert alert-danger" role="alert">
              Musisz byc zalogowany by dodac komentarz
            </div>
          )}
          <Comments
            commets={comments}
            id={data._id}
            likesCountHandler={(comID, value) =>
              likesCountHandler(comID, value)
            }
          />
        </div>
      )}
    </>
  );
}
