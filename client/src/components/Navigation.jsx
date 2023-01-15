import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

const Navigation = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/:userName" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path={`users/:id/`}>
          {/* <Route path="Albums" element={<Albums />} />
          <Route path="Albums/:albumId" element={<AlbumPage />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default Navigation;
