import React, { useContext, useState, useEffect } from "react";
import styles from "./Register.module.css";
import AuthContext from "../../Context/authContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
  });
  const buttonDisabled = Object.values(errors).filter((x) => x).length;
  if (auth.isAuthenticated === true) {
    history.push("/");
  }
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  useEffect(() => {
    if (validateEmail(email)) {
      setErrors({
        ...errors,
        email: "",
      });
    } else {
      setErrors({
        ...errors,
        email: "Niepoprawny adres Email!",
      });
    }
  }, [email]);

  useEffect(() => {
    if (nickname.length >= 6) {
      setErrors({
        ...errors,
        nickname: "",
      });
    } else {
      setErrors({
        ...errors,
        nickname: "Twoj nick musi mieć minimum 6 znakow!",
      });
    }
  }, [nickname]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/register", {
        username: nickname,
        password: password,
        email: email,
      });
      history.push("/");
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };
  return (
    <div className={styles.RegisterContainer}>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Nick Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.nickname ? "is-invalid" : ""}`}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <div className="invalid-feedback">{errors.nickname}</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>
        <div className={styles.buttons}>
          <button
            disabled={buttonDisabled ? true : false}
            className={styles.button}
          >
            Rejestracja
          </button>
        </div>
      </form>
      {error ? (
        <div className={"alert alert-danger"}>
          Uzytkownik o podanym mailu lub nicku juz istnieja!
        </div>
      ) : null}
    </div>
  );
}
