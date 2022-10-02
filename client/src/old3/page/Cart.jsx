import React, { useContext, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CartP from "../component/CartP";
import { DataContext } from "../context/DataContext";
// import axios from "axios";
import { getUser, initialize } from "../services/User";
const Cart = () => {
  const { cart } = useContext(DataContext);

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

  return (
    <>
      <div className="cart">
        {!cart.length ? (
          <>
            <div className="container">
              <h2>There is No Items In the Cart</h2>
              <button
                className="btn btn-info"
                onClick={() => his.push("/products")}
              >
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="container">
              <h2>Your Cart Items</h2>
              <br />
              <div className="row">
                {cart.map((val, ind) => {
                  return (
                    <CartP
                      key={ind}
                      id={val.id}
                      name={val.title}
                      price={val.price}
                      thumbnail={val.thumbnail}
                      qty={val.qty}
                    />
                  );
                })}
              </div>
              <div className="row m-5">
                <div className="col-12">
                  <div className="text-right">
                    <button
                      className="btn btn-info"
                      onClick={() => his.push("/payment")}
                    >
                      Check Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
