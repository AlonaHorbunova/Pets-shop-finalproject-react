import { Box, Typography, IconButton } from "@mui/material";
import InstagramIcon from "../../assets/icons/ic-instagram.svg";
import WhatsAppIcon from "../../assets/icons/ic-whatsapp.svg";
import mapImage from "../../assets/images/map.svg";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "#FFFFFF",
        padding: "40px 0",
        marginTop: "auto",
        borderTop: "1px solid #DDDDDD",
      }}
    >
      <Box
        sx={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: "64px",
            lineHeight: "110%",
            letterSpacing: "0%",
            color: "#282828",
            marginBottom: "40px",
          }}
        >
          Contact
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "2fr 1fr",
            },
            gridTemplateRows: {
              xs: "auto",
              md: "150px 194px",
            },
            gap: "32px",
            marginBottom: "30px",
          }}
        >
          <Box
            sx={{
              background: "#F5F5F5",
              padding: "32px",
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="body2"
              component="p"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "130%",
                letterSpacing: "0%",
                color: "#8B8B8B",
                marginBottom: "16px",
              }}
            >
              Phone
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: "40px",
                lineHeight: "110%",
                letterSpacing: "0%",
                color: "#282828",
                marginBottom: "16px",
              }}
            >
              +49 30 915-88492
            </Typography>
          </Box>

          <Box
            sx={{
              background: "#F5F5F5",
              padding: "32px",
              borderRadius: "8px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "130%",
                letterSpacing: "0%",
                color: "#8B8B8B",
                marginBottom: "16px",
              }}
            >
              Socials
            </Typography>
            <Box>
              <IconButton
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener"
                sx={{
                  padding: "0 8px 8px 0",
                }}
              >
                <img
                  src={InstagramIcon}
                  alt="Instagram"
                  style={{ width: 43, height: 44 }}
                />
              </IconButton>
              <IconButton
                href="https://wa.me/493091588492"
                target="_blank"
                rel="noopener"
                sx={{
                  padding: "0 8px 8px 0",
                }}
              >
                <img
                  src={WhatsAppIcon}
                  alt="WhatsApp"
                  style={{ width: 43, height: 44 }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              background: "#F5F5F5",
              padding: "32px",
              borderRadius: "8px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "130%",
                letterSpacing: "0%",
                color: "#8B8B8B",
                marginBottom: "16px",
              }}
            >
              Address
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: "40px",
                lineHeight: "110%",
                letterSpacing: "0%",
                color: "#282828",
              }}
            >
              Wallstraße 9-13, 10179 Berlin, Deutschland
            </Typography>
          </Box>

          <Box
            sx={{
              background: "#F5F5F5",
              padding: "32px",
              borderRadius: "8px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "130%",
                letterSpacing: "0%",
                color: "#8B8B8B",
                marginBottom: "16px",
              }}
            >
              Working Hours
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: "40px",
                lineHeight: "110%",
                letterSpacing: "0%",
                color: "#282828",
              }}
            >
              24 hours a day
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: { xs: "200px", sm: "300px" },
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <img
            src={mapImage}
            alt="Location on map"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
