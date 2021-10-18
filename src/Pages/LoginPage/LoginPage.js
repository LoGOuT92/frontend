import React, { useContext, useState } from 'react';
import styles from './LoginPage.module.css';
import AuthContext from '../../Context/authContext';
import {useHistory} from 'react-router-dom';

export default function LoginPage() {
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')
    const [loading, setLoading]=useState(false)
    const history = useHistory();
    const auth= useContext(AuthContext)

    const loginhandler = (e)=>{
        e.preventDefault();
        setLoading(true)
        setTimeout(()=>{
            auth.login(e);
            history.push('/')
            setLoading(false)
        },500)
    }
    const onKeyDownHandler=(e)=>{
        if (e.key === 'Enter'){
            loginhandler(e);
        }
    }

    return (
        <div className={styles.LoginPageContainer}>
            <form>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    onKeyDown={onKeyDownHandler}
                    />
                <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    onKeyDown={onKeyDownHandler}
                    />
            </div>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={loginhandler}>{loading?
                    <div className="spinner-border text-danger" role="status">
                    <span className="sr-only"></span>
                    </div>
                    :'Zaloguj'}</button>
                <button className={styles.button} onClick={()=>(history.push('/register'))} >Rejestracja</button>
            </div>

            </form>

        </div>
    )
}
