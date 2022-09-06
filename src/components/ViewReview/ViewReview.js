import React from "react";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const ViewReview = () => {
  return (
    <Card variant="outlined" style={styles.mainCard}>
      <Grid container display="flex" spacing={2}>
        <Grid item xs={12} md={6}>
          <A
        </Grid>
        <Grid item xs={12} md={6}>
          GRid2
        </Grid>
      </Grid>
    </Card>
  );
};

const styles = {
  mainCard: {
    padding: "20px",
    margin: "10%",
    borderRadius: "10px",
  },
};
export default ViewReview;
