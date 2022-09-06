import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUI
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

// MUI icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// CSS
import styles from "./BreadCrumbs.module.css";

const BreadCrumbs = (props) => {
  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        style={{ margin: "1% 0" }}
      >
        <Link key="1" to="/" className={styles.link}>
          Home
        </Link>
        {props.data &&
          props.data.map((elt, index) => (
            <Link key={index} to={elt.route} className={styles.link}>
              {elt.label}
            </Link>
          ))}
        <Typography key="10">{props.activePage}</Typography>
      </Breadcrumbs>
    </>
  );
};

BreadCrumbs.propTypes = {
  activePage: PropTypes.string,
  data: PropTypes.array,
};

export default BreadCrumbs;
