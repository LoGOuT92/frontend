import React from "react";
import styles from "./AwayTeamInput.module.css";
import { useEffect, useState } from "react";

export default function AwayTeamInput(props) {
  const [awayTeam, setAwayTeam] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [singlePlayer, setsinglePlayer] = useState({
    Number: 0,
    SurName: "",
  });
  useEffect(() => {
    singlePlayer.Number.length === 0 ||
    singlePlayer.SurName.length === 0 ||
    singlePlayer.Number == 0
      ? setDisabled(true)
      : setDisabled(false);
    if (singlePlayer.Number < 0) {
      setsinglePlayer({ ...singlePlayer, Number: 0 });
    }
    if (singlePlayer.Number > 99) {
      setsinglePlayer({ ...singlePlayer, Number: 99 });
    }
  }, [singlePlayer]);
  const addPlayer = () => {
    const tempTable = [...awayTeam];
    tempTable.push(singlePlayer);
    setAwayTeam(tempTable);
    setsinglePlayer({
      Number: 0,
      SurName: "",
    });
  };
  useEffect(() => {
    props.playerArrA(awayTeam);
  }, [awayTeam]);

  return (
    <div className={styles.awayTeamInputContainer}>
      <div className={styles.awayTeamInputs}>
        <div className={styles.awayTeamLogic}>
          <input
            type="number"
            className={styles.setNumberInput}
            placeholder="Numer"
            value={singlePlayer.Number}
            onChange={(e) =>
              setsinglePlayer({
                ...singlePlayer,
                Number: parseInt(e.target.value),
              })
            }
          ></input>
          <input
            type="text"
            placeholder="Nazwisko"
            value={singlePlayer.SurName}
            onChange={(e) =>
              setsinglePlayer({ ...singlePlayer, SurName: e.target.value })
            }
          ></input>
          <button
            disabled={disabled}
            onClick={addPlayer}
            className="btn btn-danger"
          >
            Dodaj
          </button>
          <label>Liczba graczy: {awayTeam.length}</label>
        </div>
        {awayTeam
          ? awayTeam.reverse().map((x) => (
              <div className={styles.awayTeamList}>
                <label>{x.Number}</label>
                <label>{x.SurName}</label>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
