import React, { useState } from "react";
import { BsFilter } from "../../icons/icon";
import styles from "./Filters.module.css";
import { useDataContext } from "../../hook/index";

const Filters = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { state, dispatch } = useDataContext();

  const handleClearAllFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  const handleBrandFilter = (filterBrandArr, brandName) => {
    if (filterBrandArr.includes(brandName)) {
      dispatch({ type: "REMOVE_BRAND_FROM_FILTER", payload: brandName });
    } else {
      dispatch({ type: "ADD_BRAND_TO_FILTER", payload: brandName });
    }
  };

  const handleCategoryFilter = (filterCategoryArr, category) => {
    if (filterCategoryArr.includes(category)) {
      dispatch({ type: "REMOVE_CATEGORY_FROM_CATEGORY", payload: category });
    } else {
      dispatch({ type: "ADD_CATEGORY_TO_CATEGORY", payload: category });
    }
  };

  return (
    <React.Fragment>
      <div className={styles.filterContainer}>
        <button onClick={() => setShowFilters((showFilters) => !showFilters)}>
          <p className={styles.filterTextStyle}>Filters</p>
          <BsFilter className={styles.filterIcon} />
        </button>
      </div>

      <div className={showFilters ? styles.showFilters : styles.hideFilters}>
        <div className={styles.btnWrapper}>
          <button
            className={styles.btn_clear_all}
            onClick={handleClearAllFilters}
          >
            Clear All
          </button>
        </div>
        <fieldset className={showFilters ? styles.dBlock : styles.dNone}>
          <legend> Sort By </legend>
          <label>
            <input
              type="radio"
              name="sort"
              checked={
                state.filterStates.sortBy &&
                state.filterStates.sortBy === "HIGH_TO_LOW"
              }
              onChange={() =>
                dispatch({ type: "SORT", payload: "HIGH_TO_LOW" })
              }
            />
            <span className={styles.spanStyle}> Price - High to Low </span>
          </label>

          <label>
            <input
              type="radio"
              name="sort"
              checked={
                state.filterStates.sortBy &&
                state.filterStates.sortBy === "LOW_TO_HIGH"
              }
              onChange={() =>
                dispatch({ type: "SORT", payload: "LOW_TO_HIGH" })
              }
            />
            <span className={styles.spanStyle}> Price - Low to High </span>
          </label>
        </fieldset>
        <fieldset className={showFilters ? styles.dBlock : styles.dNone}>
          <legend> Filters </legend>
          <label className={styles.label__wrapper}>
            <input
              type="checkbox"
              checked={state.filterStates.includeOutOfStock}
              onChange={() => dispatch({ type: "TOGGLE_AVAILABILITY" })}
            />
            <span className={styles.spanStyle}> Include Out Of Stock </span>
          </label>

          <label className={styles.label__wrapper}>
            <input
              type="checkbox"
              checked={state.filterStates.includeFastDelivery}
              onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
            />
            <span className={styles.spanStyle}> Fast Delivery </span>
          </label>
        </fieldset>

        <fieldset className={showFilters ? styles.dBlock : styles.dNone}>
          <legend> Brands </legend>
          <div className={styles.checkbox__label__wrapper}>
            {state.productBrand.length > 0 &&
              state.productBrand.map((brandName, index) => {
                return (
                  <label key={index} className={styles.label__wrapper}>
                    <input
                      type="checkbox"
                      value={brandName}
                      checked={state.filterStates.brand.includes(brandName)}
                      onChange={() =>
                        handleBrandFilter(state.filterStates.brand, brandName)
                      }
                    />
                    <span className={styles.spanStyle}> {brandName} </span>
                  </label>
                );
              })}
          </div>
        </fieldset>

        <fieldset className={showFilters ? styles.dBlock : styles.dNone}>
          <legend> Category </legend>
          <div className={styles.checkbox__label__wrapper}>
            {state.productCategory.length > 0 &&
              state.productCategory.map((category, index) => {
                return (
                  <label key={index} className={styles.label__wrapper}>
                    <input
                      type="checkbox"
                      value={category}
                      checked={state.filterStates.category.includes(category)}
                      onChange={() =>
                        handleCategoryFilter(
                          state.filterStates.category,
                          category
                        )
                      }
                    />
                    <span className={styles.spanStyle}> {category} </span>
                  </label>
                );
              })}
          </div>
        </fieldset>
      </div>
    </React.Fragment>
  );
};

export { Filters };
