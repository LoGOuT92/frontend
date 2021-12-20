import React, { useState,useEffect } from 'react';
import styles from './DeletePlayer.module.css';
import axios from 'axios';

export default function DeletePlayer(props) {
    const[singlePlayer,setSinglePlayer]=useState('')
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
    const deletePlayer=async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.delete(`http://localhost:3001/api/deletePlayer/${player._id}`)
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
        <div className={styles.DeletePlayerContainer}>
            <label>Kogo chcesz usunac?</label>
            <input placeholder="nazwisko" value={singlePlayer} onChange={(e)=>setSinglePlayer(e.target.value)}></input>
            <button type="button" className="btn btn-primary"onClick={getSinglePlayer} >Szukaj zawodnika</button>
            <div className={styles.DeletePlayerSummary}>
            <ul>
                    <li>
                        <label>Imie :</label>
                        <label>{player.Name?player.Name:null}</label>
                    </li>
                    <li>
                        <label>Nazwisko :</label>
                        <label>{player.SurName?player.SurName:null}</label>
                    </li>
                    <li>
                        <label>Numer :</label>
                        <label>{player.Number?player.Number:null}</label>
                    </li>
                    <li>
                        <label>Pozycja :</label>
                        <label>{player.Positions?player.Positions:null}</label>
                    </li>

                </ul>
            </div>
            <button type="button" className="btn btn-danger"onClick={deletePlayer} >Usun Zawodnika</button>
        </div>
    )
}
