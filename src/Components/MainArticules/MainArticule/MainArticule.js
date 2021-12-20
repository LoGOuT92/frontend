import React from "react";
import styles from "./MainArticule.module.css";
import foto from "../../../assets/images/articules/main.png";
import { Link } from "react-router-dom";

export default function MainArticule(props) {
  const { header, slug, image } = props;

  return (
    <div className={styles.MainArticuleContainer}>
      <Link to={`articules/${slug}`}>
        <div className={styles.image}>
          <img
            src={`http://localhost:3001/public/uploads/${image}`}
            alt="ArticuleImage"
          />
        </div>
        <div className={styles.header}>
          <label className={styles.label}>{header}</label>
        </div>
      </Link>
    </div>
  );
}
