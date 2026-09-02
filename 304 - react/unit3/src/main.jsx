import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
// import store from "./Q1-Counter/store";
// import store from "./Q2-FoodList/store";
// import store from "./Q3-FoodAsync/store";
// import store from "./Q4-NewsPromise/store";
// import store from "./Q5-Logger/store";
// import store from "./Q6-ProductSaga/store";
// import store from "./Q7-ProductSearchSaga/store";
import store from "./Q8-ShoppingCart/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);