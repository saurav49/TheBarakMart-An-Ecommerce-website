import React, { useEffect, useState } from "react";

import { useDataContext } from "../context/useDataContext";

const useBill = () => {
  const { state } = useDataContext();

  const [totalMrp, setTotalMrp] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const reducer = (accumulator, currentValue) => {
    return accumulator + Number.parseFloat(currentValue.price);
  };

  // useEffect(() => {
  const calculateBill = () => {
    return state.cartList.reduce(reducer, 0);
  };

  setTotalMrp(calculateBill());
  setTotalAmount((amount) => amount + totalMrp + 150);

  console.log("usEBIllllLLL", state.price.TotalAmount, state.price.TotalMrp);
  // }, [state.cartList]);

  return { totalMrp };
};

export { useBill };
