import React, { useState, useEffect } from "react";
import { GET_USER_INFO_API } from "../urls";
import styles from "./User.module.css";
import axios from "axios";
import { useAuthContext } from "../hook/index";
import { FaUserCircle } from "../icons/icon";
import { Address } from "../components/index";
import { Orders } from "./index";

const User = () => {
  const navigateArr = ["Profile", "Addresses", "Orders"];
  const [selectedNavigate, setSelectedNavigate] = useState("Profile");
  const [userInfo, setUserInfo] = useState({});
  let { userId, handleLogOut } = useAuthContext();
  if (!userId) {
    userId = localStorage.getItem("barak_userId");
  }

  useEffect(() => {
    (async function () {
      const response = await axios.get(`${GET_USER_INFO_API}/${userId}`);
      response.data.success && setUserInfo(response.data.reqdUser);
    })();
  }, [userId]);

  return (
    <div className={styles.user__wrapper}>
      <div className={styles.navigate__wrapper}>
        {navigateArr.map((item, index) => {
          return (
            <div
              className={`${styles.navigate__capsule} ${
                selectedNavigate === item && styles.navigate__capsule__active
              }`}
              key={index}
              onClick={() => setSelectedNavigate(item)}
            >
              <span>{item}</span>
            </div>
          );
        })}
      </div>
      {selectedNavigate === "Profile" && (
        <div className={styles.user__profile__wrapper}>
          <FaUserCircle className={styles.default__user__img} />
          {userInfo && userInfo.hasOwnProperty("username") ? (
            <div>
              <p>
                <span>Username:</span> {userInfo && userInfo?.username}
              </p>
              <p>
                <span>Email:</span> {userInfo && userInfo?.email}
              </p>
            </div>
          ) : (
            <div>
              <p>loading...</p>
            </div>
          )}
          <button className="btn btn-dark p-2" onClick={() => handleLogOut()}>
            Logout
          </button>
        </div>
      )}

      {selectedNavigate === "Addresses" && <Address isFromUser={true} />}
      {selectedNavigate === "Orders" && <Orders />}
    </div>
  );
};

export { User };
