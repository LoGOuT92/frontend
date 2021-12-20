import React, { useEffect, useState, useContext } from "react";
import styles from "./Trip.module.css";
import axios from "axios";
import AuthContext from "../../../../Context/authContext";

export default function Trip(props) {
  const [visibility, setVisibility] = useState(false);
  const [visibilityActive, setVisibilityActive] = useState(false);
  const [active, setActive] = useState(null);
  const [isSinged, setIsSinged] = useState(false);
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState({
    Name: "",
    SurName: "",
  });
  useEffect(() => {
    setActive(props.IsActive);
    singedCheck();
  }, []);
  const changeVisibility = (e) => {
    e.preventDefault();
    setVisibility(!visibility);
  };
  const singedCheck = () => {
    if (auth.isAuthenticated) {
      const { _id } = JSON.parse(window.localStorage.getItem("user"));
      const singed = props.users.map((x) => x.user._id === _id);
      const isUserSing = singed.find((x) => x === true);
      if (isUserSing) {
        setIsSinged(true);
      }
    }
  };

  const setActiveTrip = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3001/api/setActiveTrip/${props._id}`,
        {
          IsActive: active,
        }
      );
      setActive(res.data.trip.IsActive);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteTrip = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/deleteTrip/${props._id}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  const singUpUser = async (e) => {
    const tokenDataJson = window.localStorage.getItem("token-data");
    const { _id } = JSON.parse(window.localStorage.getItem("user"));
    const tokenData = JSON.parse(tokenDataJson);
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3001/api/addUserToTrip/${props._id}`,
        {
          _id: _id,
          Name: userData.Name,
          Surname: userData.SurName,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        }
      );
      setUserData({
        Name: "",
        SurName: "",
      });
    } catch (ex) {
      console.log(ex);
    }
  };
  console.log(props.IsActive);
  return (
    <div
      className={styles.TripContainer}
      style={
        isSinged
          ? { borderColor: "rgb(38, 231, 20)" }
          : { borderColor: "black" }
      }
    >
      <div>
        <h5>
          {props.HomeTeam} vs {props.AwayTeam}
        </h5>
      </div>
      <div>{props.Date}</div>
      <div>{props.City}</div>
      <li>
        <div>Data wyjazdu:</div>
        <div>
          <h5>
            <b>{props.TripDate}</b>
          </h5>
        </div>
      </li>
      <li>
        <div>Data powrotu:</div>
        <div>
          <h5>
            <b>{props.ReturnDate}</b>
          </h5>
        </div>
      </li>
      <div>
        Liczba zapisanych osób: <b>{props.users.length}</b>
      </div>
      {auth.isAuthenticated ? (
        <button
          className={`btn btn-${isSinged ? "info" : "warning"}`}
          onClick={() => setVisibilityActive(!visibilityActive)}
        >
          {isSinged ? "Zapisano!" : "Zapisz sie!"}
        </button>
      ) : null}
      {auth.isModerator || (auth.isAdmin && auth.isAuthenticated) ? (
        <div className={styles.dropDownButton}>
          <label>Aktywny?</label>
          <button
            className={`btn btn-${active ? "success" : "danger"}`}
            onClick={changeVisibility}
          >
            {active ? "Tak" : "Nie"}
          </button>
          <ul className={visibility ? styles.dropList : styles.dropListHidden}>
            <li className={styles.dropItem} onClick={() => setActive(true)}>
              Tak
            </li>
            <li className={styles.dropItem} onClick={() => setActive(false)}>
              Nie
            </li>
          </ul>
          <div style={{ display: "flex", gap: "5px" }}>
            <button className="btn btn-primary" onClick={setActiveTrip}>
              Zapisz
            </button>
            <button className="btn btn-danger" onClick={deleteTrip}>
              Usun
            </button>
          </div>
        </div>
      ) : null}
      {!isSinged && active ? (
        <div
          className={styles.TripFormContainer}
          style={{ display: visibilityActive ? "flex" : "none" }}
        >
          <form>
            <div className={styles.tripsForm}>
              <div>
                Imie:{" "}
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, Name: e.target.value })
                  }
                ></input>
              </div>
              <div>
                Nazwisko:{" "}
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, SurName: e.target.value })
                  }
                ></input>
              </div>
            </div>
          </form>
          <div>
            <button className="btn btn-primary" onClick={singUpUser}>
              Zapisuje sie!
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
