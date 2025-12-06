// src/contexts/User.js
import React, { createContext, useReducer } from 'react';

const initialState = {};

export const UserContext = createContext({
  user: initialState,
  dispatch: () => {},
});

const reducer = (state, action) => {
  // action으로 user 객체 직접 던지거나 {}로 로그아웃 처리
  if (!action) return state;
  if (action.type === 'SET_USER') return { ...action.payload };
  if (action.type === 'CLEAR_USER') return {};
  return state;
};

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
