import { useEffect, useState } from 'react';
import styles from './FormationInput.module.css';

export default function FormationInput(props) {
    const [value,setValue]=useState(0);

    useEffect(() => {
        if(value>9){
            setValue(9)
        }
        if(value<0){
            setValue(0)
        }
        if(value.length>=2){
            setValue(0)
        }
        props.setFormation(value)
    }, [value])
    return (
        <div className={styles.FormationInput}>
            <input type="number" max="9" min="0" value={value} onChange={(e)=>setValue(parseInt(e.target.value))} ></input>
            <label>{props.pos}</label>
        </div>
    )
}
