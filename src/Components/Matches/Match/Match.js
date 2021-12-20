import React from "react";
import styles from "./Match.module.css";
import logo1 from "../../../assets/images/Logos/milan.png";
import logo2 from "../../../assets/images/Logos/inter.png";
import { Link } from "react-router-dom";

export default function Match(props) {
  const { HomeTeam, AwayTeam, Date, _id } = props.match;

  return (
    <div className={styles.MatchContainer}>
      <Link to={`/match/${_id}`}>
        <div className={styles.LogosContainer}>
          <div>
            <img src={logo1} alt="logoHome"></img>
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
            <img src={logo2} alt="logoAway"></img>
            <div>
              <h3>{AwayTeam.Name}</h3>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
