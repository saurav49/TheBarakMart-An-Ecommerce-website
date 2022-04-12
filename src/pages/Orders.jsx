import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hook/index";
import { ORDERS_API } from "../urls";
import styles from "./Orders.module.css";
import Loader from "react-loader-spinner";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [orderLoader, setOrderLoader] = useState(false);
  let { userId } = useAuthContext();
  if (!userId) {
    userId = localStorage.get("barak__userId");
  }

  useEffect(() => {
    (async function () {
      try {
        setOrderLoader(true);
        const response = await axios.get(`${ORDERS_API}/${userId}`);
        response.data.success && setAllOrders(response.data.orderList);
        setOrderLoader(false);
      } catch (error) {
        setOrderLoader(false);
        console.log(error);
      }
    })();
  }, [userId]);

  console.log(allOrders);

  return (
    <>
      {orderLoader ? (
        <Loader type="ThreeDots" color="#333" height={100} width={100} />
      ) : (
        <div>
          <h1>Orders</h1>
          {allOrders &&
            allOrders.length > 0 &&
            allOrders.map((order) => {
              return (
                <div key={order._id} className={styles.order__card}>
                  <div className={styles.order__desc}>
                    <h2 style={{ marginBottom: "0.75em" }}>Order Confirmed</h2>
                    <p>
                      Order:
                      <span className={styles.span__style}>#{order._id}</span>
                    </p>
                    <p>
                      <span className={styles.span__style}>Total:</span> ₹
                      {order.totalPrice}
                    </p>
                    <p>
                      <span className={styles.span__style}>Address:</span>
                      {order.address.name},{order.address.address}
                      {order.address.city}
                      {order.address.pincode} {order.address.state}
                      {order.address.country} {order.address.phone}
                    </p>
                  </div>
                  {order.items.map((item) => {
                    return (
                      <div
                        key={item._id._id}
                        className={styles.order__item__card}
                      >
                        <div className={styles.order__item__img__wrapper}>
                          <img
                            src={item._id.image}
                            alt="order-item"
                            className={styles.order__item__img}
                          />
                        </div>
                        <div className={styles.order__item__desc}>
                          <p style={{ textAlign: "center" }}>{item._id.name}</p>
                          <p>{item._id.brandName}</p>
                          <p style={{ marginTop: "1em" }}>
                            <span className={styles.span__style}>
                              Quantity:
                            </span>
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export { Orders };
