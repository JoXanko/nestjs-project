import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
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
import { ButtonGroup, Typography, TextField, Box } from "@mui/material";
import ProfileBadge from "./ProfilBadge";
import { api } from "../App";

import { app } from "../App";

export default function Ocene() {
  const [ocene, setOcene] = useState([]);
  const db = getFirestore(app);

  const handleOk = async (id) => {
    //updateDoc(doc(db, "ocene", id), { oznacena: false }).then(() => loadData());
    await fetch(api + `grade/updateFlaggedOK/` + id, {
      method: "PUT",
      withCredentials: true,
    }).then((response) => {
      return response.json();
    });
  };

  const handleObrisi = async (id) => {
    //deleteDoc(doc(db, "ocene", id)).then(() => loadData());
    await fetch(api + `grade/deleteGrade/` + id, {
      method: "DELETE",
      withCredentials: true,
    }).then((response) => {
      return response.json();
    });
  };

  const loadData = async () => {
    await fetch(api + `grade/getFlagged`, {
      method: "GET",
      withCredentials: true,
    })
      .then((response) => {
        return response.json();
      })
      .then((actualData) => {
        setOcene(actualData);
      });
    /*let temp = [];
    await getDocs(query(collection(db, "ocene"), where("oznacena", "==", true))).then((value) => {
      value.forEach((el) => {
        let t = el.data();
        t['docID'] = el.id;
        temp.push(t);
      });
    }).then(() => {
      setOcene(temp);
    });*/
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Grid container overflow={"scroll"}>
      <Grid item md={12} padding={"1rem"}>
        <Box width={"30%"}>
          <Typography variant={"h4"}>Prijavljene ocene</Typography>
        </Box>
      </Grid>
      <Grid item md={12} padding={"1rem"}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Korisnik</TableCell>
                <TableCell>Ime učenika</TableCell>
                <TableCell>ID usluge</TableCell>
                <TableCell>Komentar</TableCell>
                <TableCell>Ocena</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ocene.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <ProfileBadge korisnikID={row.student.id} />
                  </TableCell>
                  <TableCell>
                    {row.student.name + " " + row.student.surname}
                  </TableCell>
                  <TableCell>{row.class.id}</TableCell>
                  <TableCell>{row.comment}</TableCell>
                  <TableCell>{row.grade}</TableCell>
                  <TableCell align={"right"}>
                    <ButtonGroup>
                      <Button
                        color={"success"}
                        onClick={(event) => handleOk(row.id)}
                      >
                        Odobri
                      </Button>
                      <Button
                        color={"error"}
                        onClick={(event) => handleObrisi(row.id)}
                      >
                        Izbrisi
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
