import React from 'react';
import styles from './Match.module.css';
import logo1 from '../../../assets/images/Logos/milan.png';
import logo2 from '../../../assets/images/Logos/inter.png';
import { Link } from 'react-router-dom';

export default function Match() {
    return (
        <div className={styles.MatchContainer}>
            <Link to="/match/">
                <div className={styles.LogosContainer}>
                    <div>
                        <img src={logo1} alt="logoHome"></img>
                        <div><h3>Team1</h3></div>
                    </div>
                    <div><h1>1</h1></div>
                    <div className={styles.test}>
                        <div>Live</div>
                        <div><h1>Vs</h1></div>
                        <div>10.10.2020</div>
                    </div>
                    <div><h1>1</h1></div>
                    <div>
                        <img src={logo2} alt="logoAway"></img>
                        <div><h3>Team2</h3></div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
