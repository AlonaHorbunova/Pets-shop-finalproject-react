import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { Box, Typography } from "@mui/material";
import ProductCard from "../../components/productCard";
import DynamicBreadcrumbs from "../../components/DynamicBreadcrumbs";
import ProductFilter from "../../components/ProductFilter";

export default function SalesPage() {
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
      const salesProducts = products.filter(
        (product) => product.discont_price !== null
      );
      setFilteredProducts(salesProducts);
    }
  }, [products]);

  const handleFilterChange = ({ priceRange, sortBy }) => {
    let filtered = [...products].filter(
      (product) => product.discont_price !== null
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
    <Box
      sx={{ maxWidth: 1360, margin: "0 auto", padding: "0 20px", mt: 5, mb: 5 }}
    >
      <DynamicBreadcrumbs />
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: "110%",
          }}
        >
          Discounted items
        </Typography>
      </Box>

      <ProductFilter
        onFilterChange={handleFilterChange}
        showDiscountFilter={false}
      />

      {status === "loading" && (
        <Typography>Loading discounted products...</Typography>
      )}

      {status === "failed" && (
        <Typography color="error">Error: {error}</Typography>
      )}

      {status === "succeeded" && filteredProducts.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 4,
            justifyItems: "center",
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      ) : (
        status === "succeeded" && (
          <Typography>No discounted items available at the moment.</Typography>
        )
      )}
    </Box>
  );
}
