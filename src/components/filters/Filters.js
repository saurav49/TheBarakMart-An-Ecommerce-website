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

  return (
    <React.Fragment>
      <div className={styles.filterContainer}>
        <button onClick={() => setShowFilters((showFilters) => !showFilters)}>
          <p
            style={{
              textTransform: "uppercase",
              fontWeight: "600",
              fontSize: "16px",
              margin: "1em 1em 0em 1em",
            }}
          >
            Filters
          </p>
          <BsFilter className={styles.filterIcon} />
        </button>
      </div>

      <div className={showFilters ? styles.showFilters : styles.hideFilters}>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            margin: "0em 1em",
          }}
        >
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
            <span style={{ padding: "0em 0.2em" }}> Price - High to Low </span>
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
            <span style={{ padding: "0em 0.2em" }}> Price - Low to High </span>
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
            <span style={{ padding: "0em 0.2em" }}> Include Out Of Stock </span>
          </label>

          <label>
            <input
              type="checkbox"
              checked={state.filterStates.includeFastDelivery}
              onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
            />
            <span style={{ padding: "0em 0.2em" }}> Fast Delivery </span>
          </label>
        </fieldset>
      </div>
    </React.Fragment>
  );
};

export { Filters };
