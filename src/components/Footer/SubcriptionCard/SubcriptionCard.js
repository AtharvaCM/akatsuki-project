import React from "react";
import { Button, Card, Grid, Typography, Box } from "@mui/material";
import style from "./SubcriptionCard.module.css";

const SubcriptionCard = () => {
  return (
    <div className={style.mainCards}>
      <Box>
        <div className={style.innerCard}>
          <Grid
            container
            display="flex"
            alignItems={"center"}
            textAlign={"left"}
            sx={{ paddingY: "2rem", paddingX: "1rem" }}
          >
            <Grid item xs={12} md={5}>
              <Typography variant="h5" color={"white"}>
                Get Our Pro Offers
              </Typography>
            </Grid>

            <Grid item xs={12} md={7}>
              <Card className={style.subCards}>
                <Grid
                  className={style.rightCard}
                  container
                  display="flex"
                  alignItems="right"
                  justifyContent={"space-between"}
                >
                  <Grid item xs={10} md={10}>
                    <input
                      placeholder="Type your email here"
                      className={style.emailFields}
                    ></input>
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Button
                      size="large"
                      style={{
                        backgroundColor: "#353945",
                        color: "white",
                        marginTop: "4px",
                        textTransform:"capitalize"
                      }}
                    >
                      Subscribe
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Box>
    </div>
  );
};

export default SubcriptionCard;
