import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "flowbite/dist/flowbite.min.js";
import App from "./App.jsx";
import CounterContextProvider from "./Context/counterContext.jsx";
import TokenContextProvider from "./Context/tokenContext.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import WishListContextProvider from "./Context/WishListContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TokenContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
          <CounterContextProvider>
            <App />
          </CounterContextProvider>
        </WishListContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
  </StrictMode>
);
