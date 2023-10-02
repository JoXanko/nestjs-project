import React, { useMemo, useState } from "react";

//--image imports--
import googleImg from "../assets/google.png";
import logo2 from "../assets/logo2";

//--CSS imports--
import "../css/Login.css";
import { ColorButton } from "./Theme";

//--Material UI imports--
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { api } from "../App";
import useAuth from "../hooks/useAuth";

import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const inputEmail = (event) => {
    setEmail(event.target.value);
  };
  const otvoriSignUp = () => {
    navigate("/signup");
  };
  const inputPassword = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    const podaci = {
      username: email,
      password: password,
    };
    await fetch(api + `auth/login`, {
      withCredentials: true,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(podaci),
    })
      .then((response) => {
        if (response.statusText == "Unauthorized")
          toast.error("Neispravni podaci za nalog!");
        return response.json();
      })
      .then((actualData) => {
        let roles = [];
        roles.push(actualData.role);
        const user = [];
        user.push(actualData);
        setAuth({ user, roles });
        localStorage.setItem("user", JSON.stringify(actualData));
        if (actualData.role === "undefined")
          navigate("/setupProfile", { replace: true });
        else if (actualData.role === "student" || actualData.role === "tutor")
          navigate(from, { replace: true });
      });
  };

  return (
    <div>
      <Grid
        container
        component="main"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <CssBaseline />

        <Grid
          item
          style={{ paddingTop: "3%", paddingBottom: "4%" }}
          component={Paper}
          elevation={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Grid item style={{ paddingTop: 16 }}>
            <img src={logo2} style={{ maxHeight: 100 }} />
          </Grid>

          <Typography
            color="primary"
            component="h1"
            fontWeight="600"
            variant="h5"
          >
            Prijava
          </Typography>

          <Box className="glavniBox" component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              onChange={inputEmail}
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  handleSubmit(e);
                }
              }}
              fullWidth
              id="email"
              label="Email Adresa"
              name="email"
              autoComplete="email"
            />

            <TextField
              margin="normal"
              required
              onChange={inputPassword}
              fullWidth
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  handleSubmit(e);
                }
              }}
              name="password"
              label="Lozinka"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Box>
              <ColorButton
                fullWidth
                onClick={handleSubmit}
                variant="contained"
                sx={{ mt: 3, mb: 2, height: "40px" }}
              >
                Prijavite se
              </ColorButton>

              <Grid
                container
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item style={{ marginTop: "3%" }}>
                  <Link href="/signup" variant="body1">
                    {"Nemate nalog? Napravite ga!"}
                  </Link>
                </Grid>
              </Grid>
            </Box>

            {/*
              <ColorButton
                variant="contained"
                fullWidth
                color="primary"
                className="Login"
                onClick={otvoriSignUp}
                sx={{ mt: 4, mb: 3, height: "40px" }}
              >
                <span>
                  <img src={googleImg} height="25px" width="25px" />
                </span>
                <span>
                  <span>Prijavite se preko Google-a</span>
                </span>
              </ColorButton>
            */}
          </Box>
        </Grid>
      </Grid>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        newestOnTop
      />
    </div>
  );
};

export default Login;
