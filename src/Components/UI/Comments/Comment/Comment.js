import React, { useEffect, useState, useContext } from "react";
import styles from "./Comment.module.css";
import LoadingIcon from "../../../UI/LoadingIcon/LoadingIcon";
import Replies from "./Replies/Replies";
import AddReply from "./AddReply/AddReply";
import axios from "axios";
import AuthContext from "../../../../Context/authContext";

export default function Comment(props) {
  const [like, setLike] = useState(0);
  const auth = useContext(AuthContext);
  const [visibility, setVisibility] = useState(false);
  const [textAreaVisibility, setTextAreaVisibility] = useState(false);
  const [deleteVisibility, setDeleteVisibility] = useState(false);
  const [editCommentvalue, setEditCommentvalue] = useState("");
  const { _id } = JSON.parse(window.localStorage.getItem("user"))
    ? JSON.parse(window.localStorage.getItem("user"))
    : "";
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [replays, setReplays] = useState([]);
  const getComId = (value) => {
    props.likesCountHandler(props._id, value);
  };
  const likeCount = () => {
    if (props.likes.length > 0) {
      const likevalue = [];
      props.likes.map((x) => likevalue.push(x.value));
      setLike(likevalue.reduce((a, b) => a + b));
    }
    if (props.likes.length === 0) {
      setLike(0);
      setValue(0);
    }
    console.log(props.user.image);
    const userID = JSON.parse(window.localStorage.getItem("user"));
    if (userID) {
      const found = props.likes.find((x) => x.user === userID._id);
      if (found) {
        setValue(found.value);
      } else {
        setValue(0);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    likeCount();
    setReplays(props.repies);
    setEditCommentvalue(props.content);
  }, []);
  useEffect(() => {
    likeCount();
  }, [props]);

  const submit = async (term) => {
    const userID = JSON.parse(window.localStorage.getItem("user"));
    const tokenDataJson = window.localStorage.getItem("token-data");
    const tokenData = JSON.parse(tokenDataJson);
    const date = new Date();
    try {
      const res = await axios.post(
        `http://localhost:3001/api/comments/reply/${props.id}`,
        {
          content: term,
          _id: userID._id,
          commentID: props._id,
          time: date.toLocaleString("pl", {
            timeStyle: "short",
          }),
          dateTime: date.toLocaleString("pl", {
            dateStyle: "short",
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        }
      );
      setReplays(res.data.repies.reverse());
      setVisibility(false);
      setLoading(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  const likesReplyCountHandler = async (repID, val) => {
    const userID = JSON.parse(window.localStorage.getItem("user"));
    try {
      const res = await axios.post(
        `http://localhost:3001/api/likeReplyCount/${props.id}`,
        {
          commentID: props._id,
          repID: repID,
          user: userID._id,
          value: val,
        }
      );

      setReplays(res.data.repies.reverse());
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const editComment = async () => {
    const tokenDataJson = window.localStorage.getItem("token-data");
    const tokenData = JSON.parse(tokenDataJson);
    const date = new Date();
    try {
      const res = await axios.put(
        `http://localhost:3001/api/post/comments/${props.id}`,
        {
          commentID: props._id,
          value: editCommentvalue,
          time: date.toLocaleString("pl", {
            timeStyle: "short",
          }),
          dateTime: date.toLocaleString("pl", {
            dateStyle: "short",
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        }
      );
      setEditCommentvalue(res.data.content);
      setTextAreaVisibility(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteReply = async (id) => {
    const tokenDataJson = window.localStorage.getItem("token-data");
    const tokenData = JSON.parse(tokenDataJson);
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:3001/api/post/commentsReplyDelete/${props.id}`,
        {
          commentID: props._id,
          replyID: id,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        }
      );
      setReplays(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(props.user.image);

  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          {props.user ? (
            <>
              {" "}
              <div className={styles.CommentContainer}>
                <div className={styles.commentContent}>
                  <div className={styles.user}>
                    <div className={styles.avatar}>
                      <img
                        src={`http://localhost:3001/public/uploads/${props.user.image}`}
                      />
                    </div>
                    <div className={styles.info}>
                      <label>{props.user.username}</label>
                      <label>{props.dateTime}</label>
                      <label>{props.time}</label>
                    </div>
                  </div>
                  <div className={styles.comment}>
                    {textAreaVisibility ? (
                      <>
                        <textarea
                          style={{ width: "100%", borderRadius: "10px" }}
                          value={editCommentvalue}
                          onChange={(e) => setEditCommentvalue(e.target.value)}
                        ></textarea>
                        <div>
                          <button
                            className="btn btn-primary"
                            onClick={() => editComment()}
                          >
                            zapisz
                          </button>
                        </div>
                      </>
                    ) : (
                      editCommentvalue
                    )}
                    <div className={styles.interactionsContainer}>
                      {auth.isModerator ||
                      (auth.isAdmin && auth.isAuthenticated) ||
                      props.user._id == _id ? (
                        <div className={styles.editOptions}>
                          {deleteVisibility ? (
                            <div>
                              <button
                                className="btn btn-danger"
                                onClick={() => props.deleteComment(props._id)}
                              >
                                Usun!
                              </button>
                            </div>
                          ) : null}
                          <svg
                            viewBox="0 0 24 24"
                            className={styles.editOption}
                            onClick={() =>
                              setTextAreaVisibility(!textAreaVisibility)
                            }
                          >
                            <path
                              fill="currentColor"
                              d="M11 20V22H3C1.9 22 1 21.1 1 20V4C1 2.9 1.9 2 3 2H21C22.1 2 23 2.9 23 4V12.1L22.8 11.9C22.3 11.4 21.7 11.1 21 11.1V6H3V20H11M21.4 13.3L22.7 14.6C22.9 14.8 22.9 15.2 22.7 15.4L21.7 16.4L19.6 14.3L20.6 13.3C20.7 13.2 20.8 13.1 21 13.1C21.2 13.1 21.3 13.2 21.4 13.3M21.1 16.9L15.1 23H13V20.9L19.1 14.8L21.1 16.9Z"
                            />
                          </svg>
                          <svg
                            viewBox="0 0 24 24"
                            className={styles.deleteOption}
                            onClick={() =>
                              setDeleteVisibility(!deleteVisibility)
                            }
                          >
                            <path
                              fill="currentColor"
                              d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                            />
                          </svg>
                        </div>
                      ) : null}
                      <div className={styles.likesContainer}>
                        {props.user._id == _id ? null : (
                          <svg
                            viewBox="0 0 24 24"
                            className={styles.like}
                            onClick={() => getComId(1)}
                            style={
                              value === 1 ? { color: "rgb(76, 241, 10)" } : null
                            }
                          >
                            <path
                              fill="currentColor"
                              d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z"
                            />
                          </svg>
                        )}
                        <div
                          className={styles.likecount}
                          style={
                            like < 0
                              ? { borderColor: "rgb(255, 0, 0)" }
                              : { borderColor: "rgb(76, 241, 10)" }
                          }
                        >
                          {like}
                        </div>
                        {props.user._id == _id ? null : (
                          <svg
                            viewBox="0 0 24 24"
                            className={styles.dislike}
                            style={
                              value === -1 ? { color: "rgb(255, 0, 0)" } : null
                            }
                            onClick={() => getComId(-1)}
                          >
                            <path
                              fill="currentColor"
                              d="M19,15V3H23V15H19M15,3A2,2 0 0,1 17,5V15C17,15.55 16.78,16.05 16.41,16.41L9.83,23L8.77,21.94C8.5,21.67 8.33,21.3 8.33,20.88L8.36,20.57L9.31,16H3C1.89,16 1,15.1 1,14V12C1,11.74 1.05,11.5 1.14,11.27L4.16,4.22C4.46,3.5 5.17,3 6,3H15M15,5H5.97L3,12V14H11.78L10.65,19.32L15,14.97V5Z"
                            />
                          </svg>
                        )}
                      </div>
                      <label onClick={() => setVisibility(!visibility)}>
                        Odpowiedz
                      </label>
                    </div>
                  </div>
                </div>
                {visibility ? (
                  <AddReply submit={(term) => submit(term)} />
                ) : null}
                {replays.length > 0
                  ? replays.map((reply) => (
                      <Replies
                        key={reply._id}
                        postID={props.id}
                        commID={props._id}
                        deleteReply={(id) => deleteReply(id)}
                        {...reply}
                        likesReplyCountHandler={(repID, val) =>
                          likesReplyCountHandler(repID, val)
                        }
                      />
                    ))
                  : null}
              </div>
            </>
          ) : null}
        </>
      )}
    </>
  );
}
