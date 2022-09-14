import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Custom components
import AddReview from "../AddReview";
import ViewReview from "../ViewReview";
import Loader from "../../UI/Loader";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Custom Alert Component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Custom hooks
import { useAxios } from "../../../hooks/useAxios";

const ReviewTab = (props) => {
  const { data, error, loaded, callAPI, setLoaded } = useAxios();
  const {
    data: listData,
    error: listError,
    loaded: listLoaded,
    callAPI: callListAPI,
    setLoaded: setlistLoaded,
  } = useAxios();

  const [open, setOpen] = useState(false);

  const [reviewPresent, setReviewPresent] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [reviewsList, setReviewsList] = useState(null);

  // const checkReviewURL = `http://127.0.0.1:5000/api/v1/hotels/${
  //   props.hotel_id
  // }/reviews/check-review?user_id=${2}`;
  // const reviewsListURL = `http://127.0.0.1:5000/api/v1/hotels/${props.hotel_id}/reviews`;
  const checkReviewURL = `${process.env.REACT_APP_FLASK_DOMAIN}/api/v1/hotels/${
    props.hotel_id
  }/reviews/check-review?user_id=${2}`;
  const reviewsListURL = `${process.env.REACT_APP_FLASK_DOMAIN}/api/v1/hotels/${props.hotel_id}/reviews`;

  // on load, chcek if the user has already posted a review
  // on load get the list of reviews if any
  useEffect(() => {
    callAPI(checkReviewURL);
    callListAPI(reviewsListURL);

    // if review is already present then just display the review
    if (loaded) {
      if (data.reviewPresent) {
        setReviewPresent(true);
        setUserReview(data.data);
      }
    }

    if (listLoaded) {
      setReviewsList(listData.data);
    }
  }, [loaded, listLoaded]);

  if (error || listError) {
    console.log("error: ", error || listError);
  }

  // when the AddReview child component adds a review, change the reviewPresent state
  const handleReviewAdd = () => {
    setReviewPresent(true);
    // get fresh data
    callAPI(checkReviewURL);
    callListAPI(reviewsListURL);

    setLoaded(false);
    setlistLoaded(false);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {/* Alert */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Review added successfully !
        </Alert>
      </Snackbar>
      {/* Alert end*/}

      {/* Loader */}
      {!loaded && <Loader />}

      {/* If the user has already submitted a review, dont display the form*/}
      {reviewPresent && userReview !== null && loaded && (
        <ViewReview
          comment={userReview.comment}
          rating={userReview.rating}
          review_date={userReview.review_date}
          username={userReview.username}
        />
      )}
      {!reviewPresent && userReview === null && loaded && (
        <AddReview onReviewAdd={handleReviewAdd} onOpen={setOpen} />
      )}

      <hr />

      {/* Display reviews list */}
      {reviewsList &&
        reviewsList.map((review) => (
          <ViewReview
            key={review.id}
            comment={review.comment}
            rating={review.rating}
            review_date={review.review_date}
            username={review.username}
          />
        ))}
    </>
  );
};

ReviewTab.propTypes = {
  hotel_id: PropTypes.number,
};

export default ReviewTab;
