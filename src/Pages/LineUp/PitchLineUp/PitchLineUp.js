import React from "react";
import styles from "./PitchLineUp.module.css";
import SinglePlayerAction from "./SinglePlayerAction";

export default function PitchLineUp(props) {
  const setFormation = (color, formation, team) => {
    const returnedArray = [];
    let counter = 0;
    for (let i = 0; i < formation.length - 1; i++) {
      counter += parseInt(formation[i]);
      returnedArray.push(
        <div className={styles.columnLine}>
          {team.slice(counter, counter + formation[i + 1]).map((x) => (
            <div
              className={styles.singlePlayer}
              style={color ? { backgroundColor: color } : null}
            >
              {x.Number}
              <label className={styles.lab}>{x.SurName}</label>
            </div>
          ))}
        </div>
      );
    }
    return returnedArray;
  };
  const plyerMap = (team, reverse) => {
    if (team.length > 0) {
      const array = [];
      array.push(
        <div
          className={styles.HomeSub}
          style={reverse ? { flexDirection: "row-reverse" } : null}
        >
          <div className={styles.playerMap}>
            {team.slice(11).map((x) => (
              <label className={styles.HomeSubLabel}>{x.SurName}</label>
            ))}
          </div>
          <div className={styles.separator}></div>
          <div className={styles.playerMap}>
            {team.slice(0, 11).map((x) => (
              <label className={styles.HomeLabel}>{x.SurName}</label>
            ))}
          </div>
        </div>
      );
      return array;
    }
  };

  return (
    <div className={styles.teamsContainer}>
      {plyerMap(props.match.HomeTeam.Team, false)}
      <div className={styles.lineUpImg}>
        <img src={"https://www.acmilan.com/images/field.svg"}></img>
        <div className={styles.pitchLineUp}>
          <div className={styles.sideTeamLineUp}>
            <div className={styles.columnLine}>
              {props.match.HomeTeam.Team.length > 0 ? (
                <div className={styles.singlePlayer}>
                  {props.match.HomeTeam.Team[0].Number}
                  <label className={styles.lab}>
                    {props.match.HomeTeam.Team[0].SurName}
                  </label>
                </div>
              ) : null}
            </div>
            {setFormation(
              props.match.HomeTeam.Color,
              props.match.HomeTeam.Formation,
              props.match.HomeTeam.Team
            )}
          </div>
          <div className={styles.sideTeamLineUp2}>
            <div className={styles.columnLine}>
              {props.match.AwayTeam.Team.length > 0 ? (
                <div
                  className={styles.singlePlayer}
                  style={{ backgroundColor: "orange" }}
                >
                  {props.match.AwayTeam.Team[0].Number}
                  <label className={styles.lab}>
                    {props.match.AwayTeam.Team[0].SurName}
                  </label>
                </div>
              ) : null}
            </div>
            {setFormation(
              props.match.AwayTeam.Color,
              props.match.AwayTeam.Formation,
              props.match.AwayTeam.Team
            )}
          </div>
        </div>
      </div>
      {plyerMap(props.match.AwayTeam.Team, true)}
    </div>
  );
}
