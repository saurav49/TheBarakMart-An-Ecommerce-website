import { useContext } from "react";
import { DataContext } from "../context/index";

export const useDataContext = () => {
  return useContext(DataContext);
};
