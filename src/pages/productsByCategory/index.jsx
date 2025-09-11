import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { Box, Typography } from "@mui/material";
import ProductCard from "../../components/productCard";
import DynamicBreadcrumbs from "../../components/DynamicBreadcrumbs";
import ProductFilter from "../../components/ProductFilter";

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
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
    if (categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [productsStatus, categoriesStatus, dispatch]);

  useEffect(() => {
    if (products.length > 0 && categories.length > 0) {
      const productsInCategory = products.filter(
        (product) => product.categoryId === parseInt(id)
      );
      setFilteredProducts(productsInCategory);
    }
  }, [products, categories, id]);

  const currentCategory = categories.find((cat) => cat.id === parseInt(id));
  const categoryName = currentCategory ? currentCategory.title : "Category";

  const handleFilterChange = ({ priceRange, discountedOnly, sortBy }) => {
    let filtered = [...products].filter(
      (product) => product.categoryId === parseInt(id)
    );

    if (priceRange.from) {
      filtered = filtered.filter((product) => {
        const price = product.discont_price || product.price;
        return price >= Number(priceRange.from);
      });
    }
    if (priceRange.to) {
      filtered = filtered.filter((product) => {
        const price = product.discont_price || product.price;
        return price <= Number(priceRange.to);
      });
    }

    if (discountedOnly) {
      filtered = filtered.filter((product) => product.discont_price);
    }

    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "price-high-low":
        filtered.sort((a, b) => {
          const priceA = a.discont_price || a.price;
          const priceB = b.discont_price || b.price;
          return priceB - priceA;
        });
        break;
      case "price-low-high":
        filtered.sort((a, b) => {
          const priceA = a.discont_price || a.price;
          const priceB = b.discont_price || b.price;
          return priceA - priceB;
        });
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

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
      <ProductFilter onFilterChange={handleFilterChange} />
      {productsStatus === "loading" && (
        <Typography>Loading products...</Typography>
      )}
      {productsStatus === "failed" && (
        <Typography color="error">Error: {productsError}</Typography>
      )}
      {productsStatus === "succeeded" && filteredProducts.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 4,
            justifyItems: "center",
          }}
        >
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              state={{
                fromCategory: {
                  id: currentCategory.id,
                  title: currentCategory.title,
                },
              }}
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
