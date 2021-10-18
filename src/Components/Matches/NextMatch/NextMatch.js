import React from 'react';
import styles from './NextMatch.module.css';
import logo1 from '../../../assets/images/Logos/milan.png';
import logo2 from '../../../assets/images/Logos/lazio.png';
import { Link } from 'react-router-dom';

export default function NextMatch() {
    return (
        <div className={styles.NextMatchContainer}>
            <Link to="/nextMatch/">
                <div className={styles.LogosContainer}>
                <div><img src={logo1} alt="logo1"></img>
                        <div><h5>Team1</h5></div>
                </div>
                    <div className={styles.content}>
                        <div>Next Match</div>
                        <div><h2>Vs</h2></div>
                        <div>10.10.2020</div>
                    </div>
                <div><img src={logo2} alt="logo2"></img>
                        <div><h5>Team2</h5></div>
                </div>
            </div>
           </Link>
        </div>
    )
}
