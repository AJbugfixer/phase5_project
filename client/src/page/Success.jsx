import React, { useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
// import axios from "axios";
import { getUser, initialize } from "../services/User";
import { DataContext } from "../context/DataContext";
const Success = () => {
  // const loc = useLocation();
  // const pid = localStorage.getItem("Ecomlongid");
  // useEffect(() => {
  //   const paydet = async () => {
  //     // console.log(loc.search)
  //     const str = loc.search;
  //     const myArr = str.split("=");
  //     const pyid = myArr[myArr.length - 1];
  //     //   console.log(pyid)
  //     const data = {
  //       pid: pid,
  //       pyid: pyid,
  //     };
  //     const res = await axios.post(`http://localhost:8000/paydetails`, data);
  //     //    console.log(his)
  //     console.log(res);
  //   };
  //   paydet();
  // }, []);

  const timeout = useRef(null);
  const his = useHistory();

  const { setCart } = useContext(DataContext);

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
    setCart([]);
    timeout.current = setTimeout(checkAuth, 1000);
    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return (
    <>
      <div className="container p-5">
        <div className="row">
          <div className="container text-center">
            <h2>Thank You for Buy This</h2>
            <button
              className="btn btn-info"
              onClick={() => his.push("/products")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
