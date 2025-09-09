import { Link } from "react-router-dom";
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
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
          }}
        >
          <img src={logo} alt="PetShop logo" />
          <Typography
            component="span"
            sx={{
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
            component={Link}
            to="/"
            color="inherit"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "130%",
              color: "#282828",
            }}
          >
            Main Page
          </Button>
          <Button
            component={Link}
            to="/categories"
            color="inherit"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "130%",
              color: "#282828",
            }}
          >
            Categories
          </Button>
          <Button
            component={Link}
            to="/products"
            color="inherit"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "130%",
              color: "#282828",
            }}
          >
            All products
          </Button>
          <Button
            component={Link}
            to="/sales"
            color="inherit"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "130%",
              color: "#282828",
            }}
          >
            All sales
          </Button>
        </Box>
        <IconButton size="large" color="primary" component={Link} to="/basket">
          <img src={basket} alt="Shopping basket" width={28} height={28} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
