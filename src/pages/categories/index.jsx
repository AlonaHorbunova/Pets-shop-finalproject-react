import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { Box, Typography } from "@mui/material";
import CategoryCard from "../../components/categoryCard";
import DynamicBreadcrumbs from "../../components/DynamicBreadcrumbs";

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
      <DynamicBreadcrumbs />
      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: { xs: 32, md: 50, lg: 64 },
            lineHeight: "110%",
            letterSpacing: 0,
            color: "#282828",
            marginBottom: "40px",
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
            marginBottom: "46px",
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
