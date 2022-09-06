import { Container, Grid, Box, Typography } from "@mui/material";
import React from "react";
import SubcriptionCard from "./SubcriptionCard/SubcriptionCard";
import style from "./Footer.module.css";
import Logo from "../../Image/logo.png";

const Footer = () => {
  return (
    <div>
      <Container className={style.footer} maxWidth="xl">
        <div style={{ backgroundColor: "#EAEAEB" }} className={style.innerfooter}>
          <Grid container spacing={4} xs={12}>
            <Grid item xs={3} >
              <Grid display="flex" >
                <Box
                  component="img"
                  alt="Img"
                  src={Logo}
                  style={{ marginRight: 10, height: 25 }}
                />
                <Typography variant="h6">Hotel Guide</Typography>
              </Grid>
              <Grid>
                <Typography fontSize={12} style={{ marginTop: 20 }} >
                  This is the team that specialises in making sure your travel
                  needs are met.
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={3} textAlign="center">
              <Grid style={{ marginBottom: 20 }}>
                <Typography variant="h6">Services</Typography>
              </Grid>
              <Grid>
                <Typography fontSize={12} style={{ marginBottom: 5 }}>
                  Travel booking
                </Typography>
                <Typography fontSize={12} style={{ marginBottom: 5 }}>
                  Flight booking
                </Typography>
                <Typography fontSize={12} style={{ marginBottom: 5 }}>
                  Car Rental
                </Typography>
                <Typography fontSize={12} style={{ marginBottom: 5 }}>
                  Five Star Hotel
                </Typography>
                <Typography fontSize={12} style={{ marginBottom: 5 }}>
                  Travelling
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={3} textAlign="center">
              <Grid style={{ marginBottom: 20 }}>
                <Typography variant="h6">Support</Typography>
              </Grid>
              <Grid>
                <Typography fontSize={12} style={{ marginBottom: 5 }}>
                  Account
                </Typography>
                <Typography fontSize={12} style={{ marginBottom: 5 }}>
                  Legal
                </Typography>
                <Typography fontSize={12} style={{ marginBottom: 5 }}>
                  Contact
                </Typography>
                <Typography fontSize={12} style={{ marginBottom: 5 }}>
                  Terms and Conditions
                </Typography>
                <Typography fontSize={12} style={{ marginBottom: 5 }}>
                  Privacy Policy
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={3} textAlign="center">
              <Grid style={{ marginBottom: 20 }}>
                <Typography variant="h6">Business</Typography>
              </Grid>
              <Grid>
                <Typography fontSize={12} style={{ marginBottom: 5 }}>
                  Success
                </Typography>
                <Typography fontSize={12} style={{ marginBottom: 5 }}>
                  About location
                </Typography>
                <Typography fontSize={12} style={{ marginBottom: 5 }}>
                  Blog
                </Typography>
                <Typography fontSize={12} style={{ marginBottom: 5 }}>
                  Information
                </Typography>
                <Typography fontSize={12} style={{ marginBottom: 5 }}>
                  Travel Guide
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
      <SubcriptionCard />
    </div>
  );
};

export default Footer;
