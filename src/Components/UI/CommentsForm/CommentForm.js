import React, { useState,useEffect } from 'react';
import styles from './CommentsForm.module.css';

export default function CommentForm(props) {
    const commentsArray =props.commets;

    const [comment,setComment]=useState("")
    const [errors, setErrors]=useState({
        comment: ''
    })
    const submit =(e)=>{
        e.preventDefault();
        props.test(e,
            {
                id: props.id,
                user:'testUser',
                content:comment
            }
        );
    }
    useEffect(()=>{

     if(comment.length===0 || comment.length>=2){
         setErrors({
             comment: ""
         })
     }else{
        setErrors({
            comment: "Komentarz musi mieć minimum 2 znaki!"
        })
     }
    }
    ,[comment]);
    useEffect(()=>{
        console.log(comment.length);
     if(comment.length===0){
        setErrors({
            comment: "Komentarz musi mieć minimum 2 znaki!"
        })
     }
    }
    ,[comment]);

    return (
        <div className={styles.CommentFormContainer}>
            <form className={styles.form}>
            
                <textarea className={`form-control ${errors.comment ? 'is-invalid': ''}`}value={comment} onChange={e=>setComment(e.target.value)} type="text" placeholder="Dodaj komentarz..."></textarea>
                <div className="invalid-feedback">{errors.comment}</div>
                <button className={styles.button} onClick={submit} type="button">Dodaj komentarz </button>
                
            </form>
        </div>
    )
}