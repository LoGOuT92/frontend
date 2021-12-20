import React, { useRef, useState } from "react";
import axios from "axios";
import styles from "./Admin.module.css";

export default function Admin() {
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const imageRef = useRef();

  const submit = (e) => {
    e.preventDefault();
    createPost();
  };
  const createPost = async () => {
    const { _id } = JSON.parse(window.localStorage.getItem("user"));
    const formData = new FormData();
    const x = imageRef.current;
    formData.append("header", header);
    formData.append("context", content);
    formData.append("author", _id);
    formData.append("image", x.files[0]);
    try {
      const res = await axios.post("http://localhost:3001/api/post", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      setResponse(res.status);
      setContent("");
      setHeader("");
    } catch (ex) {
      setError(ex);
    }
  };

  return (
    <div className={styles.AdminPanel}>
      <label>Naglowek</label>
      <textarea
        value={header}
        onChange={(e) => setHeader(e.target.value)}
      ></textarea>
      <label>Tresc</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="mb-3 form-check">
        <input
          type="file"
          name="image"
          accept="image/png, image/jpeg"
          ref={imageRef}
          // onChange={(e) => setUserData({ ...userData, image: e.target.files })}
        />
      </div>
      <button className="btn btn-primary" onClick={submit}>
        Dodaj!
      </button>
      {error ? (
        <div className="alert alert-danger">Cos poszło nie tak...</div>
      ) : null}
      {response ? (
        <div className="alert alert-success">Dodano artykuł!</div>
      ) : null}
    </div>
  );
}
