import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import fourSvg from "../../assets/images/4.svg";
import littleDogsSvg from "../../assets/images/little-dogs.svg";

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 200px)",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          width: "690.795px",
          height: "270px",
          mb: "32px",
        }}
      >
        <img
          src={fourSvg}
          alt="Four"
          style={{ width: "179.4px", height: "245.9px" }}
        />
        <img
          src={littleDogsSvg}
          alt="Little dogs"
          style={{ width: "300px", height: "270px" }}
        />
        <img
          src={fourSvg}
          alt="Four"
          style={{ width: "179.4px", height: "245.9px" }}
        />
      </Box>

      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontFamily: "Montserrat",
          fontWeight: 700,
          fontSize: "64px",
          lineHeight: "110%",
          letterSpacing: 0,
          textAlign: "center",
          color: "#282828",
          mb: "16px",
        }}
      >
        Page Not Found
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: "20px",
          lineHeight: "130%",
          letterSpacing: 0,
          textAlign: "center",
          verticalAlign: "middle",
          color: "#888",
          mb: "48px",
          maxWidth: "600px",
        }}
      >
        We're sorry, the page you requested could not be found.
        <br />
        Please go back to the homepage.
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{
          background: "#0D50FF",
          color: "#fff",
          padding: "16px 56px",
          textTransform: "none",
          fontWeight: 500,
          fontSize: 20,
          width: "209px",
          height: "58px",
          "&:hover": {
            background: "#282828",
          },
        }}
      >
        Go Home
      </Button>
    </Box>
  );
}
