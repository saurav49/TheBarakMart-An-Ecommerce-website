import React from "react";
import "./styles.css";
import {
  Login,
  PrivateRoute,
  SignUp,
  Home,
  NotFoundPage,
  User,
  Orders,
} from "./pages/index";
import { Route, Routes } from "react-router";

import {
  ProductList,
  Navbar,
  Filters,
  Cart,
  DetailedProductCard,
  Wishlist,
  CategoryPage,
  Address,
  FinalCheckout,
} from "./components/index";
import { useAuthContext } from "./hook/index";
import { Initialize } from "./utils";
import axios from "axios";

export default function App() {
  Initialize();

  // TOKEN HANDLING
  let { token } = useAuthContext();
  !token && (token = JSON.parse(localStorage?.getItem("barak__token")));
  token && (axios.defaults.headers.common["Authorization"] = token);

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
        <Route path="/user" element={<PrivateRoute />}>
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="/orders" element={<PrivateRoute />}>
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}
