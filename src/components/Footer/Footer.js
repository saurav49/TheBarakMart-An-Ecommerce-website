import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <p className={styles.footerBrandName}>Barak Mart</p>
      <p className={styles.footerLink}>
        by
        <a target="_blank" href="https://github.com/saurav49">
          @SauravBiswas
        </a>
      </p>
    </div>
  );
};

export { Footer };
