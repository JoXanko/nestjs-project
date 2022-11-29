import React, { useEffect, useState } from "react";

//--Material UI imports--
import CssBaseline from "@mui/material/CssBaseline";

import UserPocetna from "./UserPocetna.js";
import TutorPocetna from "./TutorPocetna.js";
import ResponsiveAppBar from "../elements/ResponsiveAppBar";
import Futer from "../elements/Footer";

const HomePage = () => {
  let userLogged = localStorage.getItem("user");
  const [user, setUser] = useState({});

  useEffect(() => {
    const obj = JSON.parse(userLogged);
    setUser(obj);
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
      {console.log("U HOME USER" + user)}
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
