import React, { useReducer } from "react";
import { AppContext, appReducer } from "./AppContext";

const AppProvider = ({ children }) => {
  const initialState = {
    data: null,
    center: null,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
