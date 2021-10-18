import React, { useContext, useState,useEffect } from 'react';
import styles from './Admin.module.css';

export default function Admin() {

    const [header,setHeader]=useState('');
    const [content,setContent]=useState('');
    const [check,isCheckd]=useState(false);
    useEffect(() => {
        console.log(check)
    },[check])


    return (
        <div className={styles.AdminPanel}>
            <label>Naglowek</label>
            <textarea
                value={header}
                onChange={(e)=>setHeader(e.target.value)}
             ></textarea>
            <label>Tresc</label>
            <textarea
                value={content}
                onChange={(e)=>setContent(e.target.value)}
            ></textarea>
            <label>Main articule?</label>
            <input
             type="checkbox"
             value={check}
             onChange={()=>isCheckd(!check)}
             
             ></input>
        </div>
    )
}
