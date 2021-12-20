import React, { useEffect, useState, useContext } from "react";
import styles from "./MatchPage.module.css";
import logo1 from "../../assets/images/Logos/milan.png";
import logo2 from "../../assets/images/Logos/inter.png";
// import PitchLineUp from '../LineUp/PitchLineUp/PitchLineUp';
import LineUp from "../LineUp/LineUp";
import Comments from "../../Components/UI/Comments/Comments";
import LoadingIcon from "../../Components/UI/LoadingIcon/LoadingIcon";
import AuthContext from "../../Context/authContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentForm from "../../Components/UI/CommentsForm/CommentForm";

export default function MatchPage(props) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [match, setMatch] = useState({});
  const [comments, setComments] = useState([]);
  const [goal, setGoal] = useState({
    minute: 0,
    score: "",
  });

  const auth = useContext(AuthContext);
  const fetchMatch = async (props) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/getMatch/${id}`);
      setMatch(res.data.match);
      if (res.data.match.comments) {
        setComments(res.data.match.comments.reverse());
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  useEffect((e) => {
    fetchMatch();
  }, []);

  const addGoal = async (x) => {
    const teamScore = x;
    try {
      const res = await axios.put(
        `http://localhost:3001/api/match/addGoal/${id}`,
        {
          team: teamScore,
          minute: goal.minute,
          score: goal.score,
        }
      );
      setGoal({
        minute: 0,
        score: "",
      });
      setMatch(res.data.match);
    } catch (err) {
      console.log(err);
    }
  };
  const subGoal = async (x) => {
    console.log(x);
    const teamScore = x;
    try {
      const res = await axios.put(
        `http://localhost:3001/api/match/subGoal/${id}`,
        {
          team: teamScore,
        }
      );
      setMatch(res.data.match);
      console.log(res.data.match);
    } catch (err) {
      console.log(err);
    }
  };
  const updateComments = (comment) => {
    const arrayComents = comment.reverse();
    setComments(arrayComents);
  };
  const likesCountHandler = async (commID, value) => {
    const userID = JSON.parse(window.localStorage.getItem("user"));
    try {
      const res = await axios.post(
        `http://localhost:3001/api/likeCount/${id}`,
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
  console.log(comments);
  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className={styles.MatchPageContainer}>
          <div className={styles.logos}>
            <div className={styles.logo}>
              <img src={logo1} alt="Logo Team Home" />
              <div>
                <h2>{match.HomeTeam.Name}</h2>
              </div>
              <div className={styles.goalScorer}>
                {match.HomeTeam.Goal
                  ? match.HomeTeam.Goal.map((x) => (
                      <label>
                        <label>{x.Minutes}'</label>
                        <label>{x.Scorer}</label>
                      </label>
                    ))
                  : null}
              </div>
            </div>
            <div>
              <h1>{match.HomeTeam.Score}</h1>
              {auth.isAdmin || auth.isModerator ? (
                <div>
                  <svg viewBox="0 0 24 24" onClick={() => subGoal("HomeTeam")}>
                    <path
                      fill="currentColor"
                      d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
            <div className={styles.score}>
              <h1>:</h1>
              <div className={styles.addScore}>
                <input
                  type="number"
                  style={{ width: "40px" }}
                  value={goal.minute}
                  onChange={(e) => setGoal({ ...goal, minute: e.target.value })}
                ></input>
                <input
                  value={goal.score}
                  onChange={(e) => setGoal({ ...goal, score: e.target.value })}
                ></input>
              </div>
            </div>
            <div>
              <h1>{match.AwayTeam.Score}</h1>
              {auth.isAdmin || auth.isModerator ? (
                <div>
                  <svg viewBox="0 0 24 24" onClick={() => subGoal("AwayTeam")}>
                    <path
                      fill="currentColor"
                      d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
            <div className={styles.logo}>
              <img src={logo2} alt="Logo Team Away" />
              <div>
                <h2>{match.AwayTeam.Name}</h2>
              </div>
              {match.AwayTeam.Goal
                ? match.AwayTeam.Goal.map((x) => (
                    <label>
                      <label>{x.Minutes}'</label>
                      <label>{x.Scorer}</label>
                    </label>
                  ))
                : null}
            </div>
          </div>
          <div className={styles.test}>
            <div>
              {auth.isAdmin || auth.isModerator ? (
                <div style={{ color: "blue" }}>
                  <svg viewBox="0 0 24 24" onClick={() => addGoal("HomeTeam")}>
                    <path
                      fill="currentColor"
                      d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
            <div>
              {auth.isAdmin || auth.isModerator ? (
                <div style={{ color: "red" }}>
                  <svg viewBox="0 0 24 24" onClick={() => addGoal("AwayTeam")}>
                    <path
                      fill="currentColor"
                      d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </div>
          {/* <PitchLineUp teams={score.Teams}/> */}
          <LineUp id={id} match={match} />
          {auth.isAuthenticated ? (
            <CommentForm
              {...props}
              id={id}
              collection={"match"}
              updateComments={(comment) => updateComments(comment)}
              commets={comments}
            />
          ) : (
            <div className="alert alert-danger" role="alert">
              Musisz byc zalogowany by dodac komentarz
            </div>
          )}
          {/* <Comments
            commets={comments}
            collection={"match"}
            id={id}
            likesCountHandler={(comID, value) =>
              likesCountHandler(comID, value)
            }
          /> */}
        </div>
      )}
    </>
  );
}
