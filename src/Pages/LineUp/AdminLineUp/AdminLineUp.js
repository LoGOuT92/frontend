import { useEffect, useState } from "react";
import styles from "./AdminLineUp.module.css";
import PlayerView from "./PlayerView/PlayerView";
import FormationSelect from "./FormationSelect/FormationSelect";
import axios from "axios";
import AwayTeamInput from "./PlayerView/AwayTeamInput/AwayTeamInput";
import LoadingIcon from "../../../Components/UI/LoadingIcon/LoadingIcon";

export default function AdminLineUp(props) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState({
    home: "",
    away: "",
  });

  const fetchPlayers = async () => {
    const res = await axios.get("http://localhost:3001/api/players");
    setPlayers(res.data.players);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);
  useEffect(() => {
    props.changeColor(color);
  }, [color]);

  return (
    <div
      className={styles.AdminLineUp}
      style={props.visibility ? { display: "none" } : { display: "flex" }}
    >
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          Panel Admina
          <div className={styles.formationSet}>
            <FormationSelect formation={props.formationH} />
            <FormationSelect formation={props.formationA} />
          </div>
          <div className={styles.homeTeamSelect}>
            <PlayerView players={players} {...props} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "white",
                gap: "5px",
                alignItems: "flex-start",
                width: "max-content",
              }}
            >
              <div>
                <input
                  type="color"
                  id="head"
                  name="head"
                  value={color.home}
                  onChange={(e) => setColor({ ...color, home: e.target.value })}
                />
                <label for="head">Kolor gospodarzy</label>
              </div>

              <div>
                <input
                  type="color"
                  id="body"
                  name="body"
                  value={color.away}
                  onChange={(e) => setColor({ ...color, away: e.target.value })}
                />
                <label for="body">Kolor gosci</label>
              </div>
            </div>
            <AwayTeamInput {...props} />
          </div>
        </>
      )}
    </div>
  );
}
