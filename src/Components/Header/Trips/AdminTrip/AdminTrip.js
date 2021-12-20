import { useEffect, useState } from "react";
import styles from "./AdminTrip.module.css";
import axios from "axios";

export default function AdminTrip() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [trip, setTrip] = useState({
    HomeTeam: "",
    AwayTeam: "",
    Date: "",
    City: "",
    TripDate: "",
    ReturnDate: "",
  });
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/createTrip", {
        HomeTeam: trip.HomeTeam,
        AwayTeam: trip.AwayTeam,
        Date: trip.Date,
        City: trip.City,
        TripDate: trip.TripDate,
        ReturnDate: trip.ReturnDate,
      });
      console.log(res.status);
      setTrip({
        HomeTeam: "",
        AwayTeam: "",
        Date: "",
        City: "",
        TripDate: "",
        ReturnDate: "",
      });
      setStatus(res.status);
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  return (
    <div className={styles.AdminTripContainer}>
      <div className={styles.teamsInputs}>
        <input
          placeholder="Team"
          value={trip.HomeTeam}
          onChange={(e) => setTrip({ ...trip, HomeTeam: e.target.value })}
        ></input>
        vs
        <input
          placeholder="Team"
          value={trip.AwayTeam}
          onChange={(e) => setTrip({ ...trip, AwayTeam: e.target.value })}
        ></input>
      </div>
      <div>
        <label>Data:</label>
        <input
          type="date"
          style={{ width: "130px" }}
          placeholder="DD-MM-RRRR"
          value={trip.Date}
          onChange={(e) => setTrip({ ...trip, Date: e.target.value })}
        ></input>
      </div>
      <div>
        <label>Miasto:</label>
        <input
          style={{ width: "130px" }}
          placeholder="Miasto"
          value={trip.City}
          onChange={(e) => setTrip({ ...trip, City: e.target.value })}
        ></input>
      </div>
      <div>
        <label>Data wyjazdu:</label>
        <input
          type="date"
          style={{ width: "130px" }}
          placeholder="DD-MM-RRRR"
          value={trip.TripDate}
          onChange={(e) => setTrip({ ...trip, TripDate: e.target.value })}
        ></input>
      </div>
      <div>
        <label>Data Powrotu:</label>
        <input
          type="date"
          style={{ width: "130px" }}
          placeholder="DD-MM-RRRR"
          value={trip.ReturnDate}
          onChange={(e) => setTrip({ ...trip, ReturnDate: e.target.value })}
        ></input>
      </div>
      <button className="btn btn-primary" onClick={submit}>
        Dodaj wyjazd
      </button>
      {status || error ? (
        status === 201 ? (
          <div className="alert alert-success">Dodano!</div>
        ) : error ? (
          <div className="alert alert-danger">Cos poszło nie tak!</div>
        ) : null
      ) : null}
    </div>
  );
}
