import axios from "axios";
import React, { createContext, useReducer, useState } from "react";
import { reducerFunc } from "./reducerFunc";

import { GET_ALL_WISHLIST_ITEMS } from "../urls";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(reducerFunc, {
    productList: [],
    wishList: {},
    cartList: {},
    productCategory: [],
    productBrand: [],
    filterStates: {
      sortBy: null,
      includeOutOfStock: true,
      includeFastDelivery: false,
      brand: [],
      category: [],
    },

    displayComponent: "PRODUCT",
  });

  const fetchProductAndAdd = async ({ url, dispatchType, listType }) => {
    try {
      const { data } = await axios.get(url);
      if (data.success) {
        dispatch({ type: dispatchType, payload: data[listType] });
      }
      if (listType === "products") {
        dispatch({ type: "FILTER_ALL_BRANDS", payload: data["products"] });
        dispatch({ type: "FILTER_ALL_CATEGORY", payload: data["products"] });
      }
    } catch (error) {
      console.log("fetchProductAndAdd", { error });
    }
  };

  const initiaizeWishlist = async ({ url, userId }) => {
    try {
      setLoading(true);

      const { data } = await axios.post(url, { userId: `${userId}` });

      if (data.success) {
        dispatch({
          type: "ADD_TO_WISHLIST",
          payload: data.wishList,
        });

        const response = await axios.get(`${GET_ALL_WISHLIST_ITEMS}/${userId}`);

        if (response.data.success) {
          dispatch({
            type: "ADD_TO_WISHLIST",
            payload: response.data.wishList,
          });
        }
      }

      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  const initializeCartList = async ({ url, userId }) => {
    try {
      setLoading(true);
      const { data } = await axios.post(url, { userId: `${userId}` });

      if (data.success) {
        dispatch({
          type: "ADD_TO_CART",
          payload: data.cartList,
        });
      }

      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  const updateCartQuantity = async ({
    url,
    dispatchType,
    productId,
    updateType,
  }) => {
    let currentQuantity = state.cartList.cartItems.find(
      ({ _id: { _id } }) => _id === productId
    ).quantity;

    setLoading(true);

    updateType === "INCREMENT"
      ? (currentQuantity = currentQuantity + 1)
      : (currentQuantity = currentQuantity - 1);

    try {
      const { data, status } = await axios.post(`${url}`, {
        product: { productId: productId, quantity: currentQuantity },
      });

      if (status === 200) {
        dispatch({
          type: dispatchType,
          payload: data.updateItem.quantity,
          productId: data.updateItem.productId,
          updateType: updateType,
        });
      }
    } catch (error) {
      console.log("updateCartQuantity", { error });
    } finally {
      setLoading(false);
    }
  };

  const addProductToDb = async ({
    url,
    listType,
    dispatchType,
    productId,
    updateType,
  }) => {
    try {
      const { _id, ...itemNoId } = state.productList.filter(
        (product) => product._id === productId
      )[0];

      setLoading(true);

      const { data, status } = await axios.post(`${url}`, {
        product: { ...itemNoId },
      });

      if (status === 201) {
        dispatch({
          type: dispatchType,
          payload: data[listType],
          productId: productId,
          updateType: updateType,
        });
      }
    } catch (error) {
      console.log("addProductToDb", error);
    } finally {
      setLoading(false);
    }
  };

  const removeProductFromDb = async ({
    url,
    listType,
    dispatchType,
    productId,
    updateType,
  }) => {
    try {
      const idToDelete = state[listType].filter(
        (item) => item._id === productId
      )[0]._id;

      setLoading(true);

      const response = await axios.delete(`${url}/${idToDelete}`);

      if (response.status === 204) {
        dispatch({
          type: dispatchType,
          productId: productId,
          updateType: updateType,
        });
      }
    } catch (error) {
      console.log("removeProductFromDb", error);
    } finally {
      console.log("FROM FINALLY DELETE", { isLoading });
      setLoading(false);
    }
  };

  const addProductToCart = async ({ url, productId }) => {
    try {
      setLoading(true);

      const response = await axios.post(`${url}`, {
        product: { _id: productId, quantity: 1 },
      });

      if (response.data.success) {
        dispatch({
          type: "ADD_PRODUCT_TO_CART",
          payload: response.data.cartList,
          productId: productId,
        });
      }

      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const removeProductFromCart = async ({ url, productId }) => {
    try {
      const response = await axios.delete(`${url}`, {
        data: { productId: `${productId}` },
      });

      setLoading(true);

      if (response.data.success) {
        dispatch({
          type: "REMOVE_PRODUCT_FROM_CART",
          productId: productId,
        });
      }
    } catch (error) {
      console.log("removeProductFromDb", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const addProductToWishlist = async ({ url, productId }) => {
    try {
      setLoading(true);

      const response = await axios.post(url, {
        product: productId,
      });

      if (response.data.success) {
        dispatch({
          type: "ADD_PRODUCT_TO_WISHLIST",
          productId: productId,
          payload: response.data.wishList,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("addProductToDb", error);
    } finally {
      setLoading(false);
    }
  };

  const removeProductFromWishlist = async ({ url, productId }) => {
    try {
      const response = await axios.delete(`${url}`, {
        data: {
          productId: `${productId}`,
        },
      });

      setLoading(true);

      if (response.data.success) {
        dispatch({
          type: "REMOVE_PRODUCT_FROM_WISHLIST",
          productId: productId,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("removeProductFromDb", { error });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // console.log("useDataCONtext", { state });

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        fetchProductAndAdd,
        updateCartQuantity,
        addProductToDb,
        removeProductFromDb,
        isLoading,
        addProductToCart,
        removeProductFromCart,
        addProductToWishlist,
        removeProductFromWishlist,
        initiaizeWishlist,
        initializeCartList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
