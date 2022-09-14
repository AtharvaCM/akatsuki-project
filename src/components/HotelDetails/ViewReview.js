import React from "react";
import PropTypes from "prop-types";

//custom UI
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

//Image
import user from "../../assets/images/user.png";

const ViewReview = (props) => {
  const followers = 67;
  const Reviews = 25;

  return (
    <Card variant="outlined" style={styles.mainCard}>
      <Grid container display="flex">
        <Grid item xs={12} md={6}>
          <Grid container display="flex">
            <Avatar src={user} style={styles.userImg} />
            <div style={styles.userDetailsDiv}>
              <Typography sx={styles.userName}>
                <strong>{props.username}</strong>
              </Typography>
              <Typography sx={styles.userDetails}>Ireland</Typography>
              <Typography sx={styles.userDetails}>
                {followers} followers, {Reviews} Reviews
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display={"flex"} alignItems={"center"}>
            <Rating
              name="half-rating-read"
              defaultValue={props.rating}
              precision={0.5}
              readOnly
              style={{ paddingRight: "15px" }}
            />
            <Typography sx={styles.userDetails} style={{ fontSize: "15px" }}>
              {props.review_date}
            </Typography>
          </Box>
          <Typography
            sx={styles.userDetails}
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            {props.comment}
          </Typography>
          <Grid container display={"flex"}>
            <Button style={styles.buttons}>
              <strong>Comment</strong>
            </Button>
            <Button style={styles.buttons}>
              <strong>Like</strong>
            </Button>
            <Button style={styles.buttons}>
              <strong>Share</strong>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

ViewReview.propTypes = {
  username: PropTypes.string,
  comment: PropTypes.string,
  review_date: PropTypes.string,
  rating: PropTypes.number,
};

const styles = {
  mainCard: {
    padding: "30px",
    margin: "5% 0",
    borderRadius: "10px",
  },
  userDetailsDiv: {
    marginLeft: "10px",
    textAlign: "left",
  },
  userName: {
    fontSize: "16px",
    lineHeight: "19px",
  },
  userDetails: {
    fontSize: "13px",
    color: "#A4A3A3",
    lineHeight: "18px",
  },
  userImg: {
    height: "54px",
    width: "54px",
  },
  buttons: {
    height: "31px",
    width: "fit-content",
    borderRadius: "20px",
    backgroundColor: "#E7EFFC",
    border: "none",
    color: "#326BFF",
    marginRight: "15px",
    marginBottom: "10px",
    textTransform: "none",
  },
};

export default ViewReview;
