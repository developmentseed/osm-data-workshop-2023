import React from "react";

export const AppContext = React.createContext();

export const SET_DATA = "SET_DATA";
export const SET_CENTER = "SET_CENTER";

export const appReducer = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    case SET_CENTER:
      return { ...state, center: action.payload };
    default:
      return state;
  }
};
