import React, { useEffect, useState } from "react";

const UserFiles = () => {
  const [fileNames, setFileNames] = useState([]);

  const fetchUserData = async () => {
    const res = await fetch("http://localhost:8000/users/ziv");
    const data = await res.json();
    console.log(data);
    setFileNames(data);
  };

  const fetchFile = async (fileName) => {
    const res = await fetch(`http://localhost:8000/users/ziv/${fileName}`);
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="file-names">
      {fileNames.map((fileName) => {
        return (
          <div onClick={() => fetchFile(fileName)} className="file">
            <img
              src="https://cdn.windowsreport.com/wp-content/uploads/2020/10/IMG-file-1200x1200.jpg"
              alt=""
              width={"150px"}
            />
            <h4>{fileName}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default UserFiles;
