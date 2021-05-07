import React, { useState, useEffect, useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import styles from "./SearchBar.module.css";

const SearchBar = ({ input, onChange }) => {
  const [isShowSearchBar, setShowSearchBar] = useState(false);

  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleShowSearchBar = () => {
    setShowSearchBar((value) => !value);
  };

  return (
    <div className={styles.search}>
      <input
        ref={inputEl}
        type="text"
        value={input}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for products"
        className={isShowSearchBar ? styles.searchTerm : styles.searchTermHide}
      />

      <button className={styles.searchButton} onClick={handleShowSearchBar}>
        {isShowSearchBar ? <ImCancelCircle /> : <BiSearchAlt />}
      </button>
    </div>
  );
};

export { SearchBar };
