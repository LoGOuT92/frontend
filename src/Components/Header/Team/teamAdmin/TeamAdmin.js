import React, { useState,useEffect } from 'react';
import styles from './teamAdmin.module.css';
import AddPlayer from './addPlayer/AddPlayer';
import DeletePlayer from './deletePlayer/DeletePlayer';
import EditPlayer from './editPlayer/EditPlayer';

export default function TeamAdmin(props) {
    const [visibility,setvisibility] = useState({
        add: 'none',
        delete: 'none',
        edit: 'none',
    })


    return (
        <div className={styles.teamAdminContainer}>
            <div className={styles.teamAdminOptions} style={{ borderColor: 'rgb(38, 231, 20)'}}>
            <label onClick={()=>visibility.add ==='none'?setvisibility({...visibility,add:'flex'}):setvisibility({...visibility,add:'none'})}>
                Dodaj Zawodnika
            </label>
                <div className={styles.teamAdminAdd}style={{display: visibility.add}}>
                    <AddPlayer fetchPlayers={props.fetchPlayers}/>
                </div>
            </div>
            <div className={styles.teamAdminOptions} style={{ borderColor: 'rgb(12, 89, 231)'}}>
                <label onClick={()=>visibility.edit ==='none'?setvisibility({...visibility,edit:'flex'}):setvisibility({...visibility,edit:'none'})}>
                    Edytuj zawodnika
                </label>
                <div style={{display: visibility.edit}}>
                    <EditPlayer fetchPlayers={props.fetchPlayers}/>
                </div>
            </div>
            <div className={styles.teamAdminOptions} style={{ borderColor: 'rgb(255, 15, 15)'}}>
                <label onClick={()=>visibility.delete ==='none'?setvisibility({...visibility,delete:'flex'}):setvisibility({...visibility,delete:'none'})}>
                    Usun Zawodnika
                </label>
                <div style={{display: visibility.delete}}>
                    <DeletePlayer fetchPlayers={props.fetchPlayers}/>
                </div>
            </div>
        </div>
    )
}
