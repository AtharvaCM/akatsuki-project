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
            textAlign={"center"}
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
                  spacing={1}
                  display="flex"
                  alignItems="center"
                  
                >
                  <Grid item xs={5} md={7}>
                    <input
                      placeholder="Type Your Email Here"
                      className={style.emailFields}
                    ></input>
                  </Grid>
                  <Grid item xs={5} md={5}>
                    <Button
                      size="large"
                      style={{ backgroundColor: "#353945", color: "white" }}
                    >
                      Subcribe
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
