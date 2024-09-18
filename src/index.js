import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import TicTacToe from "./tictactoe.js";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <TicTacToe />
  </StrictMode>
);