import React, { useEffect, useState,useContext } from 'react';
import styles from './MatchPage.module.css';
import logo1 from '../../assets/images/Logos/milan.png';
import logo2 from '../../assets/images/Logos/inter.png';
import Teams from '../Teams/Teams';
import Comments from '../../Components/UI/Comments/Comments';
import LoadingIcon from '../../Components/UI/LoadingIcon/LoadingIcon';
import AdminContext from '../../Context/adminContext';

export default function MatchPage() {
    const [loading, setLoading]=useState(true)
    const [strzelec,setStrzelec]=useState('')
    const [score,setScore] = useState({
        home:2,
        away:1,
        Teams: {
            HomeTeam: ['1 Donnaruma','2 Calabria','3 Kijer','4 Tomori','5 Theo','6 Kessie','7 Benasser','8 Diaz','9 Leao','10 Salemakers','11 Ibrahomovic'],
            Awayteam: ['Test Player1','1 Test Player','2 Test Player3','3 Test Player4','4 Test Player5','5 Test Player6','6 Test Player7','7 Test Player8','8 Test Player9','9 Test Player10','10 Test Player11',]
        },
        strzelcy: {
            homeScore: ['test','test'],
            awayScore: ['test']
        }
    })
    const admin = useContext(AdminContext)
    const test =(e)=>{
        setStrzelec(e.target.value)
    }
    const decrementScoreHome=()=>{
        if(score.home<=0)return
        setScore({...score,home: score.home-1})
        score.strzelcy.homeScore.pop()
    }
    const decrementScoreAway=()=>{
        if(score.away<=0)return
        setScore({...score,away: score.away-1})
        score.strzelcy.awayScore.pop()
    }
    const addScoreHome=()=>{
        score.strzelcy.homeScore.push(strzelec)
        setScore({...score,home: score.home+1})
        setStrzelec('')
    }
    const addScoreAway=()=>{
        score.strzelcy.awayScore.push(strzelec)
        setScore({...score,away: score.away+1})
        setStrzelec('')
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        },500)
    }, [])

    return (
        <>
        {loading?<LoadingIcon/>:(
                    <div className={styles.MatchPageContainer}>
                    <div className={styles.logos}>
                        <div className={styles.logo}>
                            <img src={logo1} alt="Logo Team Home"/>
                            <div><h2>team</h2></div>
                        </div>
                            <div>
                                <h1>{score.home}</h1>
                                {admin.isAdmin?(
                                <div>
                                    <svg  viewBox="0 0 24 24" onClick={decrementScoreHome}>
                                        <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                    </svg>
                                </div>
                                ):null}
                            </div>
                                <div className={styles.score}>
                            <h3>asd</h3>
                            <h1>:</h1>
                            {admin.isAdmin?<input placeholder="wpisz strzelca" value={strzelec} onChange={test}></input>:null}
                            </div>
                            <div>
                                <h1>{score.away}</h1>
                                {admin.isAdmin?(
                                    <div>
                                        <svg  viewBox="0 0 24 24"onClick={decrementScoreAway}>
                                            <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                        </svg>
                                    </div>
                                ):null}
                            </div>
                        <div className={styles.logo}>
                                <img src={logo2} alt="Logo Team Away"/>
                            <div><h2>team</h2></div>
                        </div>
                    </div>
                    <div className={styles.test}>
                        <div>
                            {admin.isAdmin?(
                            <div onClick={addScoreHome}>
                                <svg viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                                </svg>
                            </div>
                            ):null}
                            {score.strzelcy.homeScore.map(x=><h5>{x}</h5>)}
                        </div>
                        <div>
                            {admin.isAdmin?(
                            <div onClick={addScoreAway}>
                                <svg viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                </svg>
                            </div>
                            ):null}
                            {score.strzelcy.awayScore.map(x=><h5>{x}</h5>)}
                        </div>
                    </div>
                <Teams teams={score.Teams}/>
                {/* <Comments /> */}
                </div>
        )}
        </>
    )
}
