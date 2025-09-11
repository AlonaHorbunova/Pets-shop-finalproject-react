import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { addItem } from "../../redux/slices/basketSlice";
import { Box, Typography } from "@mui/material";
import ProductCard from "../../components/productCard";
import DynamicBreadcrumbs from "../../components/DynamicBreadcrumbs";
import ProductFilter from "../../components/ProductFilter";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  const handleFilterChange = ({ priceRange, discountedOnly, sortBy }) => {
    let filtered = [...products];

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

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
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
        All products
      </Typography>
      <ProductFilter onFilterChange={handleFilterChange} />
      {status === "loading" && <Typography>Loading products...</Typography>}
      {status === "failed" && (
        <Typography color="error">Error: {error}</Typography>
      )}
      {status === "succeeded" && filteredProducts.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 4,
            justifyItems: "center",
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </Box>
      )}
      {status === "succeeded" && filteredProducts.length === 0 && (
        <Typography>No products found.</Typography>
      )}
    </Box>
  );
}
