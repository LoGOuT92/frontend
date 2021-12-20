import { useEffect, useState } from "react";
import styles from "./PlayerView.module.css";
import SinglePlayerView from "./SinglePlayerView/SinglePlayerView";

export default function PlayerView(props) {
  const positionsArray = ["Goalkeeper", "Defender", "Midfilder", "Forward"];
  const [playersSelectedArray, setplayersSelectedArray] = useState([]);
  const [borderColor, setBorderColor] = useState(false);
  const fun = (x, y, z) => {
    const flagArray = playersSelectedArray.filter((el) => el.SurName === x);
    if (flagArray.length === 0) {
      const player = {
        SurName: x,
        Number: y,
        isSelected: true,
      };
      const freshArray = [...playersSelectedArray];
      freshArray.push(player);
      setplayersSelectedArray(freshArray);
    } else {
      const fiteredArray = playersSelectedArray.filter(
        (el) => el.SurName !== x
      );
      setplayersSelectedArray(fiteredArray);
    }
  };

  useEffect(() => {
    if (playersSelectedArray.length > 11) {
      setBorderColor(true);
    } else {
      setBorderColor(false);
    }
    props.playerArrH(playersSelectedArray);
  }, [playersSelectedArray]);

  return (
    <div className={styles.playerViewContainer}>
      {positionsArray.map((pos) => (
        <div className={styles.playerPositionsView}>
          {props.players.map((player) =>
            player.Positions === pos ? (
              <SinglePlayerView
                key={player._id}
                {...player}
                fun={(x, y, z) => fun(x, y, z)}
                color={borderColor}
              />
            ) : null
          )}
        </div>
      ))}
      <div className={styles.playersSelectedListContainer}>
        Podglad:
        {playersSelectedArray.slice(0, 11).map((x) => (
          <li>{x.SurName}</li>
        ))}
        <label>Rezerwowi:</label>
        {playersSelectedArray.slice(11).map((x) => (
          <li>{x.SurName}</li>
        ))}
      </div>
    </div>
  );
}
