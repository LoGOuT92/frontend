import React from 'react';
import styles from './Matches.module.css';
import LastMatch from '../Matches/LastMatch/LastMatch';
import Match from '../Matches/Match/Match';
import NextMatch from './NextMatch/NextMatch';

export default function Matches() {
    return (
        <div className={styles.MatchesContainer}>
            <LastMatch />
            <Match />
            <NextMatch />
        </div>
    )
}
