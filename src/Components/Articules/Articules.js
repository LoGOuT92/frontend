import React, { useState, useEffect } from "react";
import styles from "./Articules.module.css";
import Articule from "./Articule/Articule";
import Pagination from "../UI/Pagination/Pagination";
import axios from "axios";

export default function Articules() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/post");
      const data = res.data.posts;
      setPosts(data.reverse().slice(2));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className={styles.ArticulesContainner}>
      <div className={styles.ArticulesRow}>
        {/* {posts.map(articule=><Articule key={articule.id} {...articule} />)} */}
        {posts.length > 0 ? (
          <Pagination
            data={posts}
            RenderComponent={Articule}
            title="Posts"
            pageLimit={posts.length / 6}
            dataLimit={6}
          />
        ) : (
          <h1>No Posts to display</h1>
        )}
      </div>
    </div>
  );
}
