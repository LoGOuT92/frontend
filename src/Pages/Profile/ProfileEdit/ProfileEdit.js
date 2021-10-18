import React, {useState,useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import profileAvatar from '../../../assets/images/avatars/download.jpg';
import styles from './ProfileEdit.module.css';

export default function ProfileEdit() {
    const history = useHistory();
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')
    const [nickname,setNickname] =useState('')
    const [errors,setErrors] =useState({
        email: '',
        nickname:'',
        password:'',
    })
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    useEffect(() => {
        if(validateEmail(email)){
            setErrors(
                {
                    email:"",
                    dobrze:''
                }
            )
        }else{
            setErrors({
                email:'Niepoprawny adres Email!',
                dobrze:'a'
            })
        }

    }, [email])
    useEffect(()=>{

        if(nickname.length>=6){
            setErrors({
                nickname: "",
                dobrze:''
            })
        }else{
           setErrors({
               nickname: "Twoj nick musi mieć minimum 6 znakow!",
               dobrze:'a'
           })
        }
        console.log(nickname.length)
       }
       ,[nickname]);
    useEffect(()=>{

        if(password.length>=6){
            setErrors({
                password: "",
                dobrze:''
            })
        }else{
           setErrors({
               password: "Twoje haslo musi mieć minimum 6 znakow!",
               dobrze:"a"
           })
        }
       }
       
       ,[password]);

    return (
        <div className={styles.ProfileContainer}>
            <div className={styles.profileAvatar}>
                <img src={profileAvatar}/>
            </div>
            <form className={styles.form}>
                <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid': ''}`}
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Nick Name</label>
                <input
                    type="text"
                    className={`form-control ${errors.nickname ? 'is-invalid': ''}`}
                    value={nickname}
                    onChange={e=>setNickname(e.target.value)}
                    />
                <div className="invalid-feedback">{errors.nickname}</div>
                </div>
                <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid': ''}`}
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    />
                    <div className="invalid-feedback">{errors.password}</div>
                </div>
                <div className="mb-3 form-check">
                Zmien avatar
                <input type="file"
                    id="avatar" name="avatar"
                    accept="image/png, image/jpeg"/>
                                </div>
                <button type="submit" className="btn btn-primary">Zapisz</button>
            </form>
        </div>
    )
}
