import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { Box, Typography } from "@mui/material";
import ProductCard from "../../components/productCard";
import DynamicBreadcrumbs from "../../components/DynamicBreadcrumbs";

export default function ProductsByCategoryPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    items: products,
    status: productsStatus,
    error: productsError,
  } = useSelector((state) => state.products);
  const { items: categories, status: categoriesStatus } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }

    if (categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [productsStatus, categoriesStatus, dispatch]);

  const currentCategory = categories.find((cat) => cat.id === parseInt(id));

  const categoryName = currentCategory ? currentCategory.title : "Category";

  const productsInCategory = products.filter(
    (product) => product.categoryId === parseInt(id)
  );

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
        {categoryName}
      </Typography>

      {productsStatus === "loading" && (
        <Typography>Loading products...</Typography>
      )}

      {productsStatus === "failed" && (
        <Typography color="error">Error: {productsError}</Typography>
      )}

      {productsStatus === "succeeded" && productsInCategory.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 4,
            justifyItems: "center",
          }}
        >
          {productsInCategory.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              state={{
                fromCategory: {
                  id: currentCategory.id,
                  title: currentCategory.title,
                },
              }} // <-- ДОБАВЛЕНО
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </Box>
      ) : (
        productsStatus === "succeeded" && (
          <Typography>No products found in this category.</Typography>
        )
      )}
    </Box>
  );
}
