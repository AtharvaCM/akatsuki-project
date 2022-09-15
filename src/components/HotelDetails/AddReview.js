import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

// MUI Icons
import SendIcon from "@mui/icons-material/Send";

// redux
import { useSelector } from "react-redux";

// Custom Hooks
import { useAxios } from "../../hooks/useAxios";

const AddReview = (props) => {
  // get hotel id from url
  const hotel_id = location.pathname.split("/").at(-1);

  const { data, loaded, error, callAPI } = useAxios();

  // selector
  const { token } = useSelector((state) => state.login);

  // states
  const [loadingDisabled, setLoadingDisabled] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // POST review on send button click
  const handleSubmitClick = () => {
    setLoading(true);

    // const addReviewURL = `http://127.0.0.1:5000/api/v1/hotels/${hotel_id}/reviews`;
    const addReviewURL = `${process.env.REACT_APP_FLASK_DOMAIN}/api/v1/hotels/${hotel_id}/reviews`;
    const reqBody = JSON.stringify({
      rating: rating,
      comment: comment,
      user_id: 2,
    });
    callAPI(addReviewURL, "POST", reqBody, { "x-access-token": token });
  };

  // discard the inputs
  const handleCancelClick = () => {
    setComment("");
    setRating(3);
  };

  const handleRatingChange = (event) => {
    const ratingValue = +event.target.value;

    setRating(ratingValue);

    if (ratingValue > 0) {
      setLoadingDisabled(false);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    // when API call is successful, stop loading button and show Snackbar
    if (loaded) {
      setLoading(false);

      if (data.status === "Review added successfully") {
        // notify parent that review is present now
        props.onOpen(true);
        props.onReviewAdd();
      }
    }

    if (error) {
      console.log("error: ", error);
    }
  }, [loaded, error]);

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
          value={rating}
          onChange={handleRatingChange}
        />
      </Box>
      {/* Input */}
      <Card variant="outlined" sx={styles.ReviewCard}>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={8}
          maxRows={8}
          placeholder="Write your detailed review here........"
          style={styles.textAreaCard}
          maxLength={600}
          value={comment}
          onChange={handleCommentChange}
        />
      </Card>
      {/* Actions */}
      <Box display={"flex"} alignItems="center" justifyContent={"right"}>
        <Button
          variant="outlined"
          sx={styles.cancelButton}
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
        <LoadingButton
          size="medium"
          disabled={loadingDisabled}
          onClick={handleSubmitClick}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          color="primary"
          sx={styles.submitButton}
        >
          Send
        </LoadingButton>
      </Box>
    </div>
  );
};

AddReview.propTypes = {
  onReviewAdd: PropTypes.func,
  onOpen: PropTypes.func,
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
