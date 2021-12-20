import React, { useState, useEffect } from "react";
import styles from "./MainArticules.module.css";
import MainArticule from "./MainArticule/MainArticule";
import axios from "axios";

export default function MainArticules() {
  const [articule, setArticule] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:3001/api/post");
    setArticule(res.data.posts.reverse().slice(0, 2));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.MainArticulesContainer}>
      {articule.map((articule) => (
        <MainArticule key={articule.slug} {...articule} />
      ))}
    </div>
  );
}
