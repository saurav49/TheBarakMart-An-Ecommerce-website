const BASE_PATH = `https://barakMart.saurav49.repl.co`;
const PRODUCT_API = `${BASE_PATH}/products`;
const WISHLIST_API = `${BASE_PATH}/wishlist`;

const CART_API = `${BASE_PATH}/cart`;
const USER_API = `${BASE_PATH}/user`;
const SIGNUP_API = `${USER_API}/signup`;
const LOGIN_API = `${USER_API}/login`;

const GET_ALL_WISHLIST_ITEMS = `${WISHLIST_API}/get-items`;
const GET_ALL_CART_ITEMS = `${CART_API}/get-items`;

const ADD_PRODUCT_TO_WISHLIST = `${WISHLIST_API}/add-item`;
const ADD_PRODUCT_TO_CART = `${CART_API}/add-item`;

export {
  BASE_PATH,
  PRODUCT_API,
  WISHLIST_API,
  CART_API,
  USER_API,
  SIGNUP_API,
  LOGIN_API,
  GET_ALL_WISHLIST_ITEMS,
  ADD_PRODUCT_TO_WISHLIST,
  GET_ALL_CART_ITEMS,
  ADD_PRODUCT_TO_CART,
};
