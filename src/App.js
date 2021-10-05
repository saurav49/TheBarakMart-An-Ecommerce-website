import React from "react";
import "./styles.css";
import { Login, PrivateRoute, SignUp } from "./pages/index";
import { Routes, Route } from "react-router-dom";

import {
  ProductList,
  Navbar,
  Filters,
  Cart,
  DetailedProductCard,
  Wishlist,
} from "./components/index";

import { Initialize } from "./utils";

export default function App() {
  Initialize();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <PrivateRoute
          path="/products"
          element={
            <React.Fragment>
              <Filters /> <ProductList />
            </React.Fragment>
          }
        />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <div className="appComponent">
          <PrivateRoute path="/product/:id" element={<DetailedProductCard />} />
        </div>
        <div className="appComponent">
          <Route path="/login" element={<Login />} />
        </div>
        <div className="appComponent">
          <Route path="/signup" element={<SignUp />} />
        </div>
      </Routes>
    </div>
  );
}
