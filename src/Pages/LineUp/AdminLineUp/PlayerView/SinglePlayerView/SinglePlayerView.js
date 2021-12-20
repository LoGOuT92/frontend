import { useEffect, useState } from 'react';
import styles from './SinglePlayerView.module.css';


export default function SinglePlayerView(props) {
    const [borderFlag,setborderFlag]=useState(false)
    const [borderColor,setborderColor]=useState('');

    const change=()=>{
        setborderFlag(!borderFlag)
        props.fun(props.SurName,props.Number,!borderFlag)
    }

    return (
        <div className={styles.singlePlayerView} onClick={()=>change()}
        style={props.color&&borderFlag?{ borderColor: `orange`}:borderFlag?{ borderColor: 'rgb(38, 231, 20)'}:null}
        >
            <h6>{props.Number}</h6>
            <h6>{props.SurName}</h6>
        </div>
    )
}
