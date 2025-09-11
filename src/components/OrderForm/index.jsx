import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function OrderForm() {
  const items = useSelector((state) => state.basket.items);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + (item.discont_price || item.price) * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логика обработки заказа
    console.log("Заказ отправлен!");
  };

  return (
    <Box
      sx={{
        bgcolor: "grey.100",
        p: 3,
        borderRadius: "8px",
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Order details
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {totalItems} items
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 2,
        }}
      >
        <Typography variant="h6">Total</Typography>
        <Typography variant="h4" fontWeight="bold">
          ${totalPrice.toFixed(2)}
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField fullWidth label="Name" required />
        <TextField fullWidth label="Phone number" type="tel" required />
        <TextField fullWidth label="Email" type="email" required />
        <Button variant="contained" type="submit" size="large" sx={{ mt: 2 }}>
          Order
        </Button>
      </Box>
    </Box>
  );
}
