import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import mainBanner from "../../assets/images/banner.png";
import CategoryCard from "../../components/categoryCard";

export default function MainPage() {
  const dispatch = useDispatch();
  const { items: categories, status } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const displayedCategories = categories.slice(0, 4);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: 600,
          backgroundImage: `url(${mainBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          marginBottom: 10,
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            padding: "0 20px",
            textAlign: "left",
            marginLeft: "40px",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: { xs: 48, md: 70, lg: 96 },
              lineHeight: "110%",
              letterSpacing: 0,
              color: "#FFFFFF",
              textAlign: "left",
              marginBottom: 4,
            }}
          >
            Amazing Discounts <br /> on Pets Products!
          </Typography>

          <Button
            variant="contained"
            component={Link}
            to="/sales"
            sx={{
              background: "#0D50FF",
              color: "#fff",
              padding: "16px 32px",
              textTransform: "none",
              fontWeight: 500,
              fontSize: 20,
              "&:hover": {
                background: "#282828",
              },
              "&:active": {
                background: "#fff",
                color: "#000",
              },
            }}
          >
            Check out
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          minWidth: 1440,
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: "110%",
            marginBottom: 5,
          }}
        >
          Categories
        </Typography>
        {status === "loading" && <Typography>Loading categories...</Typography>}
        {status === "succeeded" && displayedCategories.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 4,
            }}
          >
            {displayedCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </Box>
        )}
        {status === "failed" && (
          <Typography color="error">
            Failed to load categories. Please try again later.
          </Typography>
        )}
      </Box>
    </>
  );
}
