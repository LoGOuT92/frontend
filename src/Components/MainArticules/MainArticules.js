import React, { useState } from 'react'
import styles from './MainArticules.module.css';
import MainArticule from './MainArticule/MainArticule';

export default function MainArticules() {

    const initialArticule=[
        {
            id: 1,
            header: "PRIMAVERA BEATEN BY SAMP: 2-0 AT VISMARA VISMARAVISMARA VISMARAVISMARAVISMARA asdsad asd"
        },
        {
            id: 2,
            header: "bbbbbbbbbbbbbbbbbbbbbbbbbb"
        }
    ]
    const [articule]=useState(initialArticule)

    return (
        <div className={styles.MainArticulesContainer}>
            {articule.map(articule=><MainArticule key={articule.id}{...articule}/>)}
        </div>
    )
}
