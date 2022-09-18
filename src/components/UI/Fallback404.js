import React, { useEffect } from "react";

// react router
import { useNavigate } from "react-router-dom";

// MUI icons
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

// styles
import styles from "./Fallback404.module.css";

// path constants
import { ROUTES } from "../../utils/constants/routingPathConstants";

import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    rotateIcon: {
      animation: "$spin 2s linear infinite",
    },
    "@keyframes spin": {
      "0%": {
        transform: "rotate(360deg)",
      },
      "100%": {
        transform: "rotate(0deg)",
      },
    },
  })
);

const Fallback404 = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    // enable body overflow
    document.body.style.overflow = "auto";

    // navigate to the home
    navigate(ROUTES.HOME);
  };

  const classes = useStyles();

  useEffect(() => {
    // disable body scroll (overflow)
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className={styles.mainbox}>
      <div className={styles.err}>4</div>
      <HelpOutlineIcon
        className={classes.rotateIcon}
        sx={{
          position: "absolute",
          fontSize: "8.5rem",
          left: "44%",
          top: "17%",
          color: "#2918EE",
          animation: "spin 4s liner infinite",
        }}
      />
      <div className={styles.err2}>4</div>
      <div className={styles.msg}>
        Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
        existed in the first place?
        <p>
          Let&apos;s go{" "}
          <button className={styles.homeButton} onClick={goToHome}>
            home
          </button>{" "}
          and try from there.
        </p>
      </div>
    </div>
  );
};

export default Fallback404;
