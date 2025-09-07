import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { Box, Typography } from "@mui/material";

// Обновленный путь к вашему компоненту CategoryCard
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
    <Box sx={{ width: "100%", maxWidth: 1440, padding: "20px" }}>
      <Typography variant="h2" sx={{ marginBottom: 4 }}>
        All Categories
      </Typography>

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
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
