import React, { useState, useEffect } from "react";
import styles from "./Comments.module.css";
import Comment from "./Comment/Comment";
import axios from "axios";

export default function Comments(props) {
  const [comment, setComment] = useState([]);
  useEffect(() => {
    setComment(props.commets);
  }, [props.commets]);
  const deleteComment = async (comID) => {
    const tokenDataJson = window.localStorage.getItem("token-data");
    const tokenData = JSON.parse(tokenDataJson);
    try {
      const res = await axios.put(
        `http://localhost:3001/api/post/deleteComment/${props.id}`,
        {
          commentID: comID,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
            Collections: props.collection,
          },
        }
      );
      setComment(res.data.comments);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.CommentsContainer}>
      {comment
        ? comment.map((comment) => (
            <Comment
              key={comment._id}
              {...comment}
              {...props}
              deleteComment={(comID) => deleteComment(comID)}
            />
          ))
        : null}
    </div>
  );
}
