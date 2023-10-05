import React from "react";
import { useNavigate } from "react-router";
import { IoMdArrowRoundBack } from "../../icons/icon";
import styles from "./ProductCard.module.css";
import { IconContext } from "react-icons/lib";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button className={styles.goBackBtn} onClick={() => navigate(-1)}>
      <IconContext.Provider value={{ size: "1.5rem" }}>
        <IoMdArrowRoundBack className={styles.goBackBtnIcon} />
      </IconContext.Provider>
    </button>
  );
};

export { BackButton };
