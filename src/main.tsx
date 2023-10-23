import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import NewRecord from "./pages/NewRecord";
import Records from "./pages/Records";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="records" element={<Records />} />
          <Route path="records/new" element={<NewRecord />} />
          <Route
            path="*"
            element={
              <div className="text-9xl text-center">Page not found!</div>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
