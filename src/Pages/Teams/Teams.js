import React from 'react';
import styles from './Teams.module.css';

export default function Teams(props) {
    return (
        <div className={styles.teamsContainer}>
            <div className={styles.team}>
                {props.teams.HomeTeam.map(x=><label>{x}</label>)}
            </div>
            <div className={styles.team}>
            {props.teams.Awayteam.map(x=><label>{x}</label>)}
            </div>
        </div>
    )
}
