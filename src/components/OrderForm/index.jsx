import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";

export default function OrderForm() {
  const items = useSelector((state) => state.basket.items);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce((total, item) => {
    const price = item.discont_price || item.price;
    return total + price * item.quantity;
  }, 0);

  const handleOrder = () => {
    console.log("Order submitted!");
    // Здесь будет логика для отправки формы,
    // например, на сервер или в Redux Thunk
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
        <Box component="form" noValidate autoComplete="off">
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
            onClick={handleOrder}
          >
            Order
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
