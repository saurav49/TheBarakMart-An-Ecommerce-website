import React from "react";

const findUserByUsername = (userName, users) => {
  return users.find((user) => user.username === userName);
};

export const FakeAuthApi = (userName, password, users) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = findUserByUsername(userName, users);
      if (user !== undefined) {
        user.password === password
          ? resolve({ success: true, status: 200 })
          : reject({ success: false, status: 404 });
      }
      reject({ success: false, status: 404 });
    }, 3000);
  });
};
