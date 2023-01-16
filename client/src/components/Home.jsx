import React from "react";
import { useParams } from "react-router-dom";
import UserFiles from "./UserFiles";

const Home = () => {
  const { userName, path } = useParams();

  console.log("Home ", path);

  return (
    <div className="home">
      Home Component
      <UserFiles userName={userName} path={path} />
    </div>
  );
};

export default Home;
