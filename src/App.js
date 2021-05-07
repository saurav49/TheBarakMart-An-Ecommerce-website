import React, { useEffect } from "react";
import "./styles.css";
import { useDataContext } from "./context/useDataContext";
import { ProductList } from "./components/productList/ProductList";
import { Navbar } from "./components/navbar/Navbar";
import { Filters } from "./components/filters/Filters";
import { Cart } from "./components/cart/Cart";
import { Wishlist } from "./components/wishlist/Wishlist";
import { PrivateRoute } from "./pages/PrivateRoute";
import { Login } from "./pages/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/useAuthContext";

export default function App() {
  const { fetchProductAndAdd } = useDataContext();
  const { isLogin } = useAuthContext();

  let navigate = useNavigate();

  useEffect(() => {
    fetchProductAndAdd({
      url: "/api/products",
      dispatchType: "ADD_TO_PRODUCT",
      listType: "products"
    });
    navigate("/products");
  }, []);

  useEffect(() => {
    fetchProductAndAdd({
      url: "/api/wishLists",
      dispatchType: "ADD_TO_WISHLIST",
      listType: "wishLists"
    });
  }, []);

  useEffect(() => {
    fetchProductAndAdd({
      url: "/api/cartLists",
      dispatchType: "ADD_TO_CART",
      listType: "cartLists"
    });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <PrivateRoute
          isLogin={isLogin}
          path="/products"
          element={
            <>
              <Filters /> <ProductList />
            </>
          }
        />
        <PrivateRoute isLogin={isLogin} path="/cart" element={<Cart />} />
        <PrivateRoute
          isLogin={isLogin}
          path="/wishlist"
          element={<Wishlist />}
        />
        <div className="loginComponent">
          <Route path="/login" element={<Login />} />
        </div>
      </Routes>
    </div>
  );
}
