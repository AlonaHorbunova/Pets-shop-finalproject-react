import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Typography,
} from "@mui/material";

const ProductFilter = ({ onFilterChange, showDiscountFilter = true }) => {
  const [priceRange, setPriceRange] = useState({ from: "", to: "" });
  const [discountedOnly, setDiscountedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const handlePriceRangeChange = (e, field) => {
    const value = e.target.value;
    const newPriceRange = { ...priceRange, [field]: value };
    setPriceRange(newPriceRange);
    onFilterChange({ priceRange: newPriceRange, discountedOnly, sortBy });
  };

  const handleDiscountedChange = () => {
    const newValue = !discountedOnly;
    setDiscountedOnly(newValue);
    onFilterChange({ priceRange, discountedOnly: newValue, sortBy });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onFilterChange({ priceRange, discountedOnly, sortBy: value });
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "40px",
        alignItems: "center",
        mb: 5,
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {/* Price filter */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, height: 36 }}>
        <Typography
          sx={{ color: "#282828", fontSize: "20px", fontWeight: 600 }}
        >
          Price
        </Typography>
        <Box sx={{ mx: 1 }} /> {/* Отступ между названием и полями ввода */}
        <TextField
          type="number"
          placeholder="from"
          value={priceRange.from}
          onChange={(e) => handlePriceRangeChange(e, "from")}
          sx={{
            width: 80,
            height: "100%",
            "& .MuiOutlinedInput-root": {
              height: "100%",
              "& fieldset": { borderColor: "#E0E0E0" },
              "&:hover fieldset": { borderColor: "#0D50FF" },
              "&.Mui-focused fieldset": { borderColor: "#0D50FF" },
            },
          }}
        />
        <TextField
          type="number"
          placeholder="to"
          value={priceRange.to}
          onChange={(e) => handlePriceRangeChange(e, "to")}
          sx={{
            width: 80,
            height: "100%",
            "& .MuiOutlinedInput-root": {
              height: "100%",
              "& fieldset": { borderColor: "#E0E0E0" },
              "&:hover fieldset": { borderColor: "#0D50FF" },
              "&.Mui-focused fieldset": { borderColor: "#0D50FF" },
            },
          }}
        />
      </Box>

      {/* Discounted items filter */}
      {showDiscountFilter && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            sx={{ color: "#282828", fontSize: "20px", fontWeight: 600 }}
          >
            Discounted items
          </Typography>
          <Box sx={{ mx: 1 }} /> {/* Отступ между названием и чекбоксом */}
          <Box
            sx={{
              width: "36px",
              height: "36px",
              border: "1px solid #E0E0E0",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: discountedOnly ? "#0D50FF" : "transparent",
              cursor: "pointer",
            }}
            onClick={handleDiscountedChange}
          >
            {discountedOnly && (
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </Box>
        </Box>
      )}

      {/* Sort filter */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          sx={{ color: "#282828", fontSize: "20px", fontWeight: 600 }}
        >
          Sorted
        </Typography>
        <Box sx={{ ml: 1 }} />
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={sortBy}
            onChange={handleSortChange}
            sx={{
              height: 36,
              "& .MuiOutlinedInput-root": {
                height: "100%",
                "& fieldset": { borderColor: "#E0E0E0" },
                "&:hover fieldset": { borderColor: "#0D50FF" },
                "&.Mui-focused fieldset": { borderColor: "#0D50FF" },
              },
            }}
          >
            <MenuItem value="default">by default</MenuItem>
            <MenuItem value="newest">newest</MenuItem>
            <MenuItem value="price-high-low">price: high-low</MenuItem>
            <MenuItem value="price-low-high">price: low-high</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ProductFilter;
