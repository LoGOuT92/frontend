import React, { useState, useEffect } from "react";
import styles from "./CommentsForm.module.css";
import axios from "axios";

export default function CommentForm(props) {
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({
    comment: "",
  });

  const submit = async (e) => {
    const tokenDataJson = window.localStorage.getItem("token-data");
    const user = JSON.parse(window.localStorage.getItem("user"));
    const tokenData = JSON.parse(tokenDataJson);
    const date = new Date();
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3001/api/post/comments/${props.id}`,
        {
          content: comment,
          _id: user._id,
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
            Collections: props.collection,
          },
        }
      );
      await props.updateComments(res.data.comments);
    } catch (ex) {
      console.log(ex);
    }
    setComment("");
  };
  useEffect(() => {
    if (comment.length === 0 || comment.length >= 2) {
      setErrors({
        comment: "",
      });
    } else {
      setErrors({
        comment: "Komentarz musi mieć minimum 2 znaki!",
      });
    }
  }, [comment]);
  useEffect(() => {
    if (comment.length === 0) {
      setErrors({
        comment: "Komentarz musi mieć minimum 2 znaki!",
      });
    }
  }, [comment]);

  return (
    <div className={styles.CommentFormContainer}>
      <form className={styles.form}>
        <textarea
          className={`form-control ${errors.comment ? "is-invalid" : ""}`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Dodaj komentarz..."
        ></textarea>
        <div className="invalid-feedback">{errors.comment}</div>
        <button className={styles.button} onClick={submit} type="button">
          Dodaj komentarz{" "}
        </button>
      </form>
    </div>
  );
}
