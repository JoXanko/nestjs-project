import { React, useState, useEffect } from "react";

//--CSS imports--
import "../css/App.css";

//--Material UI imports--
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import UploadIcon from "@mui/icons-material/Upload";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import SaveIcon from "@mui/icons-material/Save";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

//--firebase imports--
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../App.js";
import ResponsiveAppBar from "../elements/ResponsiveAppBar";
import Futer from "../elements/Footer";
import undf from "../assets/undefined.jpg";
import { ColorButton } from "./Theme";
import { Stack } from "react-bootstrap";
import { Alert, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { api } from "../App";

const Profile = () => {
  let userLogged = localStorage.getItem("user");
  const user = JSON.parse(userLogged);
  const storage = getStorage(app);
  const auth = getAuth(app);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [bio, setBio] = useState("");

  const inputIme = (event) => setIme(event.target.value);
  const inputPrezime = (event) => setPrezime(event.target.value);
  const inputBio = (event) => setBio(event.target.value);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setOpen(true);
  };

  const promeniLozinku = () => {
    sendPasswordResetEmail(auth, auth.currentUser.email);
    toast.success(
      "Zahtev za promenu lozinke Vam je poslat. Proverite i spam folder!"
    );
  };

  useEffect(() => {
    setIme(user.name);
    setPrezime(user.surname);
    setImage(user.imageUrl);
  }, []);

  const update = async (event) => {
    const podaci = {
      name: ime,
      surname: prezime,
      imageUrl: image,
      bio: bio,
      role: user.role,
    };
    await fetch(api + `user/` + user.id, {
      withCredentials: true,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(podaci),
    })
      .then((response) => {
        return response.json();
      })
      .then((actualData) => {
        localStorage.setItem("user", JSON.stringify(actualData));
        console.log(localStorage.getItem("user"));
      });
  };

  const promeniSliku = async () => {
    if (!file) {
      alert("Molim Vas izaberite fotografiju !");
    }

    const storageRef = ref(storage, `/files/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        setImage(url);
      });
    });
  };
  const Input = styled("input")({
    display: "none",
  });
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
      <ResponsiveAppBar user={user} />
      <Grid
        container
        item
        display="flex"
        flexDirection="column"
        alignItems={"center"}
        padding={"1rem"}
      >
        <Grid

          display="flex"
          flexDirection="column"
          component={Paper}
          sx={{ padding: "1rem" }}
        >
          <Grid item display="flex" flexDirection="row" flexWrap="wrap">
            <Box display="flex" flexDirection="column" sx={{ m: 2 }}>
              <Box style={{ backgroundColor: "lightGray" }}>
                {image ? (
                  <img
                    src={image}
                    height="250px"
                    style={{
                      maxHeight: "250px",
                      maxWidth: "250px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <img
                    src={undf}
                    height="250px"
                    style={{
                      maxHeight: "250px",
                      maxWidth: "250px",
                      objectFit: "contain",
                    }}
                  />
                )}
              </Box>
              <Stack
                direction="row"
                alignitems="center"
                spacing={2}
                style={{ marginBottom: "1rem", marginTop: "1rem" }}
              >
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    onChange={handleChange}
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

              <ColorButton
                startIcon={<PhotoCameraIcon />}
                onClick={promeniSliku}
              >
                Postavi sliku
              </ColorButton>
            </Box>
            <Box sx={{ mr: 2, mt: 2 }}>
              <Typography
                color="primary"
                component="h1"
                fontWeight="600"
                variant="h5"
              >
                Ime
              </Typography>
              <TextField
                margin="normal"
                onChange={inputIme}
                placeholder={ime}
                fullWidth
                id="ime"
                name="ime"
              />

              <Typography
                color="primary"
                component="h1"
                fontWeight="600"
                variant="h5"
              >
                Prezime
              </Typography>
              <TextField
                margin="normal"
                onChange={inputPrezime}
                placeholder={prezime}
                fullWidth
                name="prezime"
                id="prezime"
              />
            </Box>
          </Grid>
          <Box
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <>
              {user.role === "tutor" ? (
                <>
                  <Typography
                    color="primary"
                    component="h1"
                    fontWeight="600"
                    variant="h5"
                  >
                    Opis
                  </Typography>
                  <TextField
                    onChange={inputBio}
                    margin="normal"
                    placeholder={user.bio}
                    fullWidth
                    name="opis"
                    id="opis"
                    multiline={true}
                  />
                </>
              ) : (
                <></>
              )}
            </>
            <Box
              style={{
                marginBottom: 20,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 0,
                borderTop: "solid gray 1px",
                width: "45%",
              }}
            >
              <ColorButton
                onClick={update}
                startIcon={<SaveIcon />}
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                style={{ width: "100%" }}
              >
                Sačuvaj promene
              </ColorButton>
            </Box>
            <Box
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 0,
                width: "45%",
              }}
            >
              {/* <Button
                variant="outlined"
                color="warning"
                onClick={promeniLozinku}
                style={{ width: "100%" }}
                startIcon={<LockResetOutlinedIcon />}
              >
                Promenite lozinku
              </Button> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Slika je uspšno dodata, možete kliknuti na "Postavi sliku"
        </Alert>
      </Snackbar>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        newestOnTop
      />

      <Futer />
    </div>
  );
};

export default Profile;
