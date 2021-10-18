import React from 'react';
import styles from './LastMatch.module.css';
import logo1 from '../../../assets/images/Logos/milan.png';
import logo2 from '../../../assets/images/Logos/lazio.png';
import { Link } from 'react-router-dom';

export default function LastMatch() {
    return (
        <div className={styles.LastMatchContainer}>
            <Link to="/lastMatch/">
                <div className={styles.LogosContainer}>
                    <div><img src={logo1} alt="logo1"></img>
                            <div><h5>Team1</h5></div>
                    </div>
                    <div><h1>1</h1></div>
                        <div className={styles.content}>
                            <div>Last Match</div>
                            <div><h2>Vs</h2></div>
                            <div>10.10.2020</div>
                        </div>
                        <div><h1>1</h1></div>

                    <div><img src={logo2} alt="logo2"></img>
                            <div><h5>Team2</h5></div>
                    </div>
                </div>
           </Link>
        </div>
    )
}
