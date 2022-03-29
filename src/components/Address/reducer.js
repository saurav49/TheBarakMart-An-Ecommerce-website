function reducer(state, action) {
  switch (action.type) {
    case "ADD_NAME":
      return {
        ...state,
        name: {
          ...state.name,
          value: action.payload.replace(/[^a-zA-Z]/gi, ""),
        },
      };
    case "ADD_PHONE":
      return {
        ...state,
        phone: {
          ...state.phone,
          value: action.payload.replace(/[^0-9]/gi, ""),
        },
      };
    case "ADD_PINCODE":
      return {
        ...state,
        pincode: {
          ...state.pincode,
          value: action.payload.replace(/[^0-9]/gi, ""),
        },
      };
    case "ADD_CITY":
      return {
        ...state,
        city: {
          ...state.city,
          value: action.payload.replace(/[^a-zA-Z]/gi, ""),
        },
      };
    case "ADD_ADDRESS":
      return {
        ...state,
        address: {
          ...state.address,
          value: action.payload,
        },
      };
    case "ADD_STATE":
      return { ...state, state: { ...state.state, value: action.payload } };
    case "ADD_COUNTRY":
      return {
        ...state,
        country: { ...state.country, value: action.payload },
      };
    case "ADD_ERROR_NAME":
      return {
        ...state,
        name: { ...state.name, errorText: state.name.errorMessage },
      };
    case "REMOVE_ERROR_NAME":
      return {
        ...state,
        name: { ...state.name, errorText: "" },
      };
    case "ADD_ERROR_PINCODE":
      return {
        ...state,
        pincode: { ...state.pincode, errorText: state.pincode.errorMessage },
      };
    case "ADD_ERROR_VAL_PINCODE":
      return {
        ...state,
        pincode: { ...state.pincode, errorText: state.pincode.errorVal },
      };
    case "REMOVE_ERROR_PINCODE":
      return {
        ...state,
        pincode: { ...state.pincode, errorText: "" },
      };
    case "ADD_ERROR_PHONE":
      return {
        ...state,
        phone: { ...state.phone, errorText: state.phone.errorMessage },
      };
    case "ADD_ERROR_VAL_PHONE":
      return {
        ...state,
        phone: { ...state.phone, errorText: state.phone.errorVal },
      };
    case "REMOVE_ERROR_PHONE":
      return {
        ...state,
        phone: { ...state.phone, errorText: "" },
      };
    case "ADD_ERROR_CITY":
      return {
        ...state,
        city: { ...state.city, errorText: state.city.errorMessage },
      };
    case "REMOVE_ERROR_CITY":
      return {
        ...state,
        city: { ...state.city, errorText: "" },
      };
    case "ADD_ERROR_ADDRESS":
      return {
        ...state,
        address: { ...state.address, errorText: state.address.errorMessage },
      };
    case "REMOVE_ERROR_ADDRESS":
      return {
        ...state,
        address: { ...state.address, errorText: "" },
      };
    case "ADD_ERROR_STATE":
      return {
        ...state,
        state: { ...state.state, errorText: state.state.errorMessage },
      };
    case "REMOVE_ERROR_STATE":
      return {
        ...state,
        state: { ...state.state, errorText: "" },
      };
    case "ADD_ERROR_COUNTRY":
      return {
        ...state,
        country: { ...state.country, errorText: state.country.errorMessage },
      };
    case "REMOVE_ERROR_COUNTRY":
      return {
        ...state,
        country: { ...state.country, errorText: "" },
      };
    default:
      console.log(
        "Something went wrong with when you add info to your address"
      );
      return { ...state };
  }
}

export { reducer };
