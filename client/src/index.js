import React from "react";
import ReactDOM from "react-dom/client";
// import ReactDom from "react-dom";

import App from "./App";
import { ConText } from "./context/DataContext";

// ReactDom.render(<ConText><App /></ConText>, document.getElementById('root'));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConText>
    <App />
  </ConText>
);
