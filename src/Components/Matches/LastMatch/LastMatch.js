import React from "react";
import styles from "./LastMatch.module.css";
import logo1 from "../../../assets/images/Logos/milan.png";
import logo2 from "../../../assets/images/Logos/lazio.png";
import { Link } from "react-router-dom";

export default function LastMatch(props) {
  const { HomeTeam, AwayTeam, Date, _id } = props.match;

  return (
    <div className={styles.LastMatchContainer}>
      <Link to={`/lastMatch/${_id}`}>
        <div className={styles.LogosContainer}>
          <div>
            <img src={logo1} alt="logo1"></img>
            <div>
              <h5>{HomeTeam.Name}</h5>
            </div>
          </div>
          <div>
            <h1>{HomeTeam.Score}</h1>
          </div>
          <div className={styles.content}>
            <div>Poprzedni mecz</div>
            <div>
              <h2>Vs</h2>
            </div>
            <div>{Date}</div>
          </div>
          <div>
            <h1>{AwayTeam.Score}</h1>
          </div>

          <div>
            <img src={logo2} alt="logo2"></img>
            <div>
              <h5>{AwayTeam.Name}</h5>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
