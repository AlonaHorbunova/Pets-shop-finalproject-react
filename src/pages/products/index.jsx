import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { Box, Typography } from "@mui/material";
import ProductCard from "../../components/productCard";
import DynamicBreadcrumbs from "../../components/DynamicBreadcrumbs";

export default function ProductsPage() {
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

  return (
    <Box sx={{ maxWidth: 1360, margin: "0 auto", padding: "0 20px", mt: 5 }}>
      <DynamicBreadcrumbs />
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontSize: 64,
          fontWeight: 700,
          lineHeight: "110%",
          marginBottom: 5,
        }}
      >
        All products
      </Typography>

      {status === "loading" && <Typography>Loading products...</Typography>}
      {status === "failed" && (
        <Typography color="error">Error: {error}</Typography>
      )}
      {status === "succeeded" && products.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 4,
            justifyItems: "center",
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      )}
      {status === "succeeded" && products.length === 0 && (
        <Typography>No products found.</Typography>
      )}
    </Box>
  );
}
