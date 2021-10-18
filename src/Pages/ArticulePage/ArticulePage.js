import React, { useEffect,useState,useContext } from 'react';
import styles from './ArticulePage.module.css';
import image from '../../assets/images/articules/Przechwytywanie.PNG';
import Comments from '../../Components/UI/Comments/Comments';
import { useParams } from 'react-router-dom';
import CommentForm from '../../Components/UI/CommentsForm/CommentForm';
import LoadingIcon from '../../Components/UI/LoadingIcon/LoadingIcon';
import AuthContext from '../../Context/authContext';

export default function ArticulePage(props) {

    const {id} = useParams();
    const [loading, setLoading]=useState(true)
    const auth= useContext(AuthContext)
    const [comments, setComment]=useState('')
    useEffect(() => {
        setComment(props.array[id-1])
    },[id])

    const fetchArticule=()=>{
        setLoading(false)
    }

    useEffect((e) => {

        setTimeout(() => {
            fetchArticule();
        },0)
    }, [])

    return (
        <>
        {loading?<LoadingIcon />:(
            <div className={styles.ArticulePageContainer}>
                <div className={styles.image}>
                    <img src={image}alt="ArticuleImage" />
                <div className={styles.header}>
                    <label>LAVORI MIRATI PER LA SQUADRA{id}</label>
                </div>
                </div>
                <div className={styles.text}>
                    <h5>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</h5>
                </div>
                {auth.isAuthenticated?<CommentForm {...props}id={id} commets={comments}/>:<div className="alert alert-danger" role="alert">
                Musisz byc zalogowany by dodac komentarz
                </div>}
                <Comments commets={comments}/>
            </div>
            )}
        </>
        
    )
}
