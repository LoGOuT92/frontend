import React, { useState,useEffect } from 'react';
import styles from './AddPlayer.module.css';
import axios from 'axios';

export default function AddPlayer(props) {
    const [Visibility,setVisibility]=useState(false);
    const[player,setPlayer]=useState({
        name:'',
        surName:'',
        number: 0,
        position: ''
    })


    const addPlayer=async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:3001/api/createPlayer',{
                "Name": player.name,
                "SurName": player.surName,
                "Number": player.number,
                "Positions": player.position,
            });
            setPlayer({
                name:'',
                surName:'',
                number: 0,
                position: ''
            })
            props.fetchPlayers()

        }catch(ex){
            console.log(ex);
        }

    }
    return (
        <div className={styles.addPlayerContainer}>
            <div className={styles.addPlayerInputs}>
                    <label>
                        Imie: 
                        <input value={player.name} onChange={(e)=>setPlayer({...player,name:e.target.value})}></input>
                    </label>
                    <label>
                        Nazwisko: 
                        <input value={player.surName} onChange={(e)=>setPlayer({...player,surName:e.target.value})}></input>
                    </label>
                    <label>
                        Numer: 
                        <input type="number"value={player.number} onChange={(e)=>setPlayer({...player,number:e.target.value})}></input>
                    </label>
                    <label style={{cursor: 'pointer'}}>
                        Pozycja: (rozwin)
                        <button className={`btn btn-danger'}`} onClick={()=>setVisibility(!Visibility)}></button>
                        <ul style={Visibility?{display: 'flex'}:{display: 'none'}} className={styles.PositionList}>
                            <li className={styles.dropItem} onClick={()=>setPlayer({...player,position: 'Goalkeeper'})}>Bramkarz</li>
                            <li className={styles.dropItem} onClick={()=>setPlayer({...player,position: 'Defender'})}>Obronca</li>
                            <li className={styles.dropItem} onClick={()=>setPlayer({...player,position: 'Midfilder'})}>Pomocnik</li>
                            <li className={styles.dropItem} onClick={()=>setPlayer({...player,position: 'Forward'})}>Napastnik</li>
                        </ul>
                    </label>
            </div>
            <label>Podsumowanie:</label>
            <div className={styles.addPlayerSummary}>
                <ul>
                    <li>
                        <label>Imie :</label>
                        <label>{player.name}</label>
                    </li>
                    <li>
                        <label>Nazwisko :</label>
                        <label>{player.surName}</label>
                    </li>
                    <li>
                        <label>Numer :</label>
                        <label>{player.number}</label>
                    </li>
                    <li>
                        <label>Pozycja :</label>
                        <label>{player.position}</label>
                    </li>

                </ul>
            </div>
            <button type="button" className="btn btn-success" onClick={addPlayer}>Dodaj Zawodnika</button>
        </div>
    )
}
