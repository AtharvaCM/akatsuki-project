import React, { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

const AddReview = () => {
  const [value, setValue] = useState(3);
  return (
    <div>
      <Box
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Typography sx={styles.header}>Attach your Review</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log(newValue);
          }}
        />
      </Box>
      <Card variant="outlined" sx={styles.ReviewCard}>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={8}
          maxRows={8}
          placeholder="Write your detailed review here........"
          style={styles.textAreaCard}
          maxLength={600}
        />
      </Card>
      <Box display={"flex"} alignItems="center" justifyContent={"right"}>
        <Button variant="outlined" sx={styles.cancelButton}>
          Cancel
        </Button>
        <Button variant="contained" sx={styles.submitButton}>
          Submit
        </Button>
      </Box>
    </div>
  );
};

const styles = {
  ReviewCard: {
    margin: "10px 0px",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#F4F5F7",
    height: "130px",
  },
  header: {
    fontSize: "25px",
    fontWeight: "600",
    marginBotton: "20px",
    boxShadow: "none",
  },
  cancelButton: {
    marginRight: "13px",
    borderRadius: "9px",
    width: "90px",
    backgroundColor: "#E1DFDF",
    color: "#A19F9F",
    border: "1px solid #E1DFDF",
    fontWeight: "400",
    textTransform: "none",
  },
  submitButton: {
    borderRadius: "9px",
    width: "90px",
    textTransform: "none",
    fontWeight: "400",
  },
  textAreaCard: {
    border: "none",
    backgroundColor: "#F4F5F7",
    width: "100%",
    outline: "none",
    borderBottom: "none",
  },
};
export default AddReview;
