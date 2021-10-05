import React, { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();

// const users = [
//   {
//     username: "admin",
//     password: "password123"
//   }
// ];

const userFunction = (state, action) => {
  switch (action.type) {
    case "ADD_USERS_TO_LIST":
      const item = localStorage.setItem(
        "users",
        JSON.stringify({ users: [...state.users, action.payload] })
      );
      return { ...state, users: [...state.users, action.payload] };

    case "UPDATE_USER_LIST":
      return { ...state, users: [...action.payload.users] };

    default:
      console.log("SOMETHING WENT WRONG PLEASE CHECK USEUSERCONTEXT");
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userFunction, {
    users: [
      {
        username: "admin",
        password: "password123",
      },
    ],
  });

  useEffect(() => {
    const updateUsers = JSON.parse(localStorage.getItem("users"));

    if (updateUsers) {
      dispatch({ type: "UPDATE_USER_LIST", payload: updateUsers });
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
