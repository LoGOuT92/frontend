import React, { useContext, useState, useEffect } from "react";
import styles from "./UserManagement.module.css";
import DropDownBtn from "../../../Components/UI/dropDownBtn/DropDownBtn";
import axios from "axios";
import LoadingIcon from "../../../Components/UI/LoadingIcon/LoadingIcon";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [usersArray, setUsersArray] = useState({});
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [userPermissions, setUserPremissions] = useState({
    admin: false,
    moderator: false,
    banned: false,
  });
  const fetchUsers = async () => {
    const { data } = await axios.get("http://localhost:3001/api/users");
    setUsers(data.users);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const curretUser = async (e, term) => {
    e.preventDefault();
    setResponse("");
    setLoading(true);
    await fetchUsers();
    const newUser = users.filter((x) =>
      x.username.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
    setUsersArray(newUser);
    if (newUser.length > 0) {
      setUser(newUser[0]);
      if (newUser[0]) {
        setUserPremissions({
          admin: user.isAdmin,
          moderator: user.isModerator,
          banned: user.isbanned,
        });
      }
    } else {
      alert("Nie znalezono");
    }
  };
  const editUser = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/user/permissions/${user._id}`,
        {
          isAdmin: userPermissions.admin,
          isModerator: userPermissions.moderator,
          isbanned: userPermissions.banned,
        }
      );
      setResponse(res.status);
    } catch (ex) {
      console.log(ex);
      setError(ex);
    }
  };
  const deleteUser = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/user/${user._id}`
      );
      alert("Usuneto");
      setUser("");
      setUserPremissions(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className={styles.userPermissionsContainer}>
      <div className={styles.userPermissionsMainContent}>
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Szukaj uzytkownika..."
            aria-label="Search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          ></input>
          <button
            className="btn btn-outline-danger my-2 my-sm-0"
            type="submit"
            onClick={(e) => curretUser(e, term)}
          >
            Szukaj
          </button>
        </form>
        <div className={styles.userPermissionsOptions}>
          <label className={styles.labelUsername}>
            {user ? user.username : "user"}
          </label>
          <div className={styles.OptionsForUsers}>
            <DropDownBtn
              title={"Admin"}
              header={"Admin"}
              onChange={(value) =>
                setUserPremissions({ ...userPermissions, admin: value })
              }
              permissions={user.isAdmin}
              test={user}
            />
            <DropDownBtn
              title={"Moderator"}
              header={"Moderator"}
              onChange={(value) =>
                setUserPremissions({ ...userPermissions, moderator: value })
              }
              permissions={user.isModerator}
              test={user}
            />
            <DropDownBtn
              title={"Zabanowany"}
              header={"Zbanowany"}
              onChange={(value) =>
                setUserPremissions({ ...userPermissions, banned: value })
              }
              permissions={user.isbanned}
              test={user}
            />
          </div>
          <div>
            <button
              type="button"
              className="btn btn-warning"
              onClick={deleteUser}
            >
              Usun uzytkownika
            </button>
          </div>
        </div>
        <div className={styles.saveButton}>
          <button type="button" className="btn btn-danger" onClick={editUser}>
            Zapisz
          </button>
        </div>
        {error ? (
          <div className="alert alert-danger">Edycja nie powiodla sie</div>
        ) : null}
        {response ? (
          <div className="alert alert-success">Zmieniono!</div>
        ) : null}
      </div>
      {usersArray.length > 1 ? (
        <div className={styles.moreUsers}>
          <label>znaleziono kilka wynikow</label>
          <label>Czy chodziło ci o...?</label>
          {usersArray.map((x) => (
            <div>{x.username}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
