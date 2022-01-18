import React from "react";
import styles from "./matchAdmin.module.css";
import { useRef, useState } from "react";
import axios from "axios";

export default function MatchAdmin() {
  const [setting, setSetting] = useState(false);
  const [layout, setLayout] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const imageRef1 = useRef();
  const imageRef2 = useRef();
  const [match, setMatch] = useState({
    gospodarze: "",
    goscie: "",
    data: "",
    gospodarzeLogo: "",
    goscieLogo: "",
  });
  const live = "Obecny";
  const changeStyle = (e, x) => {
    e.preventDefault();
    setSetting(true);
    setLayout(x);
  };
  const addMatch = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const logo1 = imageRef1.current;
    const logo2 = imageRef2.current;
    formData.append("HomeTeam", match.gospodarze);
    formData.append("AwayTeam", match.goscie);
    formData.append("Date", match.data);
    formData.append("image", logo1.files[0]);
    formData.append("image", logo2.files[0]);
    try {
      const res = await axios.post(
        "http://localhost:3001/api/match/createMatch",

        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      setMatch({
        gospodarze: "",
        goscie: "",
        data: "",
      });
      setResponse(res.status);
    } catch (ex) {
      console.log(ex);
      setError(ex);
    }
  };

  return (
    <div className={styles.matchAdminContainer}>
      <div className={styles.matchConfig}>
        <div
          onClick={(e) => changeStyle(e, live)}
          className={`${layout === "Obecny" ? styles.borderActive : null}`}
        >
          Dodaj nowy mecz
        </div>
      </div>
      <div className={`${setting ? styles.visibility : styles.config}`}>
        <h3>Ustawienia : </h3>
        <div className={styles.contentMatch}>
          <div className={styles.temasConfing}>
            Gospodarze:
            <input
              type="text"
              value={match.gospodarze}
              onChange={(e) =>
                setMatch({ ...match, gospodarze: e.target.value })
              }
            ></input>
            Logo
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              ref={imageRef1}
              onChange={(e) =>
                setMatch({ ...match, gospodarzeLogo: e.target.files })
              }
            />
          </div>
          <div className={styles.temasConfing}>
            Goscie:
            <input
              type="text"
              value={match.goscie}
              onChange={(e) => setMatch({ ...match, goscie: e.target.value })}
            ></input>
            Logo
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              ref={imageRef2}
              onChange={(e) =>
                setMatch({ ...match, goscieLogo: e.target.files })
              }
            />
          </div>
        </div>
        <div className={styles.dateConfig}>
          Data:
          <input
            type="date"
            value={match.data}
            onChange={(e) => setMatch({ ...match, data: e.target.value })}
          ></input>
        </div>
        <div className={styles.summary}>
          {match.gospodarze} vs {match.goscie}
        </div>
        <div className={styles.addMatchButton}>
          <button
            type="button"
            className="btn btn-primary"
            disabled={
              match.gospodarze && match.goscie && match.data ? false : true
            }
            onClick={addMatch}
          >
            Dodaj mecz
          </button>
        </div>
      </div>
      {error ? (
        <div className="alert alert-danger">Cos poszlo nie tak...</div>
      ) : null}
      {response ? (
        <div className="alert alert-success">Dodano nowy mecz!</div>
      ) : null}
    </div>
  );
}
