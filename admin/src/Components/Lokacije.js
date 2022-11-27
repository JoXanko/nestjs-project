import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  add,
  addDoc,
} from "firebase/firestore";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import {
  ButtonGroup,
  Typography,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { api } from "../App";

import { app } from "../App";

export default function Lokacije() {
  const [lokacije, setLokacije] = useState([]);
  const [naziv, setNaziv] = useState("");

  const db = getFirestore(app);

  const handleObrisi = async (id) => {
    //deleteDoc(doc(db, "lokacija", id)).then(() => loadData());
    await fetch(api + `location/` + id, {
      method: "DELETE",
      withCredentials: true,
    }).then((response) => {
      return response.json();
    });
    loadData();
  };

  const handleDodaj = async (event) => {
    /*addDoc(collection(db, "lokacija"), { grad: naziv }).then(() => {
      loadData();
    });*/
    let podaci = { name: naziv };
    await fetch(api + `location/`, {
      withCredentials: true,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(podaci),
    }).then((response) => {
      return response.json();
    });
    loadData();
  };

  const loadData = async () => {
    /*let temp = [];
        await getDocs(collection(db, "lokacija")).then((value) => {
            value.forEach((el) => {
                let t = el.data();
                t.docID = el.id;
                temp.push(t);
            });
        }).then((el) => {
            setLokacije(temp);
        });*/
    fetch(api + `location`, {
      method: "GET",
      withCredentials: true,
    })
      .then((response) => {
        return response.json();
      })
      .then((actualData) => {
        setLokacije(actualData);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Grid container overflow={"scroll"} ju>
      <Grid item md={12} padding={"1rem"}>
        <Typography variant={"h4"} sx={{ mb: "1rem" }}>
          Lokacije
        </Typography>
        <Grid width={"50%"}>
          <Typography variant={"h6"} sx={{ mb: "0.5rem" }}>
            Dodajte lokaciju
          </Typography>
          <TextField
            variant={"outlined"}
            sx={{ mb: "0.5rem" }}
            value={naziv}
            onChange={(event) => setNaziv(event.target.value)}
            fullWidth
          />

          <Button
            variant={"contained"}
            sx={{ mb: "0.5rem" }}
            color={"success"}
            onClick={(event) => handleDodaj()}
          >
            Dodaj
          </Button>
        </Grid>
      </Grid>
      <Grid item md={12} padding={"1rem"}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Lokacija</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lokacije.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell align={"right"}>
                    <ButtonGroup>
                      <Button
                        color={"error"}
                        onClick={(event) => handleObrisi(row.id)}
                      >
                        {" "}
                        Obriši
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
