import React, { useState } from "react";
import { ProductCard } from "./ProductCard";
import { useDataContext } from "../../context/useDataContext";
import { SearchBar } from "../searchBar/SearchBar";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const { state } = useDataContext();

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

  return (
    <div className={styles.productListContainer}>
      <SearchBar input={input} onChange={updateInput} />
      <h1 style={{ marginLeft: "1em" }}> All Products </h1>
      <div className={styles.productList}>
        {filteredData.map(
          (
            {
              productId,
              name,
              desc,
              image,
              price,
              fastDelivery,
              inStock,
              offer
            },
            index
          ) => {
            return (
              <ProductCard
                key={productId}
                productId={productId}
                index={index}
                dismissBtn={false}
                name={name}
                desc={desc}
                image={image}
                price={price}
                fastDelivery={fastDelivery}
                inStock={inStock}
                offer={offer}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export { ProductList };
