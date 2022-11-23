import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  Timestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { api } from "../App.js";
import { app } from "../App";
import Grid from "@mui/material/Grid";
import { Button, TextField, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ChipCopy } from "./Theme";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";

const SingleChat = (props) => {
  console.log(props); //props je ceo chat id/student/tutor
  const skrol = useRef();

  const auth = getAuth(app);
  const db = getFirestore(app);
  const [messages, setMessages] = useState([]);
  const [novaPoruka, setNovaPoruka] = useState("");

  const posaljiPoruku = async () => {
    let podaci = {
      text: novaPoruka,
      date: Date.now(),
      senderId: 2, //TREBA TRENUTNI PRIJAVLJENI ID
      chatId: props.sagovornik.id,
    };
    console.log(podaci);
    await fetch(api + `message/messageSend`, {
      withCredentials: true,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(podaci),
    }).then((response) => {
      setNovaPoruka("");
      return response.json();
    });
    ucitajPoruke();
    skrol.current.scrollIntoView({ behavior: "smooth" });
    /*
        if (novaPoruka !== '') {
            await addDoc(collection(db, "konverzacije/" + props.sagovornik.idKonvo + "/poruke"), {
                datumVreme: Timestamp.now(),
                od: auth.currentUser.uid,
                poruka: novaPoruka,
                svidjano: false
            });
            setNovaPoruka('');
        }

        skrol.current.scrollIntoView({ behavior: 'smooth' });*/
  };

  useEffect(() => {
    skrol.current.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const ucitajPoruke = async () => {
    await fetch(api + `message/getChatMessages/` + props.sagovornik.id)
      .then((response) => {
        return response.json();
      })
      .then((actualData) => setMessages(actualData));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      //POKUPI SVE PORUKE!!!

      ucitajPoruke();
    }, 1000);
    //console.log(messages); //MEESAGE NIJE MAP..?
    /*const porukeRef = query(
      collection(db, "konverzacije/" + props.sagovornik.idKonvo + "/poruke"),
      orderBy("datumVreme", "asc")
    );
    const unsubscribe = onSnapshot(porukeRef, (querySnapshot) => {
      const poruke = [];
      querySnapshot.forEach((doc) => {
        poruke.push(doc.data());
      });
      setMessages(poruke);
    });*/

    return () => clearInterval(interval);
  }, [props.sagovornik]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <div
        style={{
          padding: "0.5rem",
          borderBottom: "2px solid dimGray",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          backgroundColor: "white",
          height: "8%",
        }}
      >
        {props.sagovornik.student.id ===
        2 /*TREBA PRAVI ID PRIJAVLJENOG OVDE!!!!!!!!!!!!!!*/ ? (
          <Avatar
            src={props.sagovornik.tutor.imageUrl}
            style={{ marginRight: "1rem" }}
          ></Avatar>
        ) : (
          <Avatar
            src={props.sagovornik.student.imageUrl}
            style={{ marginRight: "1rem" }}
          ></Avatar>
        )}
        <Typography variant="h4">
          {props.sagovornik.student.id ===
          2 /*TREBA PRAVI ID PRIJAVLJENOG OVDE!!!!!!!!!!!!!!*/
            ? props.sagovornik.tutor.name + " " + props.sagovornik.tutor.surname
            : props.sagovornik.student.name +
              " " +
              props.sagovornik.student.surname}
        </Typography>
      </div>

      <div style={{ height: "80%", overflowY: "scroll" }}>
        {messages.map((message) => {
          const date = new Date(Number(message.date));
          const humanDateFormat = date.toLocaleTimeString();
          if (message.senderId === 2) {
            //TREBA ID PRIJAVLJENOG!
            return (
              <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                <Box>
                  <ChipCopy
                    ja={true}
                    poruka={message.text}
                    vreme={humanDateFormat}
                    boja={"#1f5d78"}
                  />
                </Box>
              </div>
            );
          } else {
            return (
              <div>
                <Box>
                  {props.sagovornik.student.id === message.senderId ? (
                    /*TREBA PRAVI ID PRIJAVLJENOG OVDE!!!!!!!!!!!!!!*/ <ChipCopy
                      foto={props.sagovornik.tutor.imageUrl}
                      vreme={humanDateFormat}
                      poruka={message.text}
                      boja={"gray"}
                    />
                  ) : (
                    <ChipCopy
                      foto={props.sagovornik.student.imageUrl}
                      vreme={humanDateFormat}
                      poruka={message.text}
                      boja={"gray"}
                    />
                  )}
                </Box>
              </div>
            );
          }
        })}
        <div ref={skrol}></div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "10%",
        }}
      >
        <TextField
          value={novaPoruka}
          onChange={(e) => setNovaPoruka(e.target.value)}
          onKeyPress={(e) => {
            if (e.key == "Enter") {
              posaljiPoruku();
            }
          }}
          style={{ width: "95%" }}
        ></TextField>
        <SendIcon
          fontSize="large"
          onClick={posaljiPoruku}
          style={{ width: "5%" }}
        />
      </div>
    </div>
  );
};

export default SingleChat;
