import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TicTacToe from "./tictactoe.js";
import ProductTable from "./product.js";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <TicTacToe />
    <br/>
    <ProductTable />
  </StrictMode>
);