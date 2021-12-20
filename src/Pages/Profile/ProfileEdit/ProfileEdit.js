import React, { useRef, useState, useEffect } from "react";
import styles from "./ProfileEdit.module.css";
import axios from "axios";

export default function ProfileEdit() {
  const imageRef = useRef();
  const user = JSON.parse(window.localStorage.getItem("user"))
    ? JSON.parse(window.localStorage.getItem("user"))
    : "";
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    nickname: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  const [res, setRes] = useState("");
  const [error, setError] = useState("");
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  useEffect(() => {
    const { username, email } = JSON.parse(window.localStorage.getItem("user"));
    setUserData({
      email: email,
      nickname: username,
    });
  }, []);
  useEffect(() => {
    if (validateEmail(userData.email)) {
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
  }, [userData.email]);

  useEffect(() => {
    if (userData.nickname.length >= 6) {
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
  }, [userData.nickname]);

  const userSettings = () => {
    if (userData.password) {
      let user = {
        email: userData.email,
        username: userData.nickname,
        password: userData.password,
        image: userData.image,
      };
      return user;
    } else {
      let user = {
        email: userData.email,
        username: userData.nickname,
        image: userData.image,
      };
      return user;
    }
  };

  const editUser = async () => {
    const { _id } = JSON.parse(window.localStorage.getItem("user"));
    const user = userSettings();
    const formData = new FormData();
    const x = imageRef.current;
    formData.append("email", userData.email);
    formData.append("username", userData.nickname);
    formData.append("image", x.files[0]);
    try {
      const res = await axios.put(
        `http://localhost:3001/api/user/${_id}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      setRes(res.status);
      console.log(formData);

      userData({ ...userData, image: res.data.image });
    } catch (ex) {
      setError(ex);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    editUser();
  };

  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.profileAvatar}>
        <img src={`http://localhost:3001/public/uploads/${user.image}`} />
      </div>
      <form
        className={styles.form}
        onSubmit={submit}
        enctype="multipart/form-data"
      >
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            lassName={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
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
            value={userData.nickname}
            onChange={(e) =>
              setUserData({ ...userData, nickname: e.target.value })
            }
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
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.files[0] })
            }
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>
        <div className="mb-3 form-check">
          Zmien avatar
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            ref={imageRef}
            onChange={(e) =>
              setUserData({ ...userData, image: e.target.files })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Zapisz
        </button>
      </form>
      {error ? (
        <div className="alert alert-danger">Wpisane dane sa juz zajęte!</div>
      ) : null}
      {res ? <div className="alert alert-success">Zmieniono dane!</div> : null}
    </div>
  );
}
