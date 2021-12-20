import React, { useContext, useState,useEffect } from 'react';
import styles from './DropDownBtn.module.css';


export default function DropDownBtn(props) {
    const [Visibility,setVisibility]=useState(false);
    const [permissions,setPermissions]=useState(false)

    const changeVisibility=(e)=>{
        e.preventDefault();
        setVisibility(!Visibility)
    }
    useEffect(() => {
        props.onChange(permissions)
    }, [permissions])
    useEffect(() => {
        setPermissions(props.permissions)
    }, [props.permissions])
    useEffect(() => {
        setPermissions(props.permissions)
    }, [props.test])


    return (
        <div className={styles.DropDownBtnContainer}>
            <div className={styles.dropDownButton}>
                <label>{props.header}</label>
                <button className={`btn btn-${permissions?'success':'danger'}`} onClick={changeVisibility}>{permissions?"Tak":"Nie"}</button>
                <ul className={Visibility?styles.dropList:styles.dropListHidden}>
                    <li className={styles.dropItem} onClick={()=>setPermissions(true)}>Tak</li>
                    <li className={styles.dropItem} onClick={()=>setPermissions(false)}>Nie</li>
                </ul>
            </div>
        </div>
    )
}
