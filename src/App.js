import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router,Route, Switch}from 'react-router-dom';
import Header from './Components/Header/Header';
import MainArticules from './Components/MainArticules/MainArticules';
import Matches from './Components/Matches/Matches';
import Articules from './Components/Articules/Articules';
import Footer from './Components/Footer/Footer';
import ArticulePage from './Pages/ArticulePage/ArticulePage';
import MatchPage from './Pages/MatchPage/MatchPage';
import AuthContext from './Context/authContext';
import LoginPage from './Pages/LoginPage/LoginPage';
import LoadingIcon from './Components/UI/LoadingIcon/LoadingIcon';
import Profile from './Pages/Profile/Profile';
import Register from './Pages/Register/Register';
import AdminContext from './Context/adminContext';
import array1 from './array';
import axios from 'axios';

function App(props) {

  const [isAuthenticated,setisAuthenticated]=useState(true)
  const [loading, setLoading]=useState(false)
  const [array,setArray]=useState(array1)
  const isAdmin=true;
  const login = (e) => {
    e.preventDefault()
    setisAuthenticated(true)
  }

  const logout = (e) => {
    e.preventDefault();
    setisAuthenticated(false)
  }

  // const fetchPosts=async() => {
  //  const res = await axios.get("http://localhost:3001/post",{ headers: {"Authorization" : `Bearer 123123123213`} })
  //  setLoading(false)
  //  console.log(res);
  // }

  // useEffect(() => {
  //   fetchPosts();
  // }, [])
  const test=(e,comment)=>{
    e.preventDefault();
    const newArray=[...array]
    //newArray[comment.id-1].comments.comment.push(comment)
    newArray[comment.id-1].comments.comment.push(comment)
    setArray(newArray)
    //console.log(newArray[comment.id-1].comments.comment);
  }

  const header =(
    <>
    <Route path="/">
      <Header />
    </Route>
    <Route path="/login/" component={LoginPage}/>
    <Route path="/profile/" component={Profile}/>
    <Route path="/register/" component={Register}/>
    </>
  )
  const content = (
    <Switch>
        <Route path="/articules/:id" component={()=><ArticulePage array={array} test={(e,comment)=>test(e,comment)}/>}/>
        <Route path="/lastMatch/" component={MatchPage}/>
        <Route path="/match/" component={MatchPage}/>
        <Route path="/nextMatch/" component={MatchPage}/>
        <Route exact path="/">
          <MainArticules />
          <Matches />
          <Articules />
      </Route>
    </Switch>
  )
  const footer = <Footer />

  return (
    <Router>
      <AdminContext.Provider value={{
        isAdmin: isAdmin
      }}>
       <AuthContext.Provider value={{
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout
    }}>
      {header}
      {loading?<LoadingIcon/>:content}
      {footer}
      </AuthContext.Provider>
      </AdminContext.Provider>
    </Router>
  );
}

export default App;
