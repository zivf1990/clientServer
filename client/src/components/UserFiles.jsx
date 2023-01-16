import React, { useEffect, useState } from "react";
import Item from "./Item";

const UserFiles = ({ userName }) => {
  const [files, setFiles] = useState([]);
  const [showFileForm, setShowFileForm] = useState(false);
  const [showFolderForm, setShowFolderForm] = useState(false);

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

  const createItem = (name, isAFile) => {};

  const copyItem = (name, isAFile) => {};

  const removeItem = async (itemName, isAFile) => {
    const res = await fetch(
      `http://localhost:8000/files/${userName}/${itemName}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAFile }),
      }
    );

    const data = await res.json();
    if (data) {
      setFiles((prev) => prev.filter((item) => item.itemName !== itemName));
    }
    console.log("deleted item: ", data);
  };

  const moveItem = (name, isAFile) => {};

  useEffect(() => {
    console.log(userName);
    fetchUserData();
  }, []);

  return (
    <>
      <div className="create-items-menu">
        <button
          className="create-file"
          onClick={() => setShowFileForm(showFileForm ? false : true)}
        >
          Create File
        </button>
        {showFileForm ? (
          <div className="form">
            <input type="text" placeholder="enter name" />
            <button onClick={() => createItem("file")}>ok</button>
          </div>
        ) : (
          ""
        )}
        <button
          className="create-folder"
          onClick={() => setShowFolderForm(showFolderForm ? false : true)}
        >
          Create Folder
        </button>
        {showFolderForm ? (
          <div className="form">
            <input type="text" placeholder="enter name" />
            <button onClick={() => createItem("folder")}>ok</button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="file-names">
        {files.map(({ itemName, isAFile, size }) => {
          return (
            <Item
              key={Math.random() * Number.MAX_SAFE_INTEGER}
              itemName={itemName}
              isAFile={isAFile}
              fetchFile={fetchFile}
              size={size}
              copyItem={copyItem}
              removeItem={removeItem}
            />
          );
        })}
      </div>
    </>
  );
};

export default UserFiles;
