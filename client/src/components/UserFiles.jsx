import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useItemPath } from "../context/ItemPathContext";
import { useHistory } from "react-router-dom";
import Item from "./Item";

const UserFiles = ({ userName }) => {
  const [files, setFiles] = useState([]);
  const [showFileForm, setShowFileForm] = useState(false);
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [showItems, setShowItems] = useState(true);
  const [itemInput, setItemInput] = useState({ fileName: "", folderName: "" });
  const [fileData, setFileData] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { itemPath, setItemPath } = useItemPath();

  // useEffect(() => {
  //   console.log("location ", location.pathname);
  // }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === `/home/${userName}`) {
      setShowItems(true);
    }
    const itemPath = location.pathname;
    // console.log("itemPath", itemPath.replace("/home/", "./files/"));
    setItemPath(itemPath);
    fetchUserData(itemPath.replace("/home/", "./files/"));
  }, [location.pathname]);

  const fetchUserData = async (path) => {
    //.split(' ').join('%')

    const res = await fetch(
      `http://localhost:8000/files/${userName}/readfolder`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ path: path }),
      }
    );
    const data = await res.json();
    console.log(data);
    setFiles(data);

    // const res = await fetch(
    //   `http://localhost:8000/files/${userName}${
    //     folderPath ? `/files/${folderPath}` : ""
    //   }`
    // );
    // const data = await res.json();
    // console.log(data);
    // setFiles(data);
  };

  //Fetch a file.
  const fetchFile = async (itemPath) => {
    console.log("fetchFile", itemPath);
    const res = await fetch(
      `http://localhost:8000/files/${userName}/readfile`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ path: itemPath }),
      }
    );

    const data = await res.json();
    setFileData(data);
  };

  //show the folder/file
  const openItem = async (itemPath, isAFile) => {
    if (isAFile) {
      fetchFile(itemPath);
      setShowItems(false);
      const arr = itemPath.split("/");
      const hash = arr[arr.length - 1];
      navigate(hash);
    } else {
      const arr = itemPath.split("/");
      const hash = arr[arr.length - 1];

      // const history = window.location.href;
      console.log("open", hash);
      navigate(hash);
      // setItemPath(itemPath);
    }
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

  return (
    <>
      {showItems && (
        <div className="user-files">
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
                <button
                  onClick={() => createItem(itemInput.folderName, "folder")}
                >
                  ok
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="file-names">
            {files.map(({ itemName, isAFile, stats, path }) => {
              return (
                <Item
                  key={Math.random() * Number.MAX_SAFE_INTEGER}
                  itemName={itemName}
                  isAFile={isAFile}
                  openItem={openItem}
                  copyItem={copyItem}
                  removeItem={removeItem}
                  moveItem={moveItem}
                  renameItem={renameItem}
                  itemInfo={stats}
                  path={path}
                />
              );
            })}
          </div>
        </div>
      )}

      <div className="file-data">{fileData}</div>
    </>
  );
};

export default UserFiles;
