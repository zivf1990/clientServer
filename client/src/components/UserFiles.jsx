import React, { useEffect, useState } from "react";

const UserFiles = ({ userName }) => {
  const [files, setFiles] = useState([]);

  const fetchUserData = async () => {
    const res = await fetch(`http://localhost:8000/files/${userName}`);
    const data = await res.json();
    console.log(data);
    setFiles(data);
  };

  const fetchFile = async (fileName) => {
    const res = await fetch(
      `http://localhost:8000/files/${userName}/${fileName}`
    );
    const fileData = await res.json();
    console.log(fileData);
  };

  useEffect(() => {
    console.log(userName);
    fetchUserData();
  }, []);

  return (
    <div className="file-names">
      {files.map(({ name, isAFile, size }) => {
        return (
          <div
            key={Math.random() * Number.MAX_SAFE_INTEGER}
            onClick={() => fetchFile(name)}
            className="file"
          >
            {isAFile ? (
              <>
                {/* File */}
                <img
                  src="https://cdn.windowsreport.com/wp-content/uploads/2020/10/IMG-file-1200x1200.jpg"
                  alt=""
                  width={"150px"}
                />
                <h4>{name}</h4>
                <h4>{size.toString()}</h4>
              </>
            ) : (
              <>
                {/* folder */}
                <img
                  src="https://img.freepik.com/free-vector/illustration-data-folder-icon_53876-6329.jpg?w=2000"
                  alt=""
                  width={"150px"}
                />
                <h4>{name}</h4>
                <h4>{size.toString()}</h4>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserFiles;
