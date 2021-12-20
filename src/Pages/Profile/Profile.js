import React, { useContext, useState, useEffect } from "react";
import styles from "./Profile.module.css";
import AuthContext from "../../Context/authContext";
import { NavLink, useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Admin from "./Admin/Admin";
import ProfileEdit from "./ProfileEdit/ProfileEdit";
import MatchAdmin from "./matchAdmin/MatchAdmin";
import UserManagement from "./UserManagement/UserManagement";

export default function Profile() {
  const auth = useContext(AuthContext);
  const history = useHistory();

  if (auth.isAuthenticated === false) {
    history.push("/");
  }
  const AdminPanel = (
    <>
      <Switch>
        <Route path="/profile/adminPanel/" component={Admin} />
        <Route path="/profile/profileEdit/" component={ProfileEdit} />
        <Route path="/profile/matchAdmin/" component={MatchAdmin} />
        <Route path="/profile/userManagement/" component={UserManagement} />
      </Switch>
    </>
  );

  return (
    <Router>
      <div className={styles.Profile}>
        <div className={styles.options}>
          <label>
            <NavLink
              to="/profile/profileEdit/"
              activeStyle={{
                fontWeight: "bold",
                borderBottom: "2px solid red",
              }}
            >
              Edytuj profil
            </NavLink>
          </label>
          {auth.isAdmin || auth.isModerator ? (
            <>
              <NavLink
                to="/profile/adminPanel/"
                activeStyle={{
                  fontWeight: "bold",
                  borderBottom: "2px solid red",
                }}
              >
                <label>Dodaj nowa tresc</label>
              </NavLink>
              <NavLink
                to="/profile/matchAdmin/"
                activeStyle={{
                  fontWeight: "bold",
                  borderBottom: "2px solid red",
                }}
              >
                <label>Mecz</label>
              </NavLink>
              {auth.isModerator ? (
                <NavLink
                  to="/profile/userManagement/"
                  activeStyle={{
                    fontWeight: "bold",
                    borderBottom: "2px solid red",
                  }}
                >
                  <label>Zarzadzanie użytkownikami</label>
                </NavLink>
              ) : null}
            </>
          ) : null}
        </div>
        {AdminPanel}
      </div>
    </Router>
  );
}
