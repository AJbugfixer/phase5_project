import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUser, initialize } from "../services/User";
import { DataContext } from "../context/DataContext";

import PhoneInput from "react-phone-number-input";

const EditAdd = () => {
  const datemail = localStorage.getItem("EcomEmail");

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState(datemail || "");
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const { id } = useParams();
  const { savedAddresses, setSavedAddresses } = useContext(DataContext);

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

  const getaddress = async () => {
    const savedAddress = savedAddresses.find(({ email }) => email == id);

    const { address, city, fname, lname, phone, state, zip } = savedAddress;

    setFname(fname);
    setLname(lname);
    setCity(city);
    setAddr(address);
    setPhone(phone);
    setState(state);
    setZip(zip);
  };
  useEffect(() => {
    getaddress();
  }, []);

  const onSub = async (e) => {
    e.preventDefault();

    setSavedAddresses((prev) =>
      prev.map((tAaddress) => {
        if (tAaddress.email == email)
          return {
            address: addr,
            city,
            fname,
            lname,
            phone,
            state,
            zip,
            email: email,
            userId: id,
          };
        else return tAaddress;
      })
    );

    his.push("/payment");
  };

  return (
    <>
      <div className="address">
        <div className="container ">
          <div className="row">
            <div className="col-md-6 col-12 mx-auto">
              <div className="card">
                <form onSubmit={onSub}>
                  <div className="form-group">
                    <label>First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fname"
                      placeholder="Enter first name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lname"
                      placeholder="Last name"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      readOnly
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <PhoneInput
                      className="form-control"
                      placeholder="Enter Phone"
                      value={phone}
                      onChange={setPhone}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Address:</label>

                    <textarea
                      name="address"
                      id=""
                      className="form-control"
                      rows="3"
                      placeholder="Add Apt #, Suite, Floor (optional)"
                      value={addr}
                      onChange={(e) => setAddr(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div className="flex">
                    <div className="form-group">
                      <label>City:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>State:</label>
                      <input
                        type="test"
                        className="form-control"
                        name="state"
                        placeholder="Enter State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Zip:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="zip"
                        placeholder="Enter Zip"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="text-center mb-5">
                    <input
                      type="submit"
                      className="btn btn-info pt-2 pb-2 pl-5 pr-5"
                      value="Edit Address"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAdd;
