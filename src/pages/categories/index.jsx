import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { Box, Typography, Button } from "@mui/material"; // Импортируем Button
import { Link } from "react-router-dom"; // Импортируем Link

import CategoryCard from "../../components/categoryCard";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const {
    items: categories,
    status,
    error,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  return (
    <Box
      sx={{ width: "100%", maxWidth: 1360, margin: "0 auto", padding: "20px" }}
    >
      <Box sx={{ marginBottom: 4 }}>
        <Box sx={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <Button
            variant="outlined"
            component={Link}
            to="/"
            sx={{
              color: "#000",
              borderColor: "#D9D9D9",
              textTransform: "none",
              fontWeight: 500,
              fontSize: 16,
              "&:hover": {
                borderColor: "#D9D9D9",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            Main page
          </Button>

          <Button
            variant="contained"
            component={Link}
            to="/products/all"
            sx={{
              background: "#0D50FF",
              color: "#fff",
              textTransform: "none",
              fontWeight: 500,
              fontSize: 16,
              "&:hover": {
                background: "#282828",
              },
            }}
          >
            All products
          </Button>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: { xs: 32, md: 50, lg: 64 },
            lineHeight: "110%",
            letterSpacing: 0,
            color: "#282828",
          }}
        >
          Categories
        </Typography>
      </Box>
      {status === "loading" && <Typography>Загрузка категорий...</Typography>}

      {status === "failed" && (
        <Typography color="error">
          Не удалось загрузить категории: {error}
        </Typography>
      )}

      {status === "succeeded" && categories.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 4,
          }}
        >
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </Box>
      )}

      {status === "succeeded" && categories.length === 0 && (
        <Typography>Категории не найдены.</Typography>
      )}
    </Box>
  );
}
