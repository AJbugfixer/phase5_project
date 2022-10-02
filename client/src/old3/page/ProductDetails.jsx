import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../context/DataContext";

const ProductDetails = () => {
  const { id } = useParams();

  const { cart, setCart, isAuth } = useContext(DataContext);
  const [detdata, setDetdata] = useState([]);
  const [pdetails, setPdetails] = useState("1");

  const onSub = (e) => {
    e.preventDefault();

    const data = {
      id: detdata[0].id,
      name: detdata[0].name,
      price: detdata[0].price,
      thumbnail: detdata[0].thumbnail,
      qty: pdetails,
    };

    const exist = cart.find((x) => x.id === data.id);
    if (exist) {
      setCart(cart.map((x) => (x.id === data.id ? data : x)));
    } else {
      setCart([...cart, data]);
    }
  };

  const getData = async () => {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);

    setDetdata([res.data]);
  };
  useEffect(() => {
    getData();
  }, []);
  if (!detdata.length) {
    return <h1>Loading..</h1>;
  }

  return (
    <>
      <div className="details">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12 mx-auto mb-3">
              <img
                src={detdata[0].thumbnail}
                alt={detdata[0].title}
                className="img-fluid p-im"
              />
            </div>
            <div className="col-md-6 col-12 mx-auto mb-3 d-flex  flex-column mt-5">
              <h2>{detdata[0].title}</h2>
              <h4>
                Price : <strong>${detdata[0].price}.00</strong>
              </h4>
              <p>{detdata[0].description}</p>
              {isAuth && (
                <form onSubmit={onSub}>
                  <input type="hidden" value={detdata[0].id} />
                  <div className="form-group w-50">
                    <label htmlFor="sel1">Choose Qty:</label>
                    <select
                      className="form-control"
                      id=""
                      onChange={(e) => setPdetails(e.target.value)}
                      required
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="text-left">
                    <button type="submit" className="btn btn-info">
                      Add To Cart
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
