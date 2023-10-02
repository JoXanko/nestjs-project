import React from "react";

//--Material UI imports--
import { Box } from "@mui/material";

import "../css/App.css";
const Futer = () => {
  return (
    <Box
      display={"flex"}
      flexDirection="row"
      justifyContent={"center"}
      backgroundColor={"#1f5d78"}
      width={"100%"}
      padding={"auto"}
    >
      <h4 style={{ color: "#FFFFFF" }}>Copyright: ITutor © 2023</h4>
    </Box>
  );
};
export default Futer;
