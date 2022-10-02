import React, { createContext, useState, useEffect } from "react";
import { getUser, initialize } from "../services/User";
// import axios from 'axios'

export const DataContext = createContext();

export const ConText = (props) => {
  const [cart, setCart] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const checkAuth = async () => {
    if (!localStorage.getItem("Ecomtoken")) return;

    await initialize();
    getUser(localStorage.getItem("Ecomtoken")).then((user) => {
      if (user) setIsAuth(true);
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);
  setInterval(checkAuth, 1000);

  return (
    <>
      <DataContext.Provider value={{ cart, setCart, isAuth }}>
        {props.children}
      </DataContext.Provider>
    </>
  );
};
