import React from "react";
import styles from "./Match.module.css";
import { Link } from "react-router-dom";

export default function Match(props) {
  const { HomeTeam, AwayTeam, Date, _id } = props.match;

  return (
    <div className={styles.MatchContainer}>
      <Link to={`/match/${_id}`}>
        <div className={styles.LogosContainer}>
          <div>
            <img
              src={`http://localhost:3001/public/uploads/${HomeTeam.Logo}`}
              alt="Home Team Logo"
            />
            <div>
              <h3>{HomeTeam.Name}</h3>
            </div>
          </div>
          <div>
            <h1>{HomeTeam.Score}</h1>
          </div>
          <div className={styles.test}>
            <div>Live</div>
            <div>
              <h1>Vs</h1>
            </div>
            <div>{Date}</div>
          </div>
          <div>
            <h1>{AwayTeam.Score}</h1>
          </div>
          <div>
            <img
              src={`http://localhost:3001/public/uploads/${AwayTeam.Logo}`}
              alt="Away Team Logo"
            />
            <div>
              <h3>{AwayTeam.Name}</h3>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
