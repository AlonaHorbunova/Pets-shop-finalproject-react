import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ProductCard from "../../components/productCard";

export default function SalesPage() {
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const salesProducts = products.filter(
    (product) => product.discont_price !== null
  );

  return (
    <Box sx={{ maxWidth: 1360, margin: "0 auto", padding: "0 20px", mt: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: "110%",
          }}
        >
          Discounted items
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            height: "2px",
            backgroundColor: "#D9D9D9",
            mt: 2,
          }}
        />
      </Box>

      {status === "loading" && (
        <Typography>Loading discounted products...</Typography>
      )}
      {status === "failed" && (
        <Typography color="error">Error: {error}</Typography>
      )}

      {status === "succeeded" && salesProducts.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 4,
            justifyItems: "center",
          }}
        >
          {salesProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      ) : (
        status === "succeeded" && (
          <Typography>No discounted items available at the moment.</Typography>
        )
      )}
    </Box>
  );
}
