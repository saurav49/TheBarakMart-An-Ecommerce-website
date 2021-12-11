import React from "react";
import { useParams } from "react-router";
import { useDataContext } from "../../hook";
import { ProductCard } from "../index";
import styles from "../productList/ProductList.module.css";
import { BackButton } from "../index";
const CategoryPage = () => {
  const {
    state: { productList },
  } = useDataContext();

  const { catId } = useParams();

  const productsOfParticularCategory = productList.filter(
    (product) => product.category === catId && product.inStock
  );

  return (
    <div className={styles.categoryPageWrapper}>
      <BackButton />
      <h2>{catId}</h2>
      <div className={styles.productList}>
        {productsOfParticularCategory.map(
          (
            { _id, name, desc, image, price, fastDelivery, inStock, offer },
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
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export { CategoryPage };

// CATEGORY PAGE FILTER

/* <React.Fragment>
        <div className={filterStyle.filterContainer}>
          <button onClick={() => setShowFilters((showFilters) => !showFilters)}>
            <p className={filterStyle.filterTextStyle}>Filters</p>
            <BsFilter className={filterStyle.filterIcon} />
          </button>
        </div>

        <div
          className={
            showFilters ? filterStyle.showFilters : filterStyle.hideFilters
          }
        >
          <div className={filterStyle.btnWrapper}>
            <button
              className={filterStyle.btn_clear_all}
              onClick={handleClearAllFilters}
            >
              Clear All
            </button>
          </div>

          <fieldset
            className={showFilters ? filterStyle.dBlock : filterStyle.dNone}
          >
            <legend> Sort By </legend>
            <label>
              <input
                type="radio"
                name="sort"
                checked={sortType === "HIGH_TO_LOW"}
                onChange={() => setSortType("HIGH_TO_LOW")}
              />
              <span className={filterStyle.spanStyle}>Price - High to Low</span>
            </label>

            <label>
              <input
                type="radio"
                name="sort"
                checked={sortType === "LOW_TO_HIGH"}
                onChange={() => setSortType("LOW_TO_HIGH")}
              />
              <span className={filterStyle.spanStyle}>Price - Low to High</span>
            </label>
          </fieldset>
          <fieldset
            className={showFilters ? filterStyle.dBlock : filterStyle.dNone}
          >
            <legend> Filters </legend>
            <label>
              <input
                type="checkbox"
                checked={isFastDelivery}
                onChange={() =>
                  setIsFastDelivery((isFastDelivery) => !isFastDelivery)
                }
              />
              <span className={filterStyle.spanStyle}> Fast Delivery </span>
            </label>
          </fieldset>
        </div>
      </React.Fragment> */
