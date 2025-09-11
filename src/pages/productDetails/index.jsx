import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { fetchSingleProduct } from "../../redux/slices/productsSlice";
import { Box, Typography, Button } from "@mui/material";
import DynamicBreadcrumbs from "../../components/DynamicBreadcrumbs";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const _location = useLocation();
  const {
    selectedItem: product,
    singleItemStatus: status,
    singleItemError: error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);

  if (status === "loading" || status === "idle") {
    return (
      <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
        <DynamicBreadcrumbs />
        <Typography>Loading product...</Typography>
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
        <DynamicBreadcrumbs />
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
        <DynamicBreadcrumbs />
        <Typography>Product not found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <DynamicBreadcrumbs />
      <Box sx={{ display: "flex", gap: "50px" }}>
        <Box sx={{ flex: 1 }}>
          <img
            src={`http://localhost:3333${product.image}`}
            alt={product.title}
            style={{ width: "100%", maxWidth: 600 }}
          />
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h2" gutterBottom>
            {product.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h4" color="primary">
              ${product.discont_price ? product.discont_price : product.price}
            </Typography>

            {product.discont_price && (
              <Typography
                variant="body1"
                sx={{ textDecoration: "line-through" }}
              >
                ${product.price}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <Box sx={{ display: "flex", border: "1px solid #ccc" }}>
              <Button>-</Button>
              <Typography sx={{ p: 1 }}>1</Typography>
              <Button>+</Button>
            </Box>

            <Button variant="contained" sx={{ p: "10px 40px" }}>
              Add to cart
            </Button>
          </Box>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {product.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
