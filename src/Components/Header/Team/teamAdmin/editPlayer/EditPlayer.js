import React, { useState,useEffect } from 'react';
import styles from './EditPlayer.module.css';
import axios from 'axios';

export default function EditPlayer(props) {
    const[singlePlayer,setSinglePlayer]=useState('');
    const [Visibility,setVisibility]=useState(false);
    const[player,setPlayer]=useState({
        Name: '',
        SurName: '',
        Number: '',
        Positions: '',
        _id: null,
    })
    const getSinglePlayer=async()=>{
        try{
            const player = await axios.get(`http://localhost:3001/api/player/${singlePlayer}`)
            const {Name,SurName,Number,Positions,_id}=player.data.player
            setPlayer({
                Name: Name,
                SurName: SurName,
                Number: Number,
                Positions: Positions,
                _id: _id
            })
        }catch(err){
            console.log(err);
        }
    }
    const editPlayer=async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.put(`http://localhost:3001/api/editPlayer/${player._id}`,{
                "Name": player.Name,
                "SurName": player.SurName,
                "Number": player.Number,
                "Positions": player.Positions,
            })
            setPlayer({
                Name: '',
                SurName: '',
                Number: '',
                Positions: '',
                _id: null,
            })
            setSinglePlayer('')
            props.fetchPlayers();
        }catch(err){
            console.log(err);
        }
    }


    return (
        <div className={styles.EditPlayerContainer}>
            <div className={styles.EditPlayerTerm}>
            <label>Kogo chcesz edytowac?</label>
            <input 
                placeholder="nazwisko"
                value={singlePlayer} 
                onChange={(e)=>setSinglePlayer(e.target.value)}>
            </input>
            <button 
                type="button"
                className="btn btn-primary"
                onClick={getSinglePlayer}>
                Szukaj zawodnika
            </button>
            </div>
            <div className={styles.EditPlayerSummary}>
                        <label>imie</label>
                            <input value={player.Name}
                             onChange={(e)=>setPlayer({...player,Name:e.target.value})}>
                             </input>
                        <label>Nazwisko</label>
                        <input 
                            value={player.SurName}
                            onChange={(e)=>setPlayer({...player,SurName:e.target.value})}
                            ></input>

                        <label>Numer</label>
                            <input 
                                type="number" 
                                value={player.Number}
                                onChange={(e)=>setPlayer({...player,Number:e.target.value})}>
                            </input>
                    <label style={{cursor: 'pointer'}}>
                        Pozycja(rozwin)
                        <label> {player.Positions}</label>
                        <button 
                            className={`btn btn-danger'}`}
                            onClick={()=>setVisibility(!Visibility)}>
                        </button>
                        <ul style={Visibility?{display: 'flex',flexDirection: 'column'}:{display: 'none'}} className={styles.PositionList}>
                            <li className={styles.dropItem} onClick={()=>setPlayer({...player,Positions: 'Goalkeeper'})}>Bramkarz</li>
                            <li className={styles.dropItem} onClick={()=>setPlayer({...player,Positions: 'Defender'})}>Obronca</li>
                            <li className={styles.dropItem} onClick={()=>setPlayer({...player,Positions: 'Midfilder'})}>Pomocnik</li>
                            <li className={styles.dropItem} onClick={()=>setPlayer({...player,Positions: 'Forward'})}>Napastnik</li>
                        </ul>
                    </label>
            </div>
            <button type="button" className="btn btn-primary"onClick={editPlayer} >Zapisz</button>
        </div>
    )
}
