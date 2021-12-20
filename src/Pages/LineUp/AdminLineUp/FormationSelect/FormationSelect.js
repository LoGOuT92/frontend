import { useEffect, useState } from 'react';
import styles from './FormationSelect.module.css';
import FormationInput from './FormationInput/FormationInput';

export default function FormationSelect(props) {

    const [formation,setFormation]=useState({
        so_bo: 0,
        dp_wbo: 0,
        sp:0,
        spo_sn:0,
        n:0
    })
    useEffect(() => {
        props.formation(formation)
    },[formation])

    return (
        <div className={styles.formationSelectContainer}>
            Wybierz formację:
            <FormationInput setFormation={(value)=>setFormation({...formation,so_bo:value})}pos={"Srodkowi obroncy/Boczni obroncy"}/>
            <FormationInput setFormation={(value)=>setFormation({...formation,dp_wbo:value})}pos={"Defensywni pomocnicy/Wahadłowi"}/>
            <FormationInput setFormation={(value)=>setFormation({...formation,sp:value})}pos={"Srodkowi pomocnicy"}/>
            <FormationInput setFormation={(value)=>setFormation({...formation,spo_sn:value})}pos={"Ofensywni Pomocnicy/Skrzydłowi"}/>
            <FormationInput setFormation={(value)=>setFormation({...formation,n:value})}pos={"Napastnicy"}/>
            <div className={styles.summaryFormation}>
            {formation.so_bo>0?<>{formation.so_bo}-</>:null}
            {formation.dp_wbo>0?<>{formation.dp_wbo}-</>:null}
            {formation.sp>0?<>{formation.sp}-</>:null}
            {formation.spo_sn>0?<>{formation.spo_sn}-</>:null}
            {formation.n>0?<>{formation.n}</>:null}
            </div>
        </div>
    )
}
