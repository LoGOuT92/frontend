import  { createContext } from 'react'

const AuthContext =createContext({
    isAuthenticated: JSON.parse(window.localStorage.getItem("token-data"))?true:false,
    isAdmin: JSON.parse(window.localStorage.getItem("admin")),
    isModerator: JSON.parse(window.localStorage.getItem("moderator")),
    isBanned: JSON.parse(window.localStorage.getItem("banned")),
    login:()=>{},
    logout:()=>{},
})
export default AuthContext;