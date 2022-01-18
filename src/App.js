import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header/Header";
import MainArticules from "./Components/MainArticules/MainArticules";
import Matches from "./Components/Matches/Matches";
import Articules from "./Components/Articules/Articules";
import Footer from "./Components/Footer/Footer";
import ArticulePage from "./Pages/ArticulePage/ArticulePage";
import MatchPage from "./Pages/MatchPage/MatchPage";
import AuthContext from "./Context/authContext";
import LoginPage from "./Pages/LoginPage/LoginPage";
import LoadingIcon from "./Components/UI/LoadingIcon/LoadingIcon";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";
import AdminContext from "./Context/adminContext";
import axios from "axios";
import Team from "./Components/Header/Team/Team";
import Trips from "./Components/Header/Trips/Trips";
import Trophies from "./Components/Header/Trophies/Trophies";
import History from "./Components/Header/History/History";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [userPermissions, setUserPremissions] = useState({
    isAdmin: false,
    isModerator: false,
    isBanned: false,
  });
  const [loading, setLoading] = useState(true);
  const [array, setArray] = useState([]);
  const isAdmin = true;
  const login = (e) => {
    e.preventDefault();
    setisAuthenticated(true);
  };
  useEffect(() => {
    const auth = JSON.parse(window.localStorage.getItem("token-data"))
      ? true
      : false;
    setisAuthenticated(auth);
    setUserPremissions({
      ...userPermissions,
      isModerator: JSON.parse(window.localStorage.getItem("moderator")),
    });
  }, [isAuthenticated]);

  const logout = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    setisAuthenticated(false);
  };

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:3001/api/post");
    setArray(res.data.posts);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  const header = (
    <>
      <Route path="/">
        <Header />
      </Route>
    </>
  );
  const content = (
    <Switch>
      <Route
        path="/articules/:slug"
        component={() => <ArticulePage array={array} />}
      />
      <Route path="/lastMatch/:id" component={MatchPage} />
      <Route path="/match/:id" component={MatchPage} />
      <Route path="/nextMatch/:id" component={MatchPage} />
      <Route path="/login/" component={LoginPage} />
      <Route path="/profile/" component={Profile} />
      <Route path="/register/" component={Register} />
      <Route path="/kadra/" component={Team} />
      <Route path="/zapisy/" component={Trips} />
      <Route path="/trofea/" component={Trophies} />
      <Route path="/historia/" component={History} />
      <Route exact path="/">
        <MainArticules />
        <Matches />
        <Articules />
      </Route>
    </Switch>
  );
  const footer = <Footer />;

  return (
    <Router>
      <AdminContext.Provider
        value={{
          isAdmin: isAdmin,
        }}
      >
        <AuthContext.Provider
          value={{
            isAuthenticated: isAuthenticated,
            isAdmin: userPermissions.isAdmin,
            isModerator: userPermissions.isModerator,
            isBanned: userPermissions.isBanned,
            login: login,
            logout: logout,
          }}
        >
          {header}
          {loading ? <LoadingIcon /> : content}
          {footer}
        </AuthContext.Provider>
      </AdminContext.Provider>
    </Router>
  );
}

export default App;
