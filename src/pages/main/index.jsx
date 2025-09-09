import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { Box, Button, Typography, InputBase } from "@mui/material";
import { Link } from "react-router-dom";
import mainBanner from "../../assets/images/banner.png";
import dogs from "../../assets/images/dogs.svg";
import CategoryCard from "../../components/categoryCard";
import ProductCard from "../../components/productCard";

export default function MainPage() {
  const dispatch = useDispatch();

  const { items: categories, status: categoriesStatus } = useSelector(
    (state) => state.categories
  );
  const { items: products, status: productsStatus } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [categoriesStatus, productsStatus, dispatch]);

  const shuffledCategories = [...categories].sort(() => Math.random() - 0.5);
  const displayedCategories = shuffledCategories.slice(0, 4);

  const salesProducts = products.filter(
    (product) => product.discont_price !== null
  );
  const shuffledSalesProducts = [...salesProducts].sort(
    () => Math.random() - 0.5
  );
  const displayedSalesProducts = shuffledSalesProducts.slice(0, 4);

  return (
    <>
      <Box
        sx={{
          width: 1440,
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
          width: 1360,
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: 64,
                fontWeight: 700,
                lineHeight: "110%",
              }}
            >
              Categories
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                height: "2px",
                backgroundColor: "#D9D9D9",
                marginTop: "10px",
              }}
            />
          </Box>
          <Button
            variant="outlined"
            component={Link}
            to="/categories"
            sx={{
              color: "#000",
              borderColor: "#D9D9D9",
              textTransform: "none",
              "&:hover": {
                borderColor: "#D9D9D9",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            All categories
          </Button>
        </Box>
        {categoriesStatus === "loading" && (
          <Typography>Loading categories...</Typography>
        )}
        {categoriesStatus === "succeeded" && displayedCategories.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 4,
            }}
          >
            {displayedCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </Box>
        )}
        {categoriesStatus === "failed" && (
          <Typography color="error">
            Failed to load categories. Please try again later.
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          position: "relative",
          width: 1360,
          height: 486,
          margin: "0 auto",
          background:
            "linear-gradient(261.47deg, #2451C6 32.63%, #0D50FF 98.96%)",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "60px",
          overflow: "hidden",
          mt: "80px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: "64px",
            lineHeight: "110%",
            letterSpacing: 0,
            color: "#fff",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          5% off on the first order
        </Typography>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            component="img"
            src={dogs}
            alt="Dogs"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Box
            component="form"
            sx={{
              position: "absolute",
              bottom: "32px",
              right: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            <InputBase
              placeholder="Name"
              sx={{
                backgroundColor: "#0D50FF",
                border: "1px solid #FFFFFF",
                borderRadius: "6px",
                padding: "16px",
                width: "516px",
                height: "58px",
                color: "#FFFFFF",
                fontSize: "20px",
                fontWeight: 500,
                "&::placeholder": {
                  color: "#FFFFFF",
                },
              }}
            />
            <InputBase
              placeholder="Phone number"
              sx={{
                backgroundColor: "#0D50FF",
                border: "1px solid #FFFFFF",
                borderRadius: "6px",
                padding: "16px",
                width: "516px",
                height: "58px",
                color: "#FFFFFF",
                fontSize: "20px",
                fontWeight: 500,
                "&::placeholder": {
                  color: "#FFFFFF",
                },
              }}
            />
            <InputBase
              placeholder="Email"
              sx={{
                backgroundColor: "#0D50FF",
                border: "1px solid #FFFFFF",
                borderRadius: "6px",
                padding: "16px",
                width: "516px",
                height: "58px",
                color: "#FFFFFF",
                fontSize: "20px",
                fontWeight: 500,
                "&::placeholder": {
                  color: "#FFFFFF",
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                fontWeight: 600,
                padding: "16px 32px",
                textTransform: "none",
                fontSize: "20px",
                height: "58px",
                width: "516px",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              Get a discount
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: 1360,
          margin: "0 auto",
          padding: "0 20px",
          mt: "80px",
          mb: "80px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: 64,
                fontWeight: 700,
                lineHeight: "110%",
              }}
            >
              Sale
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                height: "2px",
                backgroundColor: "#D9D9D9",
                marginTop: "10px",
              }}
            />
          </Box>
          <Button
            variant="outlined"
            component={Link}
            to="/sales"
            sx={{
              color: "#000",
              borderColor: "#D9D9D9",
              textTransform: "none",
              "&:hover": {
                borderColor: "#D9D9D9",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            All sales
          </Button>
        </Box>
        {productsStatus === "loading" && (
          <Typography>Loading discounted products...</Typography>
        )}
        {productsStatus === "succeeded" && displayedSalesProducts.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 4,
            }}
          >
            {displayedSalesProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        ) : (
          productsStatus === "succeeded" && (
            <Typography>
              No discounted items available at the moment.
            </Typography>
          )
        )}
        {productsStatus === "failed" && (
          <Typography color="error">
            Failed to load products. Please try again later.
          </Typography>
        )}
      </Box>
    </>
  );
}
