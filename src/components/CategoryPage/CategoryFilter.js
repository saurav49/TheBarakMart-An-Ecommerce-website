import React, { useState } from "react";
import { BsFilter } from "../../icons/icon";
import styles from "../filters/Filters.module.css";

const CategoryFilter = () => {
  const [showFilters, setShowFilters] = useState(false);

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
          <label>
            <input
              type="checkbox"
              checked={state.filterStates.includeOutOfStock}
              onChange={() => dispatch({ type: "TOGGLE_AVAILABILITY" })}
            />
            <span className={styles.spanStyle}> Include Out Of Stock </span>
          </label>

          <label>
            <input
              type="checkbox"
              checked={state.filterStates.includeFastDelivery}
              onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
            />
            <span className={styles.spanStyle}> Fast Delivery </span>
          </label>
        </fieldset>
      </div>
    </React.Fragment>
  );
};

export { CategoryFilter };
