import React, { useState } from "react";

//--PNG imports--
import logo2 from "../assets/logo2";

//--CSS import--
import "../css/SignUp.css";
import { ColorButton } from "./Theme";

//--Material UI imports--
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { api } from "../App";

import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const inputEmail = (event) => setEmail(event.target.value);
  const inputPassword = (event) => setPassword(event.target.value);

  const signUp = async (event) => {
    const podaci = {
      username: email,
      password: password,
    };
    if (password.length < 8)
      toast.error("Šifra mora biti duža od 8 karaktera!");
    else {
      await fetch(api + `user`, {
        withCredentials: true,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(podaci),
      })
        .then((response) => {
          if (response.status == 409) {
            toast.error("Profil sa unetom email adresom već postoji!");
          }
          return response.json();
        })
        .then((actualData) => {
          let roles = [];
          roles.push("undefined");
          setAuth({ roles });
          localStorage.setItem("user", JSON.stringify(actualData));
          if(actualData.id!=null)
          navigate("/setupProfile", { replace: true });
        });
    }
  };

  return (
    <Grid
      container
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
          Napravite novi nalog
        </Typography>

        <Box className="glavniBox" component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            onChange={inputEmail}
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                signUp();
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
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                signUp();
              }
            }}
            fullWidth
            name="password"
            label="Lozinka"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Box>
            <ColorButton
              fullWidth
              onClick={signUp}
              variant="contained"
              sx={{ mt: 3, mb: 2, height: "40px" }}
            >
              Napravite nalog
            </ColorButton>

            <Grid
              container
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item style={{ marginTop: "3%" }}>
                <Link href="/login" variant="body1">
                  {"Već imate nalog? Prijavite se!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        newestOnTop
      />
    </Grid>
  );
};

export default SignUp;
