import React, { useState, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./Address.module.css";
import { IoMdAddCircleOutline, RiDeleteBin3Fill } from "../../icons/icon";
import { reducer } from "./reducer";
import { useUserContext, useAuthContext } from "../../hook/index";

const Address = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    state: { addresses },
    getAllAddresses,
    addNewAddress,
    deleteAddress,
  } = useUserContext();
  const { userId } = useAuthContext();

  useEffect(() => {
    getAllAddresses(userId);
  }, [getAllAddresses, userId]);

  return (
    <>
      {showModal && (
        <AddressModal
          setShowModal={setShowModal}
          userId={userId}
          addNewAddress={addNewAddress}
        />
      )}
      <div className={styles.address__wrapper}>
        <button
          className={styles.btn__address}
          onClick={() => setShowModal(true)}
        >
          <IoMdAddCircleOutline className={styles.btn__address__icon} />
          Add new address
        </button>
        <div className={styles.address__card__wrapper}>
          {addresses &&
            addresses.length > 0 &&
            addresses.map((address, index) => {
              return (
                <div className={styles.address__card} key={index}>
                  <p>
                    <span className={styles.span__bold}>Name:</span>
                    {address.name}
                  </p>
                  <p>
                    <span className={styles.span__bold}>Phone Number:</span>
                    {address.phone}
                  </p>
                  <p>
                    <span className={styles.span__bold}>Pincode:</span>
                    {address.pincode}
                  </p>
                  <p>
                    <span className={styles.span__bold}>Address:</span>
                    {address.address}
                  </p>
                  <p>
                    <span className={styles.span__bold}>City:</span>
                    {address.city}
                  </p>
                  <p>
                    <span className={styles.span__bold}>State:</span>
                    {address.state}
                  </p>
                  <p>
                    <span className={styles.span__bold}>Country:</span>
                    {address.country}
                  </p>
                  <div className={styles.address__btn_wrapper}>
                    <div className={styles.d_flex_row_align_center}>
                      {/* <button
                        className={styles.btn__address}
                        onClick={() =>
                          handleEditAddressBtn(userId, address._id)
                        }
                      >
                        <FiEdit2 className={styles.btn__address__icon} />
                        edit address
                      </button> */}
                      <button
                        className={styles.btn__address}
                        onClick={() => deleteAddress(userId, address._id)}
                      >
                        <RiDeleteBin3Fill
                          className={styles.btn__address__icon}
                        />
                        delete address
                      </button>
                    </div>
                    <button
                      className={styles.btn__address}
                      onClick={() => setShowModal(true)}
                    >
                      Deliver to this address
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

const initialState = {
  name: {
    value: "",
    errorMessage: "Name is Required",
    errorText: "",
  },
  phone: {
    value: "",
    errorMessage: "Phone is Required",
    errorVal: "Phone number should be of 10 digit",
    errorText: "",
  },
  pincode: {
    value: "",
    errorMessage: "Pincode is Required",
    errorVal: "Phone number should be of 6 digit",
    errorText: "",
  },
  city: {
    value: "",
    errorMessage: "City is Required",
    errorText: "",
  },
  address: {
    value: "",
    errorMessage: "Address is Required",
    errorText: "",
  },
  state: {
    value: "Assam",
    chooseFrom: [
      "Andhra Pradesh",
      "Assam",
      "Goa",
      "Karnataka",
      "Kerala",
      "Maharashtra",
      "Bihar",
      "Gujarat",
      "Haryana",
      "Manipur",
      "Tamil Nadu",
    ],
    errorMessage: "State is Required",
    errorText: "",
  },
  country: {
    value: "India",
    chooseFrom: ["India"],
    errorMessage: "Country is Required",
    errorText: "",
  },
};

const AddressModal = ({ setShowModal, userId, addNewAddress }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddAddress = () => {
    addNewAddress(userId, {
      _id: uuidv4(),
      name: state.name.value,
      phone: state.phone.value,
      pincode: state.pincode.value,
      city: state.city.value,
      address: state.address.value,
      state: state.state.value,
      country: state.country.value,
    });
  };

  const handleBlur = (inputType) => {
    switch (inputType) {
      case "NAME":
        state.name.value.length === 0
          ? dispatch({ type: "ADD_ERROR_NAME" })
          : dispatch({ type: "REMOVE_ERROR_NAME" });
        break;
      case "PHONE":
        state.phone.value.length === 0 && dispatch({ type: "ADD_ERROR_PHONE" });
        !/^\d{10}$/.test(state.phone.value) &&
          dispatch({ type: "ADD_ERROR_VAL_PHONE" });
        state.phone.value.length > 0 &&
          /^\d{10}$/.test(state.phone.value) &&
          dispatch({ type: "REMOVE_ERROR_PHONE" });
        break;
      case "PINCODE":
        state.pincode.value.length === 0 &&
          dispatch({ type: "ADD_ERROR_PINCODE" });
        !/^\d{6}$/.test(state.pincode.value) &&
          dispatch({ type: "ADD_ERROR_VAL_PINCODE" });
        state.pincode.value.length > 0 &&
          /^\d{6}$/.test(state.pincode.value) &&
          dispatch({ type: "REMOVE_ERROR_PINCODE" });
        break;
      case "STATE":
        state.state.value.length === 0
          ? dispatch({ type: "ADD_ERROR_STATE" })
          : dispatch({ type: "REMOVE_ERROR_STATE" });
        break;
      case "COUNTRY":
        state.country.value.length === 0
          ? dispatch({ type: "ADD_ERROR_COUNTRY" })
          : dispatch({ type: "REMOVE_ERROR_COUNTRY" });
        break;
      case "ADDRESS":
        state.address.value.length === 0
          ? dispatch({ type: "ADD_ERROR_ADDRESS" })
          : dispatch({ type: "REMOVE_ERROR_ADDRESS" });
        break;
      case "CITY":
        state.city.value.length === 0
          ? dispatch({ type: "ADD_ERROR_CITY" })
          : dispatch({ type: "REMOVE_ERROR_CITY" });
        break;

      default:
        console.log("something went wrong in onBlur");
        break;
    }
  };

  const handleSelectChange = (e, type) => {
    if (type === "STATE") {
      dispatch({ type: "ADD_STATE", payload: e.target.value });
    } else {
      dispatch({ type: "ADD_COUNTRY", payload: e.target.value });
    }
  };

  return (
    <div className={styles.modal__bg_wrapper}>
      <div className={styles.modal__body}>
        <div className={styles.form__wrapper}>
          <div className={styles.input__wrapper}>
            <label>Name</label>
            <input
              type="text"
              value={state?.name.value}
              placeholder="Enter name"
              onChange={(e) =>
                dispatch({ type: "ADD_NAME", payload: e.target.value })
              }
              onBlur={() => handleBlur("NAME")}
              className={
                !state.name.errorText
                  ? `${styles.address__input}`
                  : `${styles.address__input__error}`
              }
            />
            {state.name.errorText && (
              <span className={styles.error__text}>{state.name.errorText}</span>
            )}
          </div>
          <div className={styles.input__wrapper}>
            <label>Phone</label>
            <input
              type="text"
              value={state.phone.value}
              placeholder="Enter phone"
              onChange={(e) =>
                dispatch({ type: "ADD_PHONE", payload: e.target.value })
              }
              onBlur={() => handleBlur("PHONE")}
              className={
                !state.phone.errorText
                  ? `${styles.address__input}`
                  : `${styles.address__input__error}`
              }
            />
            {state.phone.errorText && (
              <span className={styles.error__text}>
                {state.phone.errorText}
              </span>
            )}
          </div>
          <div className={styles.input__wrapper}>
            <label>Pincode</label>
            <input
              type="text"
              placeholder="Enter pincode"
              value={state.pincode.value}
              onChange={(e) =>
                dispatch({ type: "ADD_PINCODE", payload: e.target.value })
              }
              onBlur={() => handleBlur("PINCODE")}
              className={
                !state.pincode.errorText
                  ? `${styles.address__input}`
                  : `${styles.address__input__error}`
              }
            />
            {state.pincode.errorText && (
              <span className={styles.error__text}>
                {state.pincode.errorText}
              </span>
            )}
          </div>
          <div className={styles.input__wrapper}>
            <label>City</label>
            <input
              type="text"
              placeholder="Enter city"
              value={state.city.value}
              onChange={(e) =>
                dispatch({ type: "ADD_CITY", payload: e.target.value })
              }
              onBlur={() => handleBlur("CITY")}
              className={
                !state.city.errorText
                  ? `${styles.address__input}`
                  : `${styles.address__input__error}`
              }
            />
            {state.city.errorText && (
              <span className={styles.error__text}>{state.city.errorText}</span>
            )}
          </div>
          <div className={styles.input__wrapper}>
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter address"
              value={state.address.value}
              onChange={(e) =>
                dispatch({ type: "ADD_ADDRESS", payload: e.target.value })
              }
              onBlur={() => handleBlur("ADDRESS")}
              className={
                !state.address.errorText
                  ? `${styles.address__input}`
                  : `${styles.address__input__error}`
              }
            />
            {state.address.errorText && (
              <span className={styles.error__text}>
                {state.address.errorText}
              </span>
            )}
          </div>
          <div className={styles.input__wrapper}>
            <label>State</label>
            <select
              name="state"
              id="state"
              value={state.state.value}
              className={styles.address__input}
              onChange={(e) => handleSelectChange(e, "STATE")}
            >
              {state.state.chooseFrom.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.input__wrapper}>
            <label>Country</label>
            <select
              name="country"
              id="country"
              value={state.country.value}
              className={styles.address__input}
              onChange={(e) => handleSelectChange(e, "COUNTRY")}
            >
              {state.country.chooseFrom.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className={styles.btn__wrapper}>
          <button
            className={styles.btn__add}
            onClick={() => handleAddAddress()}
          >
            Add Address
          </button>
          <button
            className={styles.btn__close}
            onClick={() => setShowModal(false)}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export { Address };
