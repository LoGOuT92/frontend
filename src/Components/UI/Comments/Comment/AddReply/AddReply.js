import React, { useState, useEffect } from "react";
import styles from "./AddReply.module.css";

export default function AddReply(props) {
  const [content, setContent] = useState("");
  const sendReply = () => {
    props.submit(content);
    setContent("");
  };

  return (
    <div className={styles.addReplyContainer}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button className="btn btn-primary" onClick={sendReply}>
        Dodaj
      </button>
    </div>
  );
}
