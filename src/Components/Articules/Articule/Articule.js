import React from "react";
import styles from "./Articule.module.css";
import foto from "../../../assets/images/articules/main.png";
import { Link } from "react-router-dom";

export default function Articule(props) {
  // const commentsValue=props.data.comments.comment.length

  const { header, slug, image } = props.data;
  return (
    <Link to={`articules/${slug}`}>
      <div className={styles.ArticulesContainner}>
        <div className={styles.ArticuleImagesContainner}>
          <img
            src={`http://localhost:3001/public/uploads/${image}`}
            alt="ArticuleImage"
          />
        </div>
        <div className={styles.ArticuleContent}>
          {header}
          {/* <label>Liczba Komentarzy: {commentsValue}</label> */}
        </div>
      </div>
    </Link>
  );
}
