import React, { useContext, useState,useEffect } from 'react';
import styles from './Profile.module.css';
import AuthContext from '../../Context/authContext';
import AdminContext from '../../Context/adminContext';
import {NavLink, useHistory} from 'react-router-dom';
import { BrowserRouter as Router,Route, Switch,Link}from 'react-router-dom';
import Admin from './Admin/Admin';
import ProfileEdit from './ProfileEdit/ProfileEdit';


export default function Profile() {
    const auth= useContext(AuthContext)
    const admin= useContext(AdminContext)
    const history = useHistory();


    if(auth.isAuthenticated===false){
        history.push('/')
    }
    const AdminPanel =(
        <>
        <Switch>
            <Route path="/profile/adminPanel/" component={Admin}/>
            <Route path="/profile/profileEdit/" component={ProfileEdit}/>
        </Switch>
        </>
      )

    return (
        <Router>
        <div className={styles.Profile}>
            <div className={styles.options}>



                <label>
                    <NavLink to="/profile/profileEdit/"
                    activeStyle={{
                        fontWeight: "bold",
                        borderBottom: "2px solid red",
                    }}>Edytuj profil
                </NavLink></label>
                {admin.isAdmin?<NavLink to="/profile/adminPanel/"
                    activeStyle={{
                        fontWeight: "bold",
                        borderBottom: "2px solid red",
                    }}>
                    <label>Dodaj nowa tresc</label></NavLink>:null}

            </div>
            {AdminPanel}
        </div>

        </Router>
    )
}
