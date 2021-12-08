import React, { useState, useEffect } from "react";
import { ProductCard, SearchBar, Toast } from "../index";
import { useDataContext } from "../../hook/index";
import styles from "./ProductList.module.css";
import { updateProductsWithWishListAndCartStatus } from "../../context/reducerFunc";

const ProductList = () => {
  const { state, isLoading } = useDataContext();

  const [finalData, setFinalData] = useState([]);
  const [input, setInput] = useState("");
  const [searchProductList, setSearchProductList] = useState();

  const getDataSorted = (productList, sortBy) => {
    if (sortBy === null) {
      return productList;
    }

    return sortBy === "HIGH_TO_LOW"
      ? productList.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      : productList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  };

  const getFilteredData = (
    productList,
    isIncludeFastDelivery,
    isIncludeOutOfStock
  ) => {
    if (isIncludeFastDelivery) {
      productList = productList.filter((item) => item.fastDelivery);
    }

    if (!isIncludeOutOfStock) {
      productList = productList.filter((item) => item.inStock);
    }

    return productList;
  };

  const sortedData = getDataSorted(
    state.productList,
    state.filterStates.sortBy
  );

  let filteredData = getFilteredData(
    sortedData,
    state.filterStates.includeFastDelivery,
    state.filterStates.includeOutOfStock
  );

  // Search Product function

  const updateInput = async (input) => {
    setInput(input);

    const filtered = filteredData.filter((product) => {
      return product.name.toLowerCase().includes(input.toLowerCase());
    });
    setSearchProductList(filtered);
  };

  // condition for when to include the searched product to the list
  input.length > 0
    ? (filteredData = searchProductList)
    : (filteredData = getFilteredData(
        sortedData,
        state.filterStates.includeFastDelivery,
        state.filterStates.includeOutOfStock
      ));

  useEffect(() => {
    setFinalData(
      updateProductsWithWishListAndCartStatus(
        filteredData,
        state.wishList,
        state.cartList
      )
    );
  }, [filteredData, state.cartList, state.wishList]);

  return (
    <div className={styles.productListContainer}>
      <SearchBar input={input} onChange={updateInput} />
      <h1 style={{ marginLeft: "1em" }}> All Products </h1>
      <div className={styles.productList}>
        {finalData.length > 0 &&
          finalData.map(
            (
              {
                _id,
                name,
                desc,
                image,
                price,
                fastDelivery,
                inStock,
                offer,
                isInWishList,
                isInCartList,
              },
              index
            ) => {
              return (
                <ProductCard
                  key={_id}
                  productId={_id}
                  index={index}
                  dismissBtn={false}
                  name={name}
                  desc={desc}
                  image={image}
                  price={price}
                  fastDelivery={fastDelivery}
                  inStock={inStock}
                  offer={offer}
                  isInWishList={isInWishList}
                  isInCartList={isInCartList}
                />
              );
            }
          )}
      </div>
      {isLoading && (
        <Toast message={state.toast.toastMsg} type={state.toast.toastType} />
      )}
    </div>
  );
};

export { ProductList };
