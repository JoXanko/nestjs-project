import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

//--Material UI imports--
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

//--Firebase imports--
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { app } from "../App.js";

import UserPocetna from "./UserPocetna.js";
import TutorPocetna from "./TutorPocetna.js";
import ResponsiveAppBar from "../elements/ResponsiveAppBar";
import ProfileSetup from "./ProfileSetup.js";
import Futer from "../elements/Footer";
import AuthContext from "../context/AuthProvider.js";

const HomePage = () => {
  let userLogged = localStorage.getItem("user");
  const [user, setUser] = useState({});
  const auth = getAuth(app);
  const [isTutor, setIsTutor] = useState(false);
  const [isUcenik, setIsUcenik] = useState(false);
  const [setup, setSetup] = useState(false);
  const db = getFirestore(app);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const obj = JSON.parse(userLogged);
    setUser(obj);

    /*const func = async () => {

        const uRef = collection(db, 'ucenici');
        const uQuery = query(uRef, where("userID" , "==", auth.currentUser.uid));
        const uQuerySnapshot = await getDocs(uQuery);

        const tRef = collection(db, 'tutori');
        const tQuery = query(tRef, where("userID" , "==", auth.currentUser.uid));
        const tQuerySnapshot = await getDocs(tQuery);
  
        if(uQuerySnapshot.empty == false) {
          setIsUcenik(true);
        }

        if(tQuerySnapshot.empty == false) {
          setIsTutor(true);
        } 

        if(uQuerySnapshot.empty && tQuerySnapshot.empty){
          setSetup(true);
        }
      }
      onAuthStateChanged(auth,(user)=>{
        func();
      });*/
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      {console.log("U HOME USER"+user)}
      {/*user.role==="undefined" ? <Navigate to="/setupProfile"/> : null*/}

      <CssBaseline />
      <ResponsiveAppBar user={user} />
      {user.role === "tutor" ? <TutorPocetna /> : null}
      {user.role === "student" ? <UserPocetna /> : null}
      <Futer />
    </div>
  );
};

export default HomePage;
