import React from "react";

// Images Import
import { IMAGES } from "../../utils/constants/imagePathConstants";

// Style Import
import styles from "./HomeHeadline.module.css";

const HomeHeadline = () => {
  return (
    <>
      <div>
        <img
          className={styles.headlinebgimage}
          src={IMAGES.HOMEPAGE_HOTEL_IMAGE}
          alt="Hotel_Image"
        />
        <div className={styles.headlinecontainer}>
          <h2 className={styles.headline}>
            Book With Us <br /> And Enjoy Your
            <br /> Journey!
          </h2>
        </div>
      </div>
    </>
  );
};

export default HomeHeadline;
