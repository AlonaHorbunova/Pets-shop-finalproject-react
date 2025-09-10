import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../redux/slices/productsSlice";
import { Box, Typography, Button } from "@mui/material";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    selectedItem: product,
    singleItemStatus: status, // <-- ИЗМЕНЕНО
    singleItemError: error, // <-- ИЗМЕНЕНО
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);

  // Объявляем breadcrumbs в самом начале, чтобы она была доступна
  let breadcrumbs = [
    { label: "Main page", path: "/" },
    { label: "All products", path: "/products" },
    { label: "Loading...", path: "#" }, // Временная надпись
  ];

  if (status === "loading" || status === "idle") {
    return (
      <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
        <Breadcrumbs crumbs={breadcrumbs} />
        <Typography>Loading product...</Typography>
      </Box>
    );
  }

  if (status === "failed") {
    breadcrumbs[breadcrumbs.length - 1] = {
      label: "Error",
      path: "#",
    };
    return (
      <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
        <Breadcrumbs crumbs={breadcrumbs} />
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!product) {
    breadcrumbs[breadcrumbs.length - 1] = {
      label: "Not found",
      path: "#",
    };
    return (
      <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
        <Breadcrumbs crumbs={breadcrumbs} />
        <Typography>Product not found.</Typography>
      </Box>
    );
  }

  // Обновляем хлебные крошки с реальным названием товара
  breadcrumbs = [
    { label: "Main page", path: "/" },
    { label: "All products", path: "/products" },
    { label: product.title, path: `/products/${product.id}` },
  ];

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <Breadcrumbs crumbs={breadcrumbs} />
      {/* Контейнер для двух колонок */}
      <Box sx={{ display: "flex", gap: "50px" }}>
        {/* Первая колонка: Изображение */}
        <Box sx={{ flex: 1 }}>
          <img
            src={`http://localhost:3333${product.image}`}
            alt={product.title}
            style={{ width: "100%", maxWidth: 600 }}
          />
        </Box>

        {/* Вторая колонка: Информация о товаре */}
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
          {/* Добавляем описание товара */}
          <Typography variant="body1" sx={{ mt: 2 }}>
            {product.description}
          </Typography>
          {/* Добавляем элементы управления количеством и кнопку "Добавить в корзину" */}
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
        </Box>
      </Box>
    </Box>
  );
}
