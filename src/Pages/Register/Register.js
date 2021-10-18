import React, { useContext, useState,useEffect } from 'react';
import styles from './Register.module.css';
import AuthContext from '../../Context/authContext';
import {useHistory} from 'react-router-dom';


export default function Register() {
    const auth= useContext(AuthContext)
    const history = useHistory();
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')
    const [nickname,setNickname] =useState('')
    const [errors,setErrors] =useState({
        email: '',
        nickname:'',
        password:'',
        check1:'',
    })
    const buttonDisabled=Object.values(errors).filter(x=>x).length
    if(auth.isAuthenticated===true){
        history.push('/')
    }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    useEffect(() => {
        if(validateEmail(email)){
            setErrors({...errors,email:""})
        }else{
            setErrors({...errors,email:"Zly Email!"})
        }

    }, [email])
    useEffect(()=>{

        if(nickname.length>=6){
            setErrors({...errors,nickname:""})
        }else{
            setErrors({...errors,nickname:"Nick musi miec min 6 znakow"})
        }
       }
       ,[nickname]);
    useEffect(()=>{

        if(password.length>=6){
            setErrors(()=>({...errors,password:""}))
        }else{
            setErrors(()=>({...errors,password:"Haslo musi miec min 6 znakow"}))
        }
       }
       ,[password]);
       useEffect(()=>{setErrors(()=>({...errors,password:"!",email:'!',nickname:'!'}))},[])

    const onKeyDownHandler=(e)=>{
        if (e.key === 'Enter'){
            //asd
        }
    }
    const test =(e)=>{
        e.preventDefault()
        console.log(errors.dobrze);
        
    }
    return (
        <div className={styles.RegisterContainer}>
                        <form>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid': ''}`}
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    onKeyDown={onKeyDownHandler}
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
                    onKeyDown={onKeyDownHandler}
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
                    onKeyDown={onKeyDownHandler}
                    />
                    <div className="invalid-feedback">{errors.password}</div>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={test}/>
                <label className="form-check-label" for="exampleCheck1">Akceptuje regulamin</label>
            </div>
            <div className={styles.buttons}>
                <button disabled={buttonDisabled?true:false} className={styles.button} onClick={test} >Rejestracja</button>
            </div>
            </form>
        </div>
    )
}
