import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { clearBasket } from "../../redux/slices/basketSlice";
import closeIcon from "../../assets/icons/kreuz.svg";

const Popup = ({ onClose }) => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#28282866",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      p: 2,
    }}
  >
    <Box
      sx={{
        backgroundColor: "#0D50FF",
        color: "white",
        p: { xs: 3, md: 5 },
        borderRadius: "8px",
        textAlign: "left",
        position: "relative",
        maxWidth: "400px",
        width: "100%",
      }}
    >
      <Button
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          minWidth: "unset",
          width: 44,
          height: 44,
          p: 0,
          color: "white",
        }}
      >
        <img src={closeIcon} alt="Close" style={{ width: 22, height: 22 }} />
      </Button>
      <Typography
        variant="h5"
        sx={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: "40px",
          lineHeight: 1.1,
          color: "#FFFFFF",
          mb: 2,
          paddingBottom: "24px",
        }}
      >
        Congratulations!
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: "20px",
          lineHeight: 1.1,
          color: "#FFFFFF",
        }}
      >
        Your order has been successfully placed on the website.
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: "20px",
          lineHeight: 1.1,
          color: "#FFFFFF",
          mt: 1,
        }}
      >
        A manager will contact you shortly to confirm your order.
      </Typography>
    </Box>
  </Box>
);

export default function OrderForm() {
  const items = useSelector((state) => state.basket.items);
  const dispatch = useDispatch();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => {
    const price = item.discont_price || item.price;
    return total + price * item.quantity;
  }, 0);

  const handleOrder = (event) => {
    event.preventDefault();
    console.log("Order submitted!");
    setPopupVisible(true);
    dispatch(clearBasket());
  };

  return (
    <Card sx={{ p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Order details
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
          {totalItems} items
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Total
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            ${totalPrice.toFixed(2)}
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleOrder}
        >
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Phone number"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ py: 1.5 }}
            type="submit"
          >
            Order
          </Button>
        </Box>
      </CardContent>
      {isPopupVisible && <Popup onClose={() => setPopupVisible(false)} />}
    </Card>
  );
}
