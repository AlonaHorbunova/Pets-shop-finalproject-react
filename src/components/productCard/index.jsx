import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({ product = {} }) {
  const imageUrl = `http://localhost:3333${product.image}`;
  const hasDiscount = product.discont_price !== null;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discont_price) / product.price) * 100
      )
    : 0;

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          width: 316,
          height: 422,
          borderRadius: "12px",
          border: "1px solid #DDDDDD",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
          position: "relative",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      >
        <img
          src={imageUrl}
          alt={product.title}
          style={{
            width: "100%",
            height: "284px",
            objectFit: "cover",
            borderBottom: "1px solid #DDDDDD",
          }}
        />

        {hasDiscount && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
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

        <Box sx={{ padding: "20px 32px 32px" }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "130%",
              fontFamily: "Montserrat, sans-serif",
              mb: "16px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              gap: "20px",
            }}
          >
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: 600,
                fontSize: 40,
                lineHeight: "110%",
                fontFamily: "Montserrat, sans-serif",
                color: "#000",
              }}
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
    </Link>
  );
}
