import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { ButtonGroup, Typography, Box } from "@mui/material";
import ProfileBadge from "./ProfilBadge";
import { api } from "../App";
import Avatar from "@mui/material/Avatar";


export default function Ocene() {
  const [ocene, setOcene] = useState([]);

  const handleOk = async (id) => {
    await fetch(api + `grade/updateFlaggedOK/` + id, {
      method: "PUT",
      withCredentials: true,
    }).then((response) => {
      return response.json();
    });
    loadData();
  };

  const handleObrisi = async (id) => {
    await fetch(api + `grade/deleteGrade/` + id, {
      method: "DELETE",
      withCredentials: true,
    }).then((response) => {
      return response.json();
    });
    loadData();
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
        console.log(actualData)
      });
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
                <TableCell>Fotografija</TableCell>
                <TableCell>ID korisnik</TableCell>
                <TableCell>Ime</TableCell>
                <TableCell>Prezime</TableCell>
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
                  <Avatar src={row.student.imageUrl} />
                  </TableCell>
                  <TableCell>
                    {row.student.id}
                  </TableCell>
                  <TableCell>
                    {row.student.name}
                  </TableCell>
                  <TableCell>{row.student.surname}</TableCell>
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
