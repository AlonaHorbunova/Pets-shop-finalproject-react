import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../redux/slices/productsSlice";
import { Box, Typography } from "@mui/material";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    selectedItem: product,
    status,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);

  if (status === "loading") {
    return <Typography>Loading product...</Typography>;
  }

  if (status === "failed") {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!product) {
    return <Typography>Product not found.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <Typography variant="h2" gutterBottom>
        {product.title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h4" color="primary">
          ${product.discont_price ? product.discont_price : product.price}
        </Typography>
        {product.discont_price && (
          <Typography variant="body1" sx={{ textDecoration: "line-through" }}>
            ${product.price}
          </Typography>
        )}
      </Box>
      <img
        src={`http://localhost:3333${product.image}`}
        alt={product.title}
        style={{ width: "100%", maxWidth: 600, marginTop: "20px" }}
      />
    </Box>
  );
}
