import React from "react";
import "./styles.css";
import { Login, PrivateRoute, SignUp, Home, NotFoundPage } from "./pages/index";
import { Route, Routes } from "react-router";

import {
  ProductList,
  Navbar,
  Filters,
  Cart,
  DetailedProductCard,
  Wishlist,
  CategoryPage,
  Footer,
} from "./components/index";

import { Initialize } from "./utils";

export default function App() {
  Initialize();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoute path="/category/:catId" element={<CategoryPage />} />
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
