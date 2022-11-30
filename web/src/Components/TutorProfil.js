import { React, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "react-toastify/ReactToastify.min.css";

import slikaUsluga from "../assets/slikaUsluga.jpg";

//--CSS imports--
import "../css/App.css";

//--Material UI imports--
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Card, CardMedia, CardContent, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";

//--firebase imports--
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { app } from "../App.js";
import ResponsiveAppBar from "../elements/ResponsiveAppBar";
import { ColorButton, PopupDialog, PopupDialogTitle } from "./Theme";
import { Avatar, Rating } from "@mui/material";
import { api } from "../App";
import { Timestamp } from "firebase/firestore";

const TutorProfil = (props) => {
  let userLogged = localStorage.getItem("user");
  const user = JSON.parse(userLogged);
  const location = useLocation();
  console.log(location.state.idUser);
  const navigate = useNavigate();
  /*let { id } = useParams();
  console.log("ovo je id " + id);*/
  const [izabrani, setIzabrani] = useState({});
  const [usluge, setUsluge] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [komentar, setKomentar] = useState("");
  const [ocenjeno, setOcenjeno] = useState({});

  const doPoruka = () => {
    console.log(user.id);
    const func = async () => {
      fetch(api + `chat/getChat/` + location.state.idUser + "/" + user.id)
        .then((response) => {
          return response.json();
        })
        .then((actualData) => {
          console.log(actualData);
          navigate("/chat", { state: actualData });
        });
    };
    if (user.id !== null) func();
  };

  const prikaziVise = (obj) => {
    console.log(obj);
    setIzabrani(obj);

    const func = async () => {
      await fetch(api + `grade/userGrade/` + obj.id + "/" + user.id)
        .then((response) => {
          return response.json();
        })
        .then((actualData) => {
          console.log(actualData);
          if (actualData != false) setOcenjeno(actualData);
          else setOcenjeno({});
        });
    };

    func().then(() => setOpen(true));
  };

  const iskljuci = () => {
    setOpen(false);
  };

  const add = () => {
    const dodajRating = async () => {
      let podaci = {
        date: Timestamp.now(),
        comment: komentar,
        studentId: user.id,
        grade: value,
        classId: izabrani.id,
      };
      await fetch(api + `grade/addGrade`, {
        withCredentials: true,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(podaci),
      })
        .then((response) => {
          return response.json();
        })
        .then((e) => {
          setKomentar("");
          setValue(0);
          getUsluge();
        });
    };

    dodajRating().then(() => {
      setOpen(false);
    });
  };
  const getUsluge = async () => {
    fetch(api + `class/classesByUser/` + location.state.idUser)
      .then((response) => {
        return response.json();
      })
      .then((actualData) => {
        setUsluge(actualData);
      });
  };
  useEffect(() => {
    let temp = [];

    const getTutora = async () => {};
    getTutora();

    getUsluge();
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      height={"100%"}
    >
      <ResponsiveAppBar user={user} />
      <Grid
        container
        display={"flex"}
        flexDirection="column"
        alignItems="center"
      >
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={9}
          component={Paper}
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding="2rem"
          style={{ marginTop: 15 }}
        >
          <Avatar
            src={location.state.imageUrl}
            alt="U"
            sx={{ width: "200px", height: "200px" }}
          />
          <Typography
            variant="h4"
            fontWeight="700"
            marginBottom="2rem"
            borderBottom="2px solid gray"
          >
            {location.state.name} {location.state.surname}
          </Typography>
          <ColorButton onClick={doPoruka}>
            Pošaljite poruku{" "}
            <MailIcon fontSize="large" style={{ width: "25%" }} />
          </ColorButton>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={9}
          component={Paper}
          display="flex"
          flexDirection="column"
          padding="2rem"
          style={{ marginTop: 15, marginBottom: 15 }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            borderBottom="1px solid gray"
          >
            Biografija:
          </Typography>
          <Typography variant="h6" fontWeight="500">
            {location.state.bio}{" "}
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={9}
          component={Paper}
          display="flex"
          flexDirection="column"
          padding="2rem"
          style={{ marginBottom: 15 }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            marginBottom="1rem"
            borderBottom="1px solid gray"
          >
            Usluge
          </Typography>
          <Grid item container spacing={5}>
            {usluge.map((usluga) => {
              return (
                <Grid key={usluga.id} item md={4} sm={6} xs={12}>
                  <Card>
                    {usluga.photo ? (
                      <CardMedia
                        component="img"
                        height="180"
                        image={usluga.photo}
                      />
                    ) : (
                      <CardMedia
                        component="img"
                        height="180"
                        image={slikaUsluga}
                      />
                    )}
                    <CardContent>
                      <Typography component="h1" variant="h6">
                        {usluga.name}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      <ColorButton
                        size="small"
                        onClick={(event) => prikaziVise(usluga)}
                      >
                        Saznajte više
                      </ColorButton>
                      <Rating
                        name="read-only"
                        precision={0.1}
                        value={usluga.avgGrade}
                        readOnly
                        sx={{ mr: 1 }}
                      />
                      <PopupDialog
                        fullWidth={true}
                        onClose={iskljuci}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                      >
                        <PopupDialogTitle
                          id="customized-dialog-title"
                          onClose={iskljuci}
                        >
                          {izabrani.name}
                        </PopupDialogTitle>
                        <DialogContent dividers>
                          <Typography gutterBottom>
                            <Box fontWeight="800" display="inline">
                              Kategotrija:{" "}
                            </Box>
                            {!izabrani ? izabrani.category.name : ""}
                          </Typography>

                          <Typography gutterBottom component="div">
                            <Box fontWeight="800" display="inline">
                              Opis:{" "}
                            </Box>
                            {izabrani.bio}
                          </Typography>
                          <Typography gutterBottom></Typography>
                          <Typography gutterBottom>
                            <Box fontWeight="800" display="inline">
                              Lokacija:{" "}
                            </Box>
                            {!izabrani ? izabrani.location.name : ""}
                          </Typography>

                          {ocenjeno.grade !== undefined ? (
                            <Box>
                              <Rating value={ocenjeno.grade} readOnly />
                              <Typography gutterBottom>
                                <Box fontWeight="800" display="block">
                                  Vaš komentar :
                                </Box>
                              </Typography>
                              <TextField
                                fullWidth
                                value={ocenjeno.comment}
                                multiline
                                rows={4}
                                InputProps={{
                                  readOnly: true,
                                }}
                              ></TextField>
                            </Box>
                          ) : (
                            <Box
                              display="flex"
                              flexDirection="column"
                              style={{ gap: "10px" }}
                            >
                              <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                  setValue(newValue);
                                }}
                              />

                              <TextField
                                value={komentar}
                                onChange={(e) => setKomentar(e.target.value)}
                              ></TextField>
                              <ColorButton onClick={add} pt="2rem">
                                Ocenite
                              </ColorButton>
                            </Box>
                          )}
                        </DialogContent>
                      </PopupDialog>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <Box
        display={"flex"}
        flexDirection="row"
        justifyContent={"center"}
        sx={{ background: "#2C7DA0" }}
        width={"100%"}
        margin={"auto"}
        padding={"auto"}
      >
        <h4 style={{ color: "#FFFFFF" }}>Copyright : JAiL team © 2022</h4>
      </Box>
    </Box>
  );
};

export default TutorProfil;
