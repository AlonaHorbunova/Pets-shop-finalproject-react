import { Box, Typography } from "@mui/material";

export default function ProductCard({ product = {} }) {
  const imageUrl = `http://localhost:3333${product.image}`;
  const hasDiscount = product.discont_price !== null;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discont_price) / product.price) * 100
      )
    : 0;

  return (
    <Box
      sx={{
        width: 280,
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >
      <img
        src={imageUrl}
        alt={product.title}
        style={{ width: "100%", height: "280px", objectFit: "cover" }}
      />

      {hasDiscount && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "#0D50FF",
            color: "#fff",
            borderRadius: "4px",
            padding: "4px 8px",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          -{discountPercentage}%
        </Box>
      )}

      <Box sx={{ padding: "16px" }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
          {product.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
          <Typography
            variant="h5"
            component="p"
            sx={{ fontWeight: 700, color: "#000" }}
          >
            ${hasDiscount ? product.discont_price : product.price}
          </Typography>
          {hasDiscount && (
            <Typography
              variant="body1"
              component="p"
              sx={{
                textDecoration: "line-through",
                color: "#888",
                fontWeight: 500,
              }}
            >
              ${product.price}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
