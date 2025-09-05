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
        {" "}
        <Box display="flex" alignItems="center" gap={1}>
          <img src={logo} alt="PetShop logo" />
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", cursor: "pointer" }}
          ></Typography>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Button color="inherit">Main Page</Button>
          <Button color="inherit">Categories</Button>
          <Button color="inherit">All products</Button>
          <Button color="inherit">All sales</Button>
        </Box>
        <IconButton size="large" color="primary">
          <img src={basket} alt="Shopping basket" width={28} height={28} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
