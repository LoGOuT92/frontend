import React from 'react';
import styles from './Comment.module.css';
import avatar from '../../../../assets/images/avatars/download.jpg';

export default function Comment(props) {
    //const x = props.replies;
    //const {user,content}=props.replies


    
    return (
        <>
        <div className={styles.CommentContainer}>
            <div className={styles.user}>
                <div className={styles.avatar}>
                    <img src={avatar} alt="avatar"></img>
                </div>
                <div className={styles.info}>
                    <label>{props.user}</label>
                    <label>10.10.2020</label>
                </div>
            </div>
            <div className={styles.comment}>
            {props.content}
            <label>Odpowiedz</label>
            </div>
        </div>
        <div>
            {/* <label>{user}</label> */}
        </div>
        </>
    )
}
