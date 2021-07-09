import { createContext, useContext, useEffect, useReducer } from "react";
import { manageAuthReducer } from "./auth-reducer";

const AuthContext = createContext();
const initialState = {
  login: false,
  userId: null,
  userInitials: null,
};
export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(manageAuthReducer, initialState);

  useEffect(() => {
    const getDataFromLocalStorage = JSON.parse(
      localStorage.getItem("user_video_lib")
    );
    if (getDataFromLocalStorage) {
      authDispatch({
        type: "SET_USER_ID",
        value: {
          userId: getDataFromLocalStorage.userId,
          userInitials: getDataFromLocalStorage.userInitials,
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
