import React, { useState,useEffect } from 'react';
import styles from './Comments.module.css';
import Comment from './Comment/Comment';

export default function Comments(props) {
    const commentsArray =props.commets
    useEffect(() => {
    }, [])
    //  console.log(commentsArray.comments.comment);//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    return (
        <div className={styles.CommentsContainer}>
        {commentsArray.comments.comment.map(comment=>(<Comment {...comment}/>))}
        </div>
    )
}
