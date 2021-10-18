import React from 'react';
import styles from './MainArticule.module.css';
import foto from '../../../assets/images/articules/main.png';
import {Link} from 'react-router-dom';

export default function MainArticule(props) {
    return (
        <div className={styles.MainArticuleContainer}>
            <Link to={`articules/${props.id}`}>
            <div className={styles.image}>
                <img src={foto} alt="articule" />
            </div>
            <div className={styles.header}>
                <label className={styles.label}>{props.header}</label>
            </div>
            </Link>
        </div>
    )
}
