import React, { useState, useEffect } from "react";

//--CSS imports--
import "../css/Chat.css";
import undf from "../assets/undefined.jpg";

//--Material UI imports--
import Grid from "@mui/material/Grid";
import { Avatar } from "@mui/material";
import { Typography, TextField } from "@mui/material";

import ResponsiveAppBar from "../elements/ResponsiveAppBar.js";
import Futer from "../elements/Footer.js";

import { app } from "../App.js";
import SingleChat from "./SingleChat";
import { fontWeight } from "@mui/system";
import { useLocation } from "react-router-dom";
import { api } from "../App";

const Chat = () => {
  const location = useLocation();
  //console.log(location.state);
  let userLogged = localStorage.getItem("user");
  const user = JSON.parse(userLogged);
  const [listaKorisnika, setListaKorisnika] = useState([]);
  const [prikaz, setPrikaz] = useState({});
  const [filter, setFilter] = useState("");
  const [filtrirano, setFiltrirano] = useState([]);

  useEffect(() => {
    let temp = [];
    listaKorisnika.forEach((e) => {
      if (
        e.student.id == user.id &&
        (e.tutor.name + " " + e.tutor.surname).includes(filter)
      ) {
        temp.push(e);
      } else if (
        e.student.id != user.id &&
        (e.student.name + " " + e.student.surname).includes(filter)
      ) {
        temp.push(e);
      }
    });
    console.log(temp);
    setFiltrirano(temp);
  }, [filter]);

  useEffect(() => {
    const getKonverzacije = async () => {
      fetch(api + `chat/getChatForUser/` + user.id)
        .then((response) => {
          return response.json();
        })
        .then((actualData) => {
          setListaKorisnika(actualData);
          setFiltrirano(actualData);
        });
    };
    getKonverzacije();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div style={{ height: "10%" }}>
        <ResponsiveAppBar user={user} />
      </div>

      <Grid container style={{ height: "82%" }}>
        <Grid
          item
          className="leviItem"
          xs={12}
          sm={12}
          md={3}
          sx={{ xs: { height: "200px" }, md: { height: "100%" } }}
        >
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              label="Pretraga"
              fullWidth
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              variant="outlined"
            />
          </Grid>
          {filtrirano.map((chat) => (
            <Grid item xs={12} sm={12} md={12} mt="1rem" key={chat.id}>
              <div
                className="contact"
                onClick={(event) => {
                  chat.student.id === user.id
                    ? setPrikaz(chat)
                    : setPrikaz(chat); //postavi chat kao glavni koristi se u singleChat
                }}
              >
                <Avatar alt={undf} margin="auto" src={chat.fotografija} />
                <Typography margin="auto" align="center" sx={{ ml: 1.5 }}>
                  {chat.student.id === user.id
                    ? chat.tutor.name + " " + chat.tutor.surname
                    : chat.student.name + " " + chat.student.surname}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sm={12} md={9} style={{ height: "100%" }}>
          {Object.keys(prikaz).length != 0 ? (
            <SingleChat sagovornik={prikaz} />
          ) : null}
        </Grid>
      </Grid>
      <Futer />
    </div>
  );
};

export default Chat;
