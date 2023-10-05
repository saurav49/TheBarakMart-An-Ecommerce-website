import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";

const Toast = ({ message, type }) => {
  const ICON = type === "success" ? FaCheckCircle : BsFillInfoCircleFill;
 

  return (
    <React.Fragment>
      <div className={`alert alert-${type}`}>
        <p>
          <ICON />
        </p>
        <p>{message}</p>
      </div>
    </React.Fragment>
  );
};

export { Toast };
