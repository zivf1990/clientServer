import React, { useState, createContext, useContext, useEffect } from "react";

const ItemPathContext = createContext();

export const useItemPath = () => useContext(ItemPathContext);

export default function ItemPathProvider({ children }) {
  const [itemPath, setItemPath] = useState(null);

  useEffect(() => {
    if (!itemPath) {
      localStorage.clear();
    }
  }, [itemPath]);

  return (
    <ItemPathContext.Provider value={{ itemPath, setItemPath }}>
      {children}
    </ItemPathContext.Provider>
  );
}
