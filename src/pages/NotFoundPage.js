import React from "react";
import styles from "./Home.module.css";
import NotFoundImage from "./undraw_page_not_found_su7k.svg";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.notFoundImageWrapper}>
        <img src={NotFoundImage} alt="not-found" />
      </div>
      <div className={styles.notFoundText}>
        <h2>404</h2>
        <p>Hey captain! Looks like you're heading to the wrong place!</p>
        <button className={styles.notFoundBtn} onClick={() => navigate("/")}>
          Take me back to the homepage
        </button>
      </div>
    </div>
  );
};

export { NotFoundPage };
