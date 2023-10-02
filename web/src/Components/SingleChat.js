import React, { useEffect, useState, useRef } from "react";

import { api } from "../App.js";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ChipCopy } from "./Theme";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import io from 'socket.io-client';
import CircleIcon from '@mui/icons-material/Circle';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';
import Pulsating from "./pulsating";
import styled from "styled-components";

const StyledDiv = styled.div`
  align-items: center;
  background: ${({ color }) => color || "limegreen"};
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
`;

const SingleChat = (props) => {
  const ucitajPoruke = async () => {
    console.log("ovde");
    await fetch(api + `message/getChatMessages/` + props.sagovornik.id)
      .then((response) => {
        return response.json();
      })
      .then((actualData) => setMessages(actualData));
  };

  const [socket, setSocket] = useState(null);

  const skrol = useRef();
  let userLogged = localStorage.getItem("user");
  const user = JSON.parse(userLogged);
  const [messages, setMessages] = useState([]);
  const [novaPoruka, setNovaPoruka] = useState("");
  const [joined, setJoined] = useState("");
  const [oldRoom, setOldRoom] = useState("")
  const [userONLINE, setUserONLINE] = useState(false);

  useEffect(() => {
    if (socket) {
      let podaci = { room: oldRoom, userId: user.id }
      socket.emit("leaveRoom", podaci)
    }
    setOldRoom(props.sagovornik.id)
  }, [props]);

  if (joined != props.sagovornik.id && socket) {
    ucitajPoruke();
    let podaci = {
      room: props.sagovornik.id,
      userId: user.id,
    }
    socket.emit('joinRoom', podaci);
    setJoined(props.sagovornik.id);
    setUserONLINE(false)
    setOldRoom(joined);
  }

  if (!socket) {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
  }
  if (socket)
    socket.on('leftRoom', (data) => {
      if (data.userId != user.id) {
        setUserONLINE(false);
      }
    })

  if (socket)
    socket.on('joinedRoom', (data) => {
      if (data.data.userId !== user.id) {
        setUserONLINE(true);
      }
      if (data.numUsers >= 1)
        setUserONLINE(true)
    })

  if (socket) {
    socket.on('newMessage', (message) => {
      ucitajPoruke()
    });
  }
  const posaljiPoruku = async () => {
    let podaci = {
      text: novaPoruka,
      date: Date.now(),
      senderId: user.id,
      chatId: props.sagovornik.id,
      room: props.sagovornik.id,
    };
    setNovaPoruka("");
    socket.emit('chatMessage', podaci);//sagovornik.id je id chata
  };

  useEffect(() => {
    skrol.current.scrollIntoView({ behavior: "auto" });
  }, [messages]);

<<<<<<< HEAD
=======
      ucitajPoruke();
    }, 200);
>>>>>>> 10060ce01a4d05536733e9d22ccfa449c9b7fc92


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
        {props.sagovornik.student.id === user.id ? (
          <Pulsating visible={userONLINE}>
            <StyledDiv>
              <Avatar
                src={props.sagovornik.tutor.imageUrl}
              ></Avatar>
            </StyledDiv>
          </Pulsating>) : (<Pulsating visible={userONLINE}>
            <StyledDiv>
              <Avatar
                src={props.sagovornik.student.imageUrl}
              ></Avatar>
            </StyledDiv>
          </Pulsating>)}
        <Typography variant="h4" style={{ marginLeft: "1rem" }}>
          {props.sagovornik.student.id === user.id
            ? props.sagovornik.tutor.name + " " + props.sagovornik.tutor.surname
            : props.sagovornik.student.name +
            " " +
            props.sagovornik.student.surname}
        </Typography>
        {/* {userONLINE ? (<CircleIcon style={{ color: "limegreen" }} />) : (<TripOriginOutlinedIcon style={{ color: "gray" }} />)} */}
      </div>

      <div style={{ height: "80%", overflowY: "scroll" }}>
        {messages.map((message) => {
          const date = new Date(Number(message.date));
          const humanDateFormat = date.toLocaleTimeString();
          if (message.senderId === user.id) {
            return (
              <div
                key={message.id}
                style={{ display: "flex", flexDirection: "row-reverse" }}
              >
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
              <div key={message.id}>
                <Box>
                  {props.sagovornik.student.id === user.id ? (
                    <ChipCopy
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
