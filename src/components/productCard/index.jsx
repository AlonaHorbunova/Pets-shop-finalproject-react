import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/basketSlice";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"; // Import the add to cart icon

export default function ProductCard({ product = {} }) {
  const dispatch = useDispatch();
  const imageUrl = `http://localhost:3333${product.image}`;
  const hasDiscount = product.discont_price !== null;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discont_price) / product.price) * 100
      )
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    e.stopPropagation(); // Останавливаем распространение события на родительский Link
    dispatch(addItem(product));
  };

  return (
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
      <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
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
      </Link>

      {/* Кнопка "Добавить в корзину" */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToCart}
        sx={{
          position: "absolute",
          bottom: 12,
          right: 12,
          borderRadius: "50%",
          minWidth: "40px",
          height: "40px",
          p: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AddShoppingCartIcon />
      </Button>

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
  );
}
