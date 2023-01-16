import React, { useEffect, useState } from "react";
import Item from "./Item";

const UserFiles = ({ userName }) => {
  const [files, setFiles] = useState([]);
  const [showFileForm, setShowFileForm] = useState(false);
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [itemInput, setItemInput] = useState({ fileName: "", folderName: "" });

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

  const createItem = async (name, isAFile) => {
    console.log("createItem() ", name, isAFile);

    const { fileName, folderName } = itemInput;

    if (isAFile === "file") {
      setShowFileForm(false);
      const res = await fetch(`http://localhost:8000/files/newfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName: fileName }),
      });
      console.log(res);
    }
    //Create a folder
    else {
      setShowFolderForm(false);
      const res = await fetch(`http://localhost:8000/files/newfolder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName: folderName }),
      });
      console.log(res);
    }
  };

  const copyItem = (name, isAFile) => {};

  const renameItem = (name, isAFile) => {};

  const getInfo = (name) => {
    
  };

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

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setItemInput((prevUser) => ({ ...prevUser, [name]: value }));
  };

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
            <input
              name="fileName"
              value={itemInput.fileName}
              onChange={handleChange}
              type="text"
              placeholder="enter name"
            />
            <button onClick={() => createItem(itemInput.fileName, "file")}>
              ok
            </button>
          </div>
        ) : (
          ""
        )}
        <span
          className="create-folder bx bxs-folder-plus"
          onClick={() => setShowFolderForm(showFolderForm ? false : true)}
        >
          Create Folder
        </span>

        {showFolderForm ? (
          <div className="form">
            <input
              name="folderName"
              value={itemInput.folderName}
              onChange={handleChange}
              type="text"
              placeholder="enter name"
            />
            <button onClick={() => createItem(itemInput.folderName, "folder")}>
              ok
            </button>
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
              moveItem={moveItem}
              renameItem={renameItem}
              getInfo={getInfo}
            />
          );
        })}
      </div>
    </>
  );
};

export default UserFiles;
