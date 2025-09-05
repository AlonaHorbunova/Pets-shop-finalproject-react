import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import basket from "../../assets/icons/basket.svg";
import logo from "../../assets/icons/dogLogo.svg";

export default function Header() {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{
        width: 1440,
        height: 128,
        background: "#FFFFFF",
        borderBottom: "1px solid #DDDDDD",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", height: "100%" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <img src={logo} alt="PetShop logo" />
          <Typography
            component="div"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "130%",
              color: "#282828",
              cursor: "pointer",
            }}
          ></Typography>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Button
            color="inherit"
            sx={{ textTransform: "none", fontWeight: "inherit" }}
          >
            Main Page
          </Button>
          <Button
            color="inherit"
            sx={{ textTransform: "none", fontWeight: "inherit" }}
          >
            Categories
          </Button>
          <Button
            color="inherit"
            sx={{ textTransform: "none", fontWeight: "inherit" }}
          >
            All products
          </Button>
          <Button
            color="inherit"
            sx={{ textTransform: "none", fontWeight: "inherit" }}
          >
            All sales
          </Button>
        </Box>
        <IconButton size="large" color="primary">
          <img src={basket} alt="Shopping basket" width={28} height={28} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
