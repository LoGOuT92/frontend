import React from "react";
import styles from "./NextMatch.module.css";
import { Link } from "react-router-dom";

export default function NextMatch(props) {
  const { HomeTeam, AwayTeam, Date, _id } = props.match;
  return (
    <div className={styles.NextMatchContainer}>
      <Link to={`/nextMatch/${_id}`}>
        <div className={styles.LogosContainer}>
          <div>
            <img
              src={`http://localhost:3001/public/uploads/${HomeTeam.Logo}`}
              alt="Home Team Logo"
            />
            <div>
              <h5>{HomeTeam.Name}</h5>
            </div>
          </div>
          <div className={styles.content}>
            <div>Nstępny mecz</div>
            <div>
              <h2>Vs</h2>
            </div>
            <div>{Date}</div>
          </div>
          <div>
            <img
              src={`http://localhost:3001/public/uploads/${AwayTeam.Logo}`}
              alt="Away Team Logo"
            />
            <div>
              <h5>{AwayTeam.Name}</h5>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
