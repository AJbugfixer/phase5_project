import React from "react";
import "../App.css";
import AllProducts from "../component/AllProducts";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12 mb-3 mx-auto">
              <h1>
                Welcome to <span>Dev e-commerce hub</span>
              </h1>
              <p>
                Dev e-commerce hub is a vast Internet-based enterprise that
                sells electronics, groceries, furniture, dresses and many other
                goods, either directly or as the middleman between other
                retailers and Dev e-commerce hub's millions of customers.
              </p>
              <button className="btn btn-outline-success">Read More</button>
            </div>
            <div className="col-md-6 col-12 mb-3 mx-auto">
              <img
                src="../img/one.svg"
                alt="home "
                className="img-fluid main-img"
              />
            </div>
          </div>
        </div>
      </div>
      <AllProducts />
      <div className="desc">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-12 mx-auto mb-3 ">
              <img
                src="../img/envv.svg"
                alt="ok"
                className="img-fluid side-img"
              />
            </div>
            <div className=" col-md-6 col-12 mx-auto mb-3 d-flex justify-content-center align-items-center flex-column">
              <h1>
                Welcome to <span>Dev e-commerce hub</span>
              </h1>
              <p>
                Amazon.com is a vast Internet-based enterprise that sells books,
                music, movies, housewares, electronics, toys, and many other
                goods, either directly or as the middleman between other
                retailers and Amazon.com's millions of customers
              </p>
              <button className="btn btn-outline-success">Read More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
