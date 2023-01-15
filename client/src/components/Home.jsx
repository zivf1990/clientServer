import React from "react";
import { useParams } from "react-router-dom";
import UserFiles from "./UserFiles";

const Home = () => {
  const { userName } = useParams();

  console.log(userName);

  return (
    <div className="home">
      Home Component
      <UserFiles userName={userName} />
    </div>
  );
};

export default Home;
