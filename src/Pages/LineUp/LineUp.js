import React, { useEffect, useState, useContext } from "react";
import styles from "./LineUp.module.css";
import PitchLineUp from "./PitchLineUp/PitchLineUp";
import AdminLineUp from "./AdminLineUp/AdminLineUp";
import AuthContext from "../../Context/authContext";
import axios from "axios";

export default function LineUp(props) {
  const [formation, setFormation] = useState({});
  const [visibility, setVisibility] = useState(true);
  const [playersArr, setPlayersArr] = useState({
    home: "",
    away: "",
  });
  const auth = useContext(AuthContext);
  const [color, setColor] = useState({});

  const formationSet = (formation) => {
    const x = Object.values(formation).filter((x) => x > 0);
    x.unshift(1);
    return x;
  };
  const editMatch = async () => {
    const x = Object.values(formation).filter((x) => x > 0);
    x.unshift(1);
    try {
      const res = await axios.put(
        `http://localhost:3001/api/editMatch/${props.id}`,
        {
          HomeTeam: {
            Color: color.home,
            Formation: formationSet(formation.home),
            Team: playersArr.home,
          },
          AwayTeam: {
            Color: color.away,
            Formation: formationSet(formation.away),
            Team: playersArr.away,
          },
        }
      );
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className={styles.LineUpContainer}>
      {auth.isAdmin || auth.isModerator ? (
        <>
          <div>
            <button
              onClick={() => setVisibility(!visibility)}
              className="btn btn-primary"
            >
              Panel Admina
            </button>
          </div>
          <AdminLineUp
            formationH={(x) => setFormation({ ...formation, home: x })}
            formationA={(x) => setFormation({ ...formation, away: x })}
            block={formation}
            playerArrH={(x) => setPlayersArr({ ...playersArr, home: x })}
            playerArrA={(x) => setPlayersArr({ ...playersArr, away: x })}
            changeColor={(x) => setColor(x)}
            visibility={visibility}
          />
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={editMatch}
              style={visibility ? { display: "none" } : null}
            >
              Wyslij!
            </button>
          </div>
        </>
      ) : null}
      <PitchLineUp
        formation={formation}
        players={playersArr}
        color={color}
        {...props}
      />
    </div>
  );
}
