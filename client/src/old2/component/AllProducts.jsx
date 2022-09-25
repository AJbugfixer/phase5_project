import React, { useEffect, useState } from "react";
import CardProducts from "./CardProducts";
import axios from "axios";
const AllProducts = () => {
  const [getdata, setGetdata] = useState([]);
  const getData = async () => {
    const res = await axios.get(`https://dummyjson.com/products?limit=3`);
    if (res.status == 200) {
      setGetdata(res.data.products);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="products">
        <div className="container">
          <h2 className="text-center font-weight-bold mb-5">Best Products</h2>
          <div className="row">
            {getdata.map((val, ind) => {
              return (
                <CardProducts
                  key={ind}
                  id={val.id}
                  name={val.name}
                  price={val.price}
                  thumbnail={val.thumbnail}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
