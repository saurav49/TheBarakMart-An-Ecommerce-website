import axios from "axios";
import React, { createContext, useReducer, useState } from "react";
import { reducerFunc } from "./reducerFunc";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(reducerFunc, {
    productList: [],
    wishList: [],
    cartList: [],
    filterStates: {
      sortBy: null,
      includeOutOfStock: true,
      includeFastDelivery: false,
    },

    toast: {
      toastMsg: "",
      toastType: "",
    },
    displayComponent: "PRODUCT",
  });

  const fetchProductAndAdd = async ({ url, dispatchType, listType }) => {
    try {
      const { data } = await axios.get(url);
      if (data.success) {
        dispatch({ type: dispatchType, payload: data[listType] });
      }
    } catch (error) {
      console.log("fetchProductAndAdd", error);
    }
  };

  const updateCartQuantity = async ({
    url,
    dispatchType,
    productId,
    updateType,
    toastMsg,
    toastType,
  }) => {
    let currentQuantity = state.cartList.filter(
      (product) => product._id === productId
    )[0].quantity;

    const idToUpdate = state.cartList.filter(
      (product) => product._id === productId
    )[0]._id;

    // Updating Toast
    state.toast.toastMsg = toastMsg;
    state.toast.toastType = toastType;

    setLoading(true);

    updateType === "INCREMENT"
      ? (currentQuantity = currentQuantity + 1)
      : (currentQuantity = currentQuantity - 1);

    try {
      const { data, status } = await axios.post(`${url}/${idToUpdate}`, {
        product: { quantity: currentQuantity },
      });

      console.log({ data }, { status });

      if (status === 200) {
        dispatch({
          type: dispatchType,
          payload: data.cartItem.quantity,
          productId: productId,
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
    toastMsg,
    toastType,
  }) => {
    try {
      const { _id, ...itemNoId } = state.productList.filter(
        (product) => product._id === productId
      )[0];

      // Updating Toast
      state.toast.toastMsg = toastMsg;
      state.toast.toastType = toastType;

      setLoading(true);

      console.log({ _id }, { itemNoId });

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
      console.log("FROM FINALLY ADD", { isLoading });
      setLoading(false);
    }
  };

  const removeProductFromDb = async ({
    url,
    listType,
    dispatchType,
    productId,
    updateType,
    toastMsg,
    toastType,
  }) => {
    try {
      const idToDelete = state[listType].filter(
        (item) => item._id === productId
      )[0]._id;

      // Updating Toast
      state.toast.toastMsg = toastMsg;
      state.toast.toastType = toastType;

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

  const addProductToCart = async ({ url, productId, toastMsg, toastType }) => {
    try {
      const response = await axios.post(`${url}`, {
        product: { _id: productId, quantity: 1 },
      });

      // Updating Toast
      state.toast.toastMsg = toastMsg;
      state.toast.toastType = toastType;

      setLoading(true);

      if (response.data.success) {
        dispatch({
          type: "ADD_PRODUCT_TO_CART",
          payload: response.data.cartItem,
          productId: productId,
        });
        fetchProductAndAdd({
          url: `${url}`,
          dispatchType: "ADD_TO_CART",
          listType: "cartList",
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const removeProductFromCart = async ({
    url,
    productId,
    toastMsg,
    toastType,
  }) => {
    try {
      const response = await axios.delete(`${url}/${productId}`);

      // Updating Toast
      state.toast.toastMsg = toastMsg;
      state.toast.toastType = toastType;

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

  const addProductToWishlist = async ({
    url,
    productId,
    toastMsg,
    toastType,
  }) => {
    try {
      // Updating Toast
      state.toast.toastMsg = toastMsg;
      state.toast.toastType = toastType;

      setLoading(true);

      const response = await axios.post(url, {
        product: productId,
      });

      if (response.data.success) {
        dispatch({
          type: "ADD_PRODUCT_TO_WISHLIST",
          productId: productId,
          payload: response.data.wishItem,
        });
        fetchProductAndAdd({
          url: `${url}`,
          dispatchType: "ADD_TO_WISHLIST",
          listType: "wishList",
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("addProductToDb", error);
    } finally {
      console.log("FROM FINALLY ADD", { isLoading });
      setLoading(false);
    }
  };

  const removeProductFromWishlist = async ({
    url,
    productId,
    toastMsg,
    toastType,
  }) => {
    try {
      const response = await axios.delete(`${url}/${productId}`);

      // Updating Toast
      state.toast.toastMsg = toastMsg;
      state.toast.toastType = toastType;

      setLoading(true);

      if (response.data.success) {
        dispatch({
          type: "REMOVE_PRODUCT_FROM_WISHLIST",
          productId: productId,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("removeProductFromDb", error);
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
