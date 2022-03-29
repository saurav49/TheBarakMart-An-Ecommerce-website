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
  Address,
  FinalCheckout,
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
        <Route path="/category/:catId" element={<PrivateRoute />}>
          <Route path="/category/:catId" element={<CategoryPage />} />
        </Route>
        <Route path="/products" element={<PrivateRoute />}>
          <Route
            path="/products"
            element={
              <React.Fragment>
                <Filters /> <ProductList />
              </React.Fragment>
            }
          />
        </Route>
        <Route path="/cart" element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/wishlist" element={<PrivateRoute />}>
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/product/:id" element={<PrivateRoute />}>
          <Route path="/product/:id" element={<DetailedProductCard />} />
        </Route>
        <Route path="/address" element={<PrivateRoute />}>
          <Route path="/address" element={<Address />} />
        </Route>
        <Route path="/finalcheckout" element={<PrivateRoute />}>
          <Route path="/finalcheckout" element={<FinalCheckout />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
