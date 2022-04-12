import axios from "axios";
import React, { createContext, useReducer } from "react";
import { ADDRESS_API, EDIT_ADDRESS, ORDERS_API } from "../urls";

export const UserContext = createContext();

export const userFunction = (state, action) => {
  switch (action.type) {
    case "STORE_ADDRESS":
      return { ...state, addresses: [...action.payload] };
    case "ADD_NEW_ADDRESS":
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };
    case "REMOVE_ADDRESS":
      return {
        ...state,
        addresses: state.addresses.filter(
          (address) => address._id !== action.payload
        ),
      };
    case "EDIT_ADDRESS":
      return {
        ...state,
        addresses: state.addresses.map((address) =>
          address._id === action.payload.addressId
            ? { ...action.payload.editedItems }
            : { ...address }
        ),
      };
    case "ADD_DELIVER_ADDRESS":
      console.log(action.payload);
      return {
        ...state,
        currentDeliverAddress: action.payload,
      };
    case "TURN_ON_LOADER":
      return {
        ...state,
        isAddressLoading: true,
      };
    case "TURN_OFF_LOADER":
      return {
        ...state,
        isAddressLoading: false,
      };
    case "SAVE_ORDERS":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case "STORE_ALL_ORDERS":
      console.log(action.payload);
      return {
        ...state,
        orders: [...action.payload],
      };
    default:
      console.log("SOMETHING WENT WRONG PLEASE CHECK USEUSERCONTEXT");
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userFunction, {
    addresses: [],
    currentDeliverAddress: {},
    orders: [],
    isAddressLoading: false,
  });

  const getAllAddresses = async (userId) => {
    try {
      dispatch({ type: "TURN_ON_LOADER" });
      const response = await axios.get(`${ADDRESS_API}/${userId}`);
      response.data.success &&
        dispatch({ type: "STORE_ADDRESS", payload: response.data.allAddress });
      dispatch({ type: "TURN_OFF_LOADER" });
    } catch (error) {
      dispatch({ type: "TURN_OFF_LOADER" });
      console.log({ error });
    }
  };

  const addNewAddress = async (
    userId,
    { _id, name, phone, pincode, city, address, state, country }
  ) => {
    try {
      dispatch({ type: "TURN_ON_LOADER" });
      const response = await axios.post(`${ADDRESS_API}/${userId}`, {
        _id,
        name,
        phone,
        pincode,
        city,
        address,
        state,
        country,
      });
      response.data.success &&
        dispatch({
          type: "ADD_NEW_ADDRESS",
          payload: response.data.newAddress,
        });
      dispatch({ type: "TURN_OFF_LOADER" });
    } catch (error) {
      dispatch({ type: "TURN_OFF_LOADER" });
      console.log({ error });
    }
  };

  const deleteAddress = async (userId, id) => {
    try {
      dispatch({ type: "TURN_ON_LOADER" });
      const response = await axios.delete(`${ADDRESS_API}/${userId}`, {
        data: {
          addressId: id,
        },
      });
      response.data.success &&
        dispatch({ type: "REMOVE_ADDRESS", payload: response.data.addressId });
      dispatch({ type: "TURN_OFF_LOADER" });
    } catch (error) {
      dispatch({ type: "TURN_OFF_LOADER" });
      console.log({ error });
    }
  };

  const addEditAddress = async (userId, itemsToBeEdited) => {
    try {
      dispatch({ type: "TURN_ON_LOADER" });
      const response = await axios.post(`${EDIT_ADDRESS}/${userId}`, {
        addressId: itemsToBeEdited._id,
        itemsToBeEdited,
      });
      response.data.success &&
        dispatch({
          type: "EDIT_ADDRESS",
          payload: {
            addressId: response.data.addressId,
            editedItems: response.data.updatedAddress,
          },
        });
      dispatch({ type: "TURN_OFF_LOADER" });
    } catch (error) {
      dispatch({ type: "TURN_OFF_LOADER" });
      console.log({ error });
    }
  };

  const saveOrder = async (userId, orderDetails) => {
    try {
      const response = await axios.post(
        `${ORDERS_API}/${userId}`,
        orderDetails
      );
      response.data.success &&
        dispatch({ type: "SAVE_ORDERS", payload: response.data.saveOrder });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllOrders = async (userId) => {
    try {
      const response = await axios.get(`${ORDERS_API}/${userId}`);
      response.data.success &&
        dispatch({
          type: "STORE_ALL_ORDERS",
          payload: response.data.orderList,
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
        getAllAddresses,
        addNewAddress,
        deleteAddress,
        addEditAddress,
        saveOrder,
        getAllOrders,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
