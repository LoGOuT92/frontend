import { useEffect, useState, useContext } from "react";
import styles from "./Trips.module.css";
import Trip from "./Trip/Trip";
import AdminTrip from "./AdminTrip/AdminTrip";
import axios from "axios";
import LoadingIcon from "../../UI/LoadingIcon/LoadingIcon";
import AuthContext from "../../../Context/authContext";

export default function Trips() {
  const [visibility, setVisibility] = useState(false);
  const [trips, setTrips] = useState({});
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const ChangeVisibility = (x) => {
    setVisibility(!visibility);
  };

  const fetchTrips = async () => {
    const res = await axios.get("http://localhost:3001/api/getTrips");
    setTrips(res.data.trips);
    setLoading(false);
  };
  // console.log(trips);
  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className={styles.TripsContainer}>
          {auth.isModerator || (auth.isAdmin && auth.isAuthenticated) ? (
            <AdminTrip />
          ) : null}
          <div>Zapisz sie na wspólny wyjazd! </div>
          <div>Aktualne zapisy:</div>
          <div className={styles.containerOfTrips}>
            <div className={styles.activeTrips}>
              {trips.map((x) =>
                x.IsActive ? (
                  <div>
                    <Trip changeVisibility={() => ChangeVisibility()} {...x} />
                  </div>
                ) : null
              )}
            </div>
            Zakończone zapisy:
            <div className={styles.inactiveTrips}>
              {trips.map((x) =>
                !x.IsActive ? (
                  <div>
                    <Trip changeVisibility={() => ChangeVisibility()} {...x} />
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
