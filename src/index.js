import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

import LoadLine from "./components/loadLine";
import Nav from "./components/nav";

import App from "./App";
import Poke from "./views/poke";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<Poke />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
