import { React, useEffect } from "react";

//--CSS imports--
import "../css/App.css";

import { useNavigate } from "react-router-dom";

//--Material UI imports--
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

import Button from "@mui/material/Button";

const ProfileBadge = (props) => {
  console.log(props);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const doTutora = () => {
    console.log(props.tutor.id);
    navigate("/tutorProfil/" + props.tutor.name + "-" + props.tutor.surname, {
      state: {
        idUser: props.tutor.id,
        bio: props.tutor.bio,
        photo: props.tutor.imageUrl,
        name: props.tutor.name,
        surname: props.tutor.surname,
      },
    });
  };

  return (
    <Button
      onClick={doTutora}
      sx={{ border: "2px solid #012A4A", borderRadius: "25px" }}
    >
      <Grid
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Avatar alt="U" src={props.tutor.imageUrl} />
        <Typography fontWeight="600" sx={{ ml: 1.5 }}>
          {props.tutor.name} {props.tutor.surname}
        </Typography>
      </Grid>
    </Button>
  );
};

export default ProfileBadge;
