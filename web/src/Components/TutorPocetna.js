import { React, useState, useRef, useEffect } from "react";
import Tutor from "../assets/Tutor.png";
import slikaUsluga from "../assets/slikaUsluga.jpg";
//--Material UI imports--
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

import { api } from "../App";

//--firebase imports--
import { app } from "../App.js";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { ColorButton, PopupDialog, PopupDialogTitle } from "./Theme.js";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardMedia,
  Chip,
  DialogContent,
  Fade,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  Rating,
  Select,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const TutorPocetna = () => {
  let userLogged = localStorage.getItem("user");
  const user = JSON.parse(userLogged);
  const [naslov, setNaslov] = useState("");
  const [opis, setOpis] = useState("");
  const [usluge, setUsluge] = useState([]);
  const [uslugeID, setUslugeID] = useState([]);
  const [niz1, setNiz1] = useState([]);
  const [niz2, setNiz2] = useState([]);
  const [ocene, setOcene] = useState([]);
  const [poruka, setPoruka] = useState("");
  const [slika, setSlika] = useState("");
  const [oblast, setOblast] = useState({});
  const [grad, setGrad] = useState({});
  const [nivo, setNivo] = useState("");
  const [IDzamene, setIDzamene] = useState("");

  const [file, setFile] = useState("");
  const storage = getStorage(app);

  const inputNaslov = (event) => setNaslov(event.target.value);
  const inputOpis = (event) => setOpis(event.target.value);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [prikaziUsluge, setPrikaziUsluge] = useState(false);

  const current = new Date();

  const day = current.getDay();
  const month = current.getMonth();
  const date = current.getDate();

  const dani = [
    "Nedelja",
    "Ponedeljak",
    "Utorak",
    "Sreda",
    "Cetvrtak",
    "Petak",
    "Subota",
  ];
  const meseci = [
    "Januar",
    "Februar",
    "Mart",
    "April",
    "Maj",
    "Jun",
    "Jul",
    "Avgust",
    "Septembar",
    "Oktobar",
    "Novembar",
    "Decembar",
  ];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpen2(false);
    setOpen5(false);
    setOpen6(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleChange2 = async (event) => {
    setFile(event.target.files[0]);
    setOpen6(true);
  };

  const ucitajUsluge = async () => {
    fetch(api + `class/classes/` + user.id, {
      method: "GET",
      withCredentials: true,
    })
      .then((response) => {
        return response.json();
      })
      .then((actualData) => setUsluge(actualData));
    const usID = [];
    usluge.forEach((usluga) => {
      console.log(usluga);
      usID.push(usluga.id);
    });
    setUslugeID(usID);
  };
  useEffect(() => {
    const getGradovi = async () => {
      fetch(api + `location`, {
        method: "GET",
        withCredentials: true,
      })
        .then((response) => {
          return response.json();
        })
        .then((actualData) => setNiz2(actualData));

      if (nivo != "") {
        fetch(api + `category/` + nivo)
          .then((response) => {
            return response.json();
          })
          .then((actualData) => setNiz1(actualData));
      }
    };
    getGradovi();
    ucitajUsluge();
  }, [nivo]);
  const dodaj = async (event) => {
    setOpen4(!open4);
    if (IDzamene === "") {
      if (
        grad !== "" &&
        oblast !== "" &&
        nivo !== "" &&
        naslov !== "" &&
        opis !== ""
      ) {
        let podaci = {
          name: naslov,
          bio: opis,
          photo: slika,
          new: false,
          locationId: grad.id,
          categoryId: oblast.id,
          userId: user.id,
        };
        await fetch(api + `class/addClass`, {
          withCredentials: true,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(podaci),
        }).then((response) => {
          return response.json();
        });

        ucitajUsluge();
        setPoruka("Usluga je uspešno dodata!");
        setOpen(true);
        setSlika("");
      }
    } else {
      if (
        grad !== "" &&
        oblast !== "" &&
        nivo !== "" &&
        naslov !== "" &&
        opis !== ""
      ) {
        let podaci = {
          name: naslov,
          bio: opis,
          photo: slika,
          new: false,
          locationId: grad.id,
          categoryId: oblast.id,
          userId: user.id,
        };
        await fetch(api + `class/updateClass/` + IDzamene, {
          withCredentials: true,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(podaci),
        }).then((response) => {
          return response.json();
        });
        setOpen(true);
        setPoruka("Usluga je uspešno promenjena!");
        ucitajUsluge();
        setSlika("");
      }
    }
  };

  async function izmeniUslugu(idUsluge) {
    await ucitajUsluge();
    setPadajuci(true);
    fetch(api + `class/singleClass/` + idUsluge, {
      method: "GET",
      withCredentials: true,
    })
      .then((response) => {
        return response.json();
      })
      .then((actualData) => {
        setOpen4(!open4);
        fetch(api + `level/` + actualData.category.id)
          .then((response) => {
            return response.json();
          })
          .then((data) => setNivo(data.id.toString())); //setNivo(data.id) OVO IZMENI DA BUDE BROJ OD 1 2 3 KAD PROCITA IZ BAZE
        setOblast(actualData.category);
        setGrad(actualData.location);
        setNaslov(actualData.name);
        setOpis(actualData.bio);
        setIDzamene(actualData.id);
        setSlika(actualData.photo);
      });
  }

  async function izbrisiUslugu(id) {
    await fetch(api + "class/deleteClass/" + id, {
      method: "DELETE",
    });
    setOpen2(true);
    ucitajUsluge();
  }

  async function prijaviOcenu(id) {
    if (id != undefined) {
      fetch(api + "grade/updateFlagged/" + id, {
        method: "PUT",
        withCredentials: true,
      }).then((response) => {
        return response.json();
      });
    }
    setOpen5(true);
    console.log(id);
  }

  async function sakriPrikazi() {
    ucitajUsluge();
    setNivo("");
    setOblast("");
    setGrad("");
    setNaslov("");
    setOpis("");
    setIDzamene("");
    setSlika("");
    setOpen4(true);
  }

  const promeniSliku = async () => {
    if (!file) {
      alert("Molim Vas izaberite fotografiju!");
    }
    const storageRef = ref(storage, `/files/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        console.log(url);
        setSlika(url);
      });
    });
  };

  async function prikaziOcene(id) {
    ucitajUsluge();
    if (id != undefined) {
      await fetch(api + `grade/signleGrade/` + id)
        .then((response) => {
          return response.json();
        })
        .then((actualData) => setOcene(actualData));
    }
    if (id != undefined) {
      await fetch(api + `grade/updateNew/` + id, {
        method: "PUT",
        withCredentials: true,
      }).then((response) => {
        return response.json();
      });
    }
    setOpen3(true);
  }
  const Input = styled("input")({
    display: "none",
  });

  const [padajuci, setPadajuci] = useState(false);
  function ucitajPadajuci() {
    return (
      <>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Box sx={{ mx: 2 }} width="40%">
            <FormControl fullWidth sx={{ mr: 2 }}>
              <InputLabel id="demo-simple-select-label">Oblast</InputLabel>
              <Select
                defaultValue={oblast.name}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Oblast"
                renderValue={(value) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    <Chip key={value} label={value} />
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {niz1.map((oblast) => (
                  <MenuItem
                    key={oblast.id}
                    value={oblast.name}
                    onClick={(e) => setOblast(oblast)}
                  >
                    {oblast.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ my: 2, mx: 3 }} width="40%">
            <FormControl fullWidth sx={{ mr: 2 }}>
              <InputLabel id="demo-simple-select-label">Lokacija</InputLabel>
              <Select
                defaultValue={grad.name}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Lokacija"
                renderValue={(value) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    <Chip key={value} label={value} />
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {niz2.map((grad) => (
                  <MenuItem
                    key={grad.id}
                    value={grad.name}
                    onClick={(e) => setGrad(grad)}
                  >
                    {grad.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <Grid
      container
      item
      sm={12}
      md={9}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        margin: "auto",
        padding: "5px",
      }}
    >
      <div>
        {!prikaziUsluge ? (
          <>
            <Grid
              item
              xs={12}
              component={Paper}
              elevation={10}
              sx={{ marginTop: "2rem", marginBottom: "2rem" }}
            >
              <Card sx={{ display: "flex" }}>
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography component="h1" variant="h4">
                    Zdravo {user.name + " " + user.surname},
                  </Typography>
                  <Typography component="h1" variant="h5">
                    Dobro došli na ITutor!
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {dani[day]}, {meseci[month]} {date}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{
                    width: 250,
                    display: { xs: "none", sm: "block" },
                    marginRight: "3rem",
                  }}
                  image={Tutor}
                />
              </Card>
            </Grid>
          </>
        ) : null}
        <Box mt="2rem" mb="2rem">
          <Typography
            variant="h3"
            align="center"
            marginBottom="2rem"
            fontWeight="700"
            borderBottom="2px solid gray"
          >
            {prikaziUsluge ? "Vaše usluge" : "Prikaži moje usluge"}
          </Typography>
          <ColorButton
            align="center"
            fullWidth
            onClick={() => setPrikaziUsluge(!prikaziUsluge)}
          >
            {prikaziUsluge ? "Sakrij" : "Prikaži"}
          </ColorButton>
        </Box>

        {prikaziUsluge ? (
          <Grid>
            {usluge.map((usluga, index) => {
              return (
                <Accordion
                  sx={{
                    paddingRight: "2rem",
                    paddingLeft: "2rem",
                    paddingTop: "0.3rem",
                    paddingBottom: "0.3rem",
                  }}
                  key={index}
                  expanded={expanded === "panel" + usluge.indexOf(usluga)}
                  onChange={handleChange("panel" + usluge.indexOf(usluga))}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={
                      "panel" + usluge.indexOf(usluga) + "bh-content"
                    }
                    id={"panel" + usluge.indexOf(usluga) + "bh-header"}
                  >
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      flexWrap={"wrap"}
                    >
                      <Box
                        height="150px"
                        minWidth="300px"
                        display={"flex"}
                        justifyContent={"center"}
                        style={{
                          backgroundColor: "lightGray",
                          marginRight: "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        {usluga.photo ? (
                          <img
                            src={usluga.photo}
                            style={{
                              maxHeight: "150px",
                              maxWidth: "300px",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <img
                            src={slikaUsluga}
                            style={{
                              maxHeight: "150px",
                              maxWidth: "300px",
                              objectFit: "contain",
                            }}
                          />
                        )}
                      </Box>
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"space-evenly"}
                      >
                        <Typography
                          sx={{ flexShrink: 0 }}
                          component="h3"
                          fontWeight="700"
                          variant="h5"
                          style={{ marginRight: "2rem" }}
                        >
                          Naslov: {usluga.name}
                        </Typography>
                        <Tooltip
                          title="Prikaži sve ocene za datu uslugu"
                          arrow
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 600 }}
                        >
                          <Typography
                            style={{ display: "flex", alignItems: "center" }}
                            component="h3"
                            fontWeight="500"
                            variant="h6"
                            onClick={() => prikaziOcene(usluga.id)}
                          >
                            Srednja ocena:
                            <Rating
                              name="read-only"
                              precision={0.1}
                              value={usluga.avgGrade} //pozovi srednje ocene ovde
                              readOnly
                            />
                            {usluga.new ? (
                              <Typography
                                style={{ fontSize: 16, color: "#b3b068" }}
                                fontWeight="500"
                                variant="h6"
                              >
                                [Ima novih ocena]
                              </Typography>
                            ) : null}
                          </Typography>
                        </Tooltip>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      borderTop={"solid gray 1px"}
                      borderBottom={"solid gray 1px"}
                      style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
                    >
                      {usluga.bio}
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      flexWrap={"wrap"}
                    >
                      <Box
                        display="flex"
                        flexDirection={"column"}
                        style={{ paddingLeft: "1rem" }}
                      >
                        <Typography
                          component="h3"
                          fontWeight="500"
                          variant="h6"
                          style={{ paddingTop: "1rem" }}
                        >
                          ○ Lokacija: {usluga.location.name}
                        </Typography>
                        <Typography
                          component="h3"
                          fontWeight="500"
                          variant="h6"
                        >
                          ○ Stepen: {"1" /*ovo resi*/}
                        </Typography>
                        <Typography
                          component="h3"
                          fontWeight="500"
                          variant="h6"
                          style={{ paddingBottom: "1rem" }}
                        >
                          ○ Oblast:{" "}
                          {usluga.category.name /*treba ispise kagetoriju*/}
                        </Typography>
                      </Box>
                      <Box>
                        <ColorButton
                          onClick={() => {
                            izmeniUslugu(usluga.id);
                          }}
                          variant="contained"
                          startIcon={<BorderColorIcon />}
                          style={{ float: "right" }}
                        >
                          Izmeni
                        </ColorButton>
                        <ColorButton
                          onClick={() => izbrisiUslugu(usluga.id)}
                          startIcon={<DeleteIcon />}
                          variant="contained"
                          sx={{ mr: 2 }}
                          style={{ float: "right" }}
                        >
                          Izbriši
                        </ColorButton>
                      </Box>
                    </Box>
                  </AccordionDetails>
                  <PopupDialog
                    onClose={() => setOpen3(false)}
                    fullWidth={true}
                    aria-labelledby="customized-dialog-title"
                    open={open3}
                    BackdropProps={{ style: { opacity: "20%" } }}
                  >
                    <PopupDialogTitle
                      id="customized-dialog-title"
                      onClose={() => {
                        ucitajUsluge();
                        setOpen3(false);
                      }}
                    >
                      Ocene
                    </PopupDialogTitle>
                    <DialogContent dividers>
                      <>
                        {ocene.map((ocena, index) => {
                          return (
                            <Grid
                              key={ocena.id}
                              display="flex"
                              flexDirection="column"
                              flexWrap={"wrap"}
                              component={Paper}
                              elevation={10}
                              margin={"1rem"}
                              style={
                                ocena.new
                                  ? { border: "double 5px #f2efa7" }
                                  : {}
                              }
                            >
                              <Box padding={"1rem"}>
                                <Box
                                  style={{
                                    marginTop: "-30px",
                                    marginRight: "-30px",
                                    float: "right",
                                  }}
                                >
                                  {ocena.new ? (
                                    <AutoAwesomeOutlinedIcon
                                      style={{ fontSize: 35, color: "#b3b068" }}
                                    />
                                  ) : null}
                                </Box>
                                <Typography
                                  component={"div"}
                                  gutterBottom
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Box>
                                    <Box fontWeight="800" display="inline">
                                      Datum:{" "}
                                    </Box>
                                    {new Date(
                                      Number(ocena.date)
                                    ).toLocaleDateString("de-DE", {
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                      hour: "numeric",
                                      minute: "numeric",
                                      second: "numeric",
                                    })}
                                  </Box>
                                </Typography>

                                <Typography
                                  component={"div"}
                                  gutterBottom
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Box
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Box fontWeight="800" display="inline">
                                      Ocena:{" "}
                                    </Box>
                                    <Rating
                                      name="read-only"
                                      precision={0.1}
                                      value={ocena.grade}
                                      readOnly
                                    />
                                  </Box>
                                  <ColorButton
                                    startIcon={<ReportGmailerrorredIcon />}
                                    variant="contained"
                                    onClick={() => prijaviOcenu(ocena.id)}
                                  >
                                    Prijavi
                                  </ColorButton>
                                </Typography>

                                <Typography gutterBottom component={"div"}>
                                  <Box fontWeight="800" display="inline">
                                    Komentar:{" "}
                                  </Box>
                                  {ocena.comment}
                                </Typography>

                                <Typography
                                  gutterBottom
                                  component={"div"}
                                ></Typography>
                              </Box>
                            </Grid>
                          );
                        })}
                      </>
                    </DialogContent>
                  </PopupDialog>
                </Accordion>
              );
            })}
            <ColorButton
              onClick={() => sakriPrikazi()}
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 8 }}
              style={{ float: "right", height: "65px", marginRight: "3rem" }}
            >
              <AddIcon style={{ fontSize: "2rem" }} />
            </ColorButton>
          </Grid>
        ) : null}
      </div>
      {
        <PopupDialog
          onClose={() => setOpen4(false)}
          maxWidth={"md"}
          fullWidth={true}
          aria-labelledby="customized-dialog-title"
          open={open4}
          BackdropProps={{ style: { opacity: "60%" } }}
        >
          <PopupDialogTitle
            id="customized-dialog-title"
            onClose={() => setOpen4(false)}
          >
            {IDzamene ? "Izmena usluge" : "Nova usluga"}
          </PopupDialogTitle>
          <DialogContent dividers>
            <Grid
              paddingLeft={"1rem"}
              paddingRight={"1rem"}
              display={"flex"}
              flexDirection={"column"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <Box
                  height="150px"
                  minWidth="300px"
                  maxWidth="300px"
                  display={"flex"}
                  justifyContent={"center"}
                  style={{ backgroundColor: "lightGray" }}
                >
                  {slika ? (
                    <img
                      src={slika}
                      style={{
                        maxHeight: "150px",
                        maxWidth: "300px",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <img
                      src={slikaUsluga}
                      style={{
                        maxHeight: "150px",
                        maxWidth: "300px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </Box>
                <Box display={"flex"} flexDirection={"row"}>
                  <Box style={{ display: "inline" }} paddingTop={"1rem"}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      style={{ marginBottom: "1rem" }}
                    >
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          type="file"
                          onChange={handleChange2}
                        />
                        <Button
                          variant="contained"
                          startIcon={<UploadIcon />}
                          component="span"
                          fullWidth
                        >
                          Dodaj sliku
                        </Button>
                      </label>
                    </Stack>
                  </Box>
                  <ColorButton
                    startIcon={<PhotoCameraIcon />}
                    style={{
                      marginBottom: "1rem",
                      marginTop: "1rem",
                      marginLeft: "0.5rem",
                    }}
                    onClick={promeniSliku}
                  >
                    Postavi sliku
                  </ColorButton>
                </Box>
                <Box width={"100%"}>
                  <Typography
                    paddingLeft={"0.5rem"}
                    fontWeight="600"
                    variant="h6"
                  >
                    Naslov
                  </Typography>
                  <TextField
                    value={naslov}
                    onChange={inputNaslov}
                    placeholder={"Unestie naslov za usluge koju želite dodati"}
                    fullWidth
                    id="nazivUsluge"
                    name="nazivUsluge"
                  />
                  <Typography
                    paddingLeft={"0.5rem"}
                    fontWeight="600"
                    variant="h6"
                  >
                    Opis
                  </Typography>
                  <TextField
                    value={opis}
                    multiline={true}
                    onChange={inputOpis}
                    placeholder={"Unesite opis usluge koju dodajete"}
                    fullWidth
                    name="opisUsluge"
                    id="opisUsluge"
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-evenly"
                mt="1rem"
              >
                <Typography fontWeight="600" variant="h6">
                  Stepen obrazovanja
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-evenly"
                >
                  <FormControlLabel
                    value="nivoOsnovne"
                    control={
                      <Radio
                        onChange={(event) => setNivo("1")}
                        checked={nivo === "1"}
                      />
                    }
                    label="Nivo osnovne škole"
                  />
                  <FormControlLabel
                    value="nivoSrednje"
                    control={
                      <Radio
                        onChange={(event) => setNivo("2")}
                        checked={nivo === "2"}
                      />
                    }
                    label="Nivo srednje škole"
                  />
                  <FormControlLabel
                    value="nivoFakulteta"
                    control={
                      <Radio
                        onChange={(event) => setNivo("3")}
                        checked={nivo === "3"}
                      />
                    }
                    label="Nivo fakulteta"
                  />
                </Box>
              </Box>
              {padajuci ? ucitajPadajuci() : ucitajPadajuci()}
              <ColorButton
                onClick={dodaj}
                startIcon={<SaveIcon />}
                variant="contained"
                style={{ alignSelf: "center" }}
              >
                {naslov ? "Sačuvaj" : "Dodaj"}
              </ColorButton>
            </Grid>
          </DialogContent>
        </PopupDialog>
      }
      {prikaziUsluge ? (
        <>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {poruka}
            </Alert>
          </Snackbar>
          <Snackbar open={open5} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="warning"
              icon={<PushPinOutlinedIcon />}
              sx={{ width: "100%" }}
            >
              Ocena je označena za pregled
            </Alert>
          </Snackbar>
          <Snackbar open={open2} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              icon={<DeleteOutlineIcon />}
              sx={{ width: "100%" }}
            >
              Usluga je uspešno obrisana!
            </Alert>
          </Snackbar>
          <Snackbar open={open6} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Slika je uspšno dodata, možete kliknuti na "Postavi sliku"
            </Alert>
          </Snackbar>
        </>
      ) : null}
    </Grid>
  );
};

export default TutorPocetna;
