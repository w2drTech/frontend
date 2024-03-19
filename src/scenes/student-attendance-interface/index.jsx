import * as React from "react";
import { Box, Button, Typography } from "@mui/material";

function Carousel() {
  return (
    <Box id="container" sx={{ background: "#e0e0e0", display: "grid" }}>
      <Box
        id="button_wrapper"
        sx={{ display: "flex", justifyContent: "right", margin: "20px" }}
      >
        <a href="/register" style={{ textDecoration: "none", color: "white" }}>
          <Button variant="contain" sx={{ background: "black" }}>
            Sign Up
          </Button>
        </a>
        <a href="/login" style={{ textDecoration: "none", color: "white" }}>
          <Button
            variant="contain"
            sx={{ background: "white", color: "black" }}
          >
            Sign In
          </Button>
        </a>
      </Box>
      <Box
        id="header_wrapper"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Typography variant="h1" sx={{ color: "black" }}>
          Welcome to ABC Laboratories
        </Typography>
      </Box>
      <Box
        id="image_wrapper"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <img
          src="medicalLab.png"
          alt=""
          style={{ width: "50%", height: "300px" }}
        />
      </Box>
      <Box id="footer_wrapper" sx={{ height: "100%" }}>
        <Box
          sx={{
            textAlign: "center",
            position: "absolute",
            display: "flex",
            bottom: 0,
            justifyContent: "center",
            left: 600,
          }}
        >
          <Typography variant="body3" color="white" align="center">
            {"Copyright © "}
            <a
              style={{ color: "white", textDecoration: "none" }}
              href="https://abclab.lk/"
              target="_blank"
            >
              ABC Laboratories
            </a>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Carousel;
