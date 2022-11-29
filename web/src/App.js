//--CSS imports--
import "./css/App.css";

//--Component imports--
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import HomePage from "./Components/HomePage";
import Profile from "./Components/Profile";
import NotFound from "./Components/NotFound";
import ProfileSetup from "./Components/ProfileSetup";
import Chat from "./Components/Chat";
import UserPretraga from "./Components/UserPretraga";
import TutorProfil from "./Components/TutorProfil";

//--Firebase imports--
import { initializeApp } from "firebase/app";

import React from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Components/Theme";
import Layout from "./Components/Layout";
import RequireAuth from "./Components/RequireAuth";
const ROLES = {
  Student: "student",
  Tutor: "tutor",
  Undefined: "undefined",
  Admin: "admin",
};
const firebaseConfig = {
  apiKey: "AIzaSyBDq64OrKNq6FFJtXDH4OmyDm3lNlZeDuM",
  authDomain: "nestjs-project-rwa.firebaseapp.com",
  projectId: "nestjs-project-rwa",
  storageBucket: "nestjs-project-rwa.appspot.com",
  messagingSenderId: "459939812693",
  appId: "1:459939812693:web:ff2ff0eeaa7f23ffed8bdc",
  measurementId: "G-066LSSZJBH",
};

export const api = "http://localhost:3000/";

export const app = initializeApp(firebaseConfig);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            element={
              <RequireAuth allowedRoles={[ROLES.Student, ROLES.Tutor]} />
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
            <Route path="/userPretraga" element={<UserPretraga />} />
            <Route path="/tutorProfil/:id" element={<TutorProfil />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Undefined]} />}>
            <Route path="/setupProfile" element={<ProfileSetup />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};
export default App;
