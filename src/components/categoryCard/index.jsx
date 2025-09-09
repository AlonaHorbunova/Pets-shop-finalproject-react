import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CategoryCard({ category = {} }) {
  const imageUrl = `http://localhost:3333${category.image}`;

  return (
    <Box
      component={Link}
      to={`/categories/${category.id}`}
      sx={{
        width: 316,
        height: 392,
        textDecoration: "none",
        color: "inherit",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <img
        src={imageUrl}
        alt={category.title}
        style={{ width: "100%", height: "320px", objectFit: "cover" }}
      />
      <Box sx={{ padding: "16px" }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{ textAlign: "center", fontWeight: 600 }}
        >
          {category.title}
        </Typography>
      </Box>
    </Box>
  );
}
