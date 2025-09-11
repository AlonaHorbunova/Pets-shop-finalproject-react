import { useDispatch } from "react-redux";
import {
  removeItem,
  incrementItem,
  decrementItem,
} from "../../redux/slices/basketSlice";
import {
  Card,
  Box,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BasketItem({ item }) {
  const dispatch = useDispatch();
  const discountedPrice = item.discont_price || item.price;

  const handleRemove = () => {
    dispatch(removeItem(item.id));
  };

  const handleIncrement = () => {
    dispatch(incrementItem(item.id));
  };

  const handleDecrement = () => {
    dispatch(decrementItem(item.id));
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        mb: 2,
        boxShadow: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 100, height: 100, objectFit: "contain" }}
          image={`http://localhost:3333${item.image}`}
          alt={item.title}
        />
        <Box>
          <Typography variant="h6">{item.title}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <IconButton size="small" onClick={handleDecrement}>
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
            <IconButton size="small" onClick={handleIncrement}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          ${(discountedPrice * item.quantity).toFixed(2)}
        </Typography>
        {item.discont_price && (
          <Typography variant="body2" sx={{ textDecoration: "line-through" }}>
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        )}
        <IconButton onClick={handleRemove}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
