import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const DynamicBreadcrumbs = () => {
  const location = useLocation();
  const [crumbs, setCrumbs] = useState([]);
  const { items: products } = useSelector((state) => state.products);
  const { items: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const generatedCrumbs = [];

    generatedCrumbs.push({ label: "Main page", path: "/", isLast: false });

    const { fromCategory } = location.state || {};
    if (fromCategory && pathnames[0] === "products") {
      generatedCrumbs.push({
        label: "Categories",
        path: "/categories",
        isLast: false,
      });
      generatedCrumbs.push({
        label: fromCategory.title,
        path: `/categories/${fromCategory.id}`,
        isLast: false,
      });
    }

    pathnames.forEach((value, index) => {
      const currentPath = `/${pathnames.slice(0, index + 1).join("/")}`;
      let label = value.replace(/-/g, " ");
      const isLast = index === pathnames.length - 1;

      if (value === "categories" && !fromCategory) {
        label = "Categories";
      } else if (value === "products" && !fromCategory) {
        label = "All products";
      } else if (value === "sales") {
        label = "All sales";
      } else {
        const id = parseInt(value);
        if (!isNaN(id)) {
          const product = products.find((p) => p.id === id);
          if (product) {
            label = product.title;
          } else {
            const category = categories.find((c) => c.id === id);
            if (category) {
              label = category.title;
            }
          }
        }
      }

      if (
        (value === "products" && fromCategory) ||
        (value === "categories" && fromCategory)
      ) {
        //
      } else {
        generatedCrumbs.push({
          label: label,
          path: currentPath,
          isLast: isLast,
        });
      }
    });

    setCrumbs(generatedCrumbs);
  }, [location.pathname, location.state, products, categories]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        mt: "40px",
        mb: "40px",
      }}
    >
      {crumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {" "}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: "16px",
              py: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <Link
              to={crumb.path}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "126%",
                }}
              >
                {crumb.label}
              </Typography>
            </Link>
          </Box>
          {index < crumbs.length - 1 && (
            <Box
              sx={{
                width: "16px",
                height: "1px",
                backgroundColor: "grey.500",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default DynamicBreadcrumbs;
