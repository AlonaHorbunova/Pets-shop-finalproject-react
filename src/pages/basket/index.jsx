import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BasketItem from "../../components/BasketItem";
import OrderForm from "../../components/OrderForm";
import { Box, Typography, Button } from "@mui/material";

export default function BasketPage() {
  const items = useSelector((state) => state.basket.items);

  return (
    <Box sx={{ p: 4, maxWidth: "1200px", mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Shopping cart
        </Typography>
        <Button component={Link} to="/products" variant="text" color="inherit">
          Back to the store
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 4,
        }}
      >
        <Box>
          {items.length === 0 ? (
            <Typography
              variant="h5"
              color="text.secondary"
              align="center"
              mt={5}
            >
              Your cart is empty. 🛒
            </Typography>
          ) : (
            items.map((item) => <BasketItem key={item.id} item={item} />)
          )}
        </Box>
        <Box>
          <OrderForm />
        </Box>
      </Box>
    </Box>
  );
}
