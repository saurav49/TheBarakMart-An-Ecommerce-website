import { useEffect } from "react";
import { useDataContext } from "./hook/index";
import { PRODUCT_API, WISHLIST_API, CART_API } from "./urls";

const Initialize = () => {
  const { fetchProductAndAdd } = useDataContext();

  useEffect(() => {
    fetchProductAndAdd({
      url: `${WISHLIST_API}`,
      dispatchType: "ADD_TO_WISHLIST",
      listType: "wishList",
    });

    fetchProductAndAdd({
      url: `${CART_API}`,
      dispatchType: "ADD_TO_CART",
      listType: "cartList",
    });

    fetchProductAndAdd({
      url: `${PRODUCT_API}`,
      dispatchType: "ADD_TO_PRODUCT",
      listType: "products",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const checkInputField = (inputValue) => {
  return inputValue === "" ? "EMPTY" : "NOT_EMPTY";
};

const validateEmail = (email) => {
  const validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return validEmailRegex.test(email);
};

const validatePassword = (password) => {
  const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  return validPasswordRegex.test(password);
};

const validateUsername = (username) => {
  const validUsernameRegex = /^[a-zA-Z]/;

  return validUsernameRegex.test(username);
};

const isMatch = (password, confirmPassword) => {
  return password === confirmPassword ? true : false;
};

export {
  Initialize,
  checkInputField,
  validateEmail,
  validatePassword,
  validateUsername,
  isMatch,
};
