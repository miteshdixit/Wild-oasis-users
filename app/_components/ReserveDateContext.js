"use client"
// ReserveDateContext.js

import React, { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = {
  from: null,
  to: null,
};

export const ReservationProvider = ({ children }) => {
  const [range, setRange] = useState(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error(
      "useReservation must be used within a ReservationProvider"
    );
  }
  return context;
};
