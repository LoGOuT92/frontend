import React, { useContext, useEffect, useState } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/images/Logos/milan.png";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/authContext";

export default function Header() {
  const auth = useContext(AuthContext);
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    const { username } = JSON.parse(window.localStorage.getItem("user"))
      ? JSON.parse(window.localStorage.getItem("user"))
      : "";
    username ? setNickname(username) : setNickname("");
  }, [auth.isAuthenticated]);
  return (
    <div className={styles.headerContainer}>
      <div className={styles.navList}>
        <li>Historia</li>
        <li>
          <Link to="/kadra/">
            <div>Kadra</div>
          </Link>
        </li>
        <li>
          <Link to="/zapisy/">
            <div>Zapisy</div>
          </Link>
        </li>
        <li>
          <Link to="/trofea/">
            <div>Trofea</div>
          </Link>
        </li>

        <li>
          <div className={styles.loginAuth}>
            {auth.isAuthenticated ? (
              <div className={styles.authOptions}>
                <div className={styles.authContainer}>{nickname}</div>
                <div style={{ display: "flex", gap: "15px" }}>
                  <Link to="/profile/">
                    <button className={styles.button}>Profil</button>
                  </Link>
                  <button
                    className={styles.button}
                    onClick={(e) => auth.logout(e)}
                  >
                    Wyloguj
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login/">
                <h6>login</h6>
              </Link>
            )}
          </div>
        </li>
      </div>

      <Link to="/">
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
      </Link>
    </div>
  );
}
