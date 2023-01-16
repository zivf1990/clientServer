import React, { useEffect, useState } from "react";

const File = ({ path }) => {
  const [fileData, setFileData] = useState("");

  useEffect(() => {
    // fetchFile();
  });

  return <div>{fileData}</div>;
};

export default File;
