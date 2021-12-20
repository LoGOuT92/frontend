import React, { useState, useEffect } from "react";
import styles from "./Player.module.css";
import foto from "../../../../assets/images/Logos/player-background.png";

export default function Player(props) {
  const [color, setColor] = useState("");
  const { Positions, Name, SurName, Number } = props;
  useEffect(() => {
    if (Positions === "Goalkeeper") setColor("orange");
    if (Positions === "Defender") setColor("rgb(12, 89, 231)");
    if (Positions === "Midfilder") setColor("rgb(38, 231, 20)");
    if (Positions === "Forward") setColor("rgb(255, 15, 15)");
  }, []);

  return (
    <div className={styles.playerContainer} style={{ borderColor: color }}>
      <div className={styles.player}>
        <img src={foto}></img>
        <div className={styles.name}>{Name}</div>
        <div className={styles.surname}>{SurName}</div>
        <div className={styles.line}></div>
        <div className={styles.number}>{Number}</div>
      </div>
    </div>
  );
}
