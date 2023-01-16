import React from "react";
import { Route, Routes } from "react-router-dom";
import File from "./File";
import Home from "./Home";
import Login from "./Login";

const Navigation = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home">
          <Route path=":userName/:path" element={<Home />} />
          <Route path=":userName" element={<Home />} />
          <Route path=":userName/*" element={<Home />} />
        </Route>

        <Route path={`users/:id/`}></Route>
      </Routes>
    </div>
  );
};

export default Navigation;
