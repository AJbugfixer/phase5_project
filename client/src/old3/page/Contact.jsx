import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { getUser, initialize } from "../services/User";

const Contact = () => {
  const timeout = useRef(null);
  const his = useHistory();
  const checkAuth = async () => {
    if (!localStorage.getItem("Ecomtoken")) return his.push("/");

    await initialize();
    getUser(localStorage.getItem("Ecomtoken"))
      .then((user) => {
        if (!user) {
          his.push("/");
        }
      })
      .catch((err) => his.push("/"));
  };

  useEffect(() => {
    timeout.current = setTimeout(checkAuth, 1000);
    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return <>hii</>;
};

export default Contact;
