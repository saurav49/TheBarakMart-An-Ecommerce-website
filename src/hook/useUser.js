import { useContext } from "react";
import { UserContext } from "../context/index";

export const useUserContext = () => {
  return useContext(UserContext);
};
