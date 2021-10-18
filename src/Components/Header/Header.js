import React, { useContext } from 'react';
import styles from './Header.module.css';
import logo from '../../assets/images/Logos/milan.png';
import {Link} from 'react-router-dom';
import AuthContext from '../../Context/authContext';

export default function Header() {
    const auth= useContext(AuthContext)


    return (
        <div className={styles.headerContainer}>
            
            <div className={styles.navList}>
                <li>jeden</li>
                <li>dwa</li>
                <li>trzy</li>
                <li>cztery</li>
                
                <li>
                    <div className={styles.loginAuth}>{auth.isAuthenticated?(
                        <div className={styles.authOptions}>
                             <Link to="/profile/"><button className={styles.button}>Profil</button></Link>
                            <button className={styles.button} onClick={(e)=>auth.logout(e)}>Wyloguj</button>
                        </div>
                    ):
                    (<Link to="/login/"><h6>login</h6></Link>)}
                    </div>
                </li>
               
            </div>
            <Link to="/">
                <div className={styles.logo}><img src={logo} alt="logo"/></div>
            </Link>
        </div>
    )
}
