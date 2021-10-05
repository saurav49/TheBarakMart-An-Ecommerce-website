import React from "react";
import "./styles.css";
import { Login, PrivateRoute, SignUp, Home } from "./pages/index";
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
        <PrivateRoute path="/product/:id" element={<DetailedProductCard />} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Routes>
    </div>
  );
}
