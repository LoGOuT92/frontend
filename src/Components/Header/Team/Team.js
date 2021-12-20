import React, { useContext,useEffect,useState } from 'react';
import Player from './Player/Player';
import styles from './Team.module.css';
import axios from 'axios';
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon';
import AuthContext from '../../../Context/authContext'
import TeamAdmin from './teamAdmin/TeamAdmin';

export default function Team() {
    const [loading, setLoading]=useState(true)
    const auth= useContext(AuthContext)
    const [players,setPlayers]=useState([])

    const fetchPlayers=async() => {
        const res = await axios.get("http://localhost:3001/api/players")
        setPlayers(res.data.players)
        setLoading(false)
       }
     
       useEffect(() => {
        fetchPlayers();
       }, [])


    return (
        <div className={styles.teamContainer}>
            {loading?<LoadingIcon/>:(
                <>
                {auth.isAdmin||auth.isModerator?(
                    <TeamAdmin fetchPlayers={()=>fetchPlayers()}/>
                ):null}
                            <div className={styles.TeamPositions}>
                            <div className={styles.positon}style={{ borderColor: 'orange'}}>Bramkarze</div>
                            <div className={styles.teamPos}>
                                {players.map(player=>player.Positions==='Goalkeeper'?<Player key={player._id}{...player} />:null)}
                            </div>
                        </div>
                        <div className={styles.TeamPositions}>
                            <div className={styles.positon}style={{ borderColor: 'rgb(12, 89, 231)'}}>Obrońcy</div>
                            <div className={styles.teamPos}>
                                {players.map(player=>player.Positions==='Defender'?<Player key={player._id}{...player} />:null)}
                            </div>
                        </div>
                        <div className={styles.TeamPositions}>
                            <div className={styles.positon}style={{ borderColor: 'rgb(38, 231, 20)'}}>Pomocnicy</div>
                            <div className={styles.teamPos}>
                                {players.map(player=>player.Positions==='Midfilder'?<Player key={player._id}{...player} />:null)}
                            </div>
                        </div>
                        <div className={styles.TeamPositions}>
                            <div className={styles.positon}style={{ borderColor: 'rgb(255, 15, 15)'}}>Napastnicy</div>
                            <div className={styles.teamPos}>
                                {players.map(player=>player.Positions==='Forward'?<Player key={player._id}{...player} />:null)}
                            </div>
                        </div>
                    </>
            )}
        </div>
    )
}
