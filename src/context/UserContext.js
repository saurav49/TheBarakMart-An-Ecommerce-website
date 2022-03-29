import axios from "axios";
import React, { createContext, useReducer } from "react";
import { ADDRESS_API, EDIT_ADDRESS } from "../urls";

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
      return {
        ...state,
        currentDeliverAddress: action.payload,
      };

    default:
      console.log("SOMETHING WENT WRONG PLEASE CHECK USEUSERCONTEXT");
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userFunction, {
    addresses: [],
    currentDeliverAddress: {},
  });

  const getAllAddresses = async (userId) => {
    try {
      const response = await axios.get(`${ADDRESS_API}/${userId}`);
      response.data.success &&
        dispatch({ type: "STORE_ADDRESS", payload: response.data.allAddress });
    } catch (error) {
      console.log({ error });
    }
  };

  const addNewAddress = async (
    userId,
    { _id, name, phone, pincode, city, address, state, country }
  ) => {
    try {
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
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteAddress = async (userId, id) => {
    try {
      const response = await axios.delete(`${ADDRESS_API}/${userId}`, {
        data: {
          addressId: id,
        },
      });
      response.data.success &&
        dispatch({ type: "REMOVE_ADDRESS", payload: response.data.addressId });
    } catch (error) {
      console.log({ error });
    }
  };

  const addEditAddress = async (userId, itemsToBeEdited) => {
    try {
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
    } catch (error) {
      console.log({ error });
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
