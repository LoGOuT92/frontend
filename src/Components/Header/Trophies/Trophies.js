import { useEffect, useState } from "react";
import styles from "./Trophies.module.css";
import Intercontinental from "../../../assets/images/Trophies/Puchar Interkontynentalny.png";
import UCL from "../../../assets/images/Trophies/UCL.png";
import superCupEU from "../../../assets/images/Trophies/superPucharEU.png";
import PucharWloch from "../../../assets/images/Trophies/Puchar Włoch.png";
import PucharZdobywcow from "../../../assets/images/Trophies/PucharZzdobywcow.png";
import SuperPucharWloch from "../../../assets/images/Trophies/SuperPucharWloch.png";
import Mistrz from "../../../assets/images/Trophies/SerieA.png";
import axios from "axios";
import LoadingIcon from "../../UI/LoadingIcon/LoadingIcon";

export default function Trophies() {
  const [loading, setLoading] = useState(true);
  const [trophies, setTrophies] = useState([]);
  const fethTrophy = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/trophies");
      setTrophies(res.data.trophies);
      setLoading(false);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    fethTrophy();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className={styles.TrophiesContainer}>
          <div className={styles.cupRow}>
            <div className={styles.trophyTypeConteiner}>
              <label>
                <h5>Puchar Interkontynentalny</h5>
              </label>
              <div className={styles.trophyType}>
                {trophies.map((x) =>
                  x.Name === "Puchar Interkontynentalny" ? (
                    <div className={styles.singleTrophy}>
                      <img src={Intercontinental} />
                      <label>{x.Date}</label>
                    </div>
                  ) : null
                )}
              </div>
            </div>
            <div className={styles.trophyTypeConteiner}>
              <label>
                <h5>Liga Mistrzów</h5>
              </label>
              <div className={styles.trophyType}>
                {trophies.map((x) =>
                  x.Name === "Liga mistrzów" ? (
                    <div className={styles.singleTrophy}>
                      <img src={UCL} />
                      <label>{x.Date}</label>
                    </div>
                  ) : null
                )}
              </div>
            </div>
            <div className={styles.trophyTypeConteiner}>
              <label>
                <h5>Superpuchar UEFA</h5>
              </label>
              <div className={styles.trophyType}>
                {trophies.map((x) =>
                  x.Name === "Superpuchar UEFA" ? (
                    <div className={styles.singleTrophy}>
                      <img src={superCupEU} />
                      <label>{x.Date}</label>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
          {/* asdasd */}
          <div className={styles.cupRow}>
            <div className={styles.trophyTypeConteiner}>
              <label>
                <h5>Puchar Włoch</h5>
              </label>
              <div className={styles.trophyType}>
                {trophies.map((x) =>
                  x.Name === "Puchar Włoch" ? (
                    <div className={styles.singleTrophy}>
                      <img src={PucharWloch} />
                      <label>{x.Date}</label>
                    </div>
                  ) : null
                )}
              </div>
            </div>
            <div className={styles.trophyTypeConteiner}>
              <label>
                <h5>Puchar Zdobywców Pucharów</h5>
              </label>
              <div className={styles.trophyType}>
                {trophies.map((x) =>
                  x.Name === "Puchar Zdobywców Pucharów" ? (
                    <div className={styles.singleTrophy}>
                      <img src={PucharZdobywcow} />
                      <label>{x.Date}</label>
                    </div>
                  ) : null
                )}
              </div>
            </div>
            <div className={styles.trophyTypeConteiner}>
              <label>
                <h5>Superpuchar Włoch</h5>
              </label>
              <div className={styles.trophyType}>
                {trophies.map((x) =>
                  x.Name === "Superpuchar Włoch" ? (
                    <div className={styles.singleTrophy}>
                      <img src={SuperPucharWloch} />
                      <label>{x.Date}</label>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
          {/* asdasd */}
          <div className={styles.cupRow}>
            <div className={styles.trophyTypeConteiner}>
              <label>
                <h5>Mistrz Włoch</h5>
              </label>
              <div className={styles.trophyType}>
                {trophies.map((x) =>
                  x.Name === "Mistrz Włoch" ? (
                    <div className={styles.singleTrophy}>
                      <img src={Mistrz} />
                      <label>{x.Date}</label>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
