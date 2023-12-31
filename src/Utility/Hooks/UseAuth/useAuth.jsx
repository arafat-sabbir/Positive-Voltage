import { useContext } from "react";
import { Context } from "../../../Auth/AuthProvider/AuthProvider";

const useAuth = () => {
  const auth = useContext(Context);
  return auth;
};

export default useAuth;
