import React, { useState } from "react";

const Item = ({
  itemName,
  isAFile,
  openItem,
  copyItem,
  removeItem,
  moveItem,
  renameItem,
  itemInfo,
  path,
}) => {
  const [displayOptions, setDisplayOptions] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(false);

  return (
    <div
      key={Math.random() * Number.MAX_SAFE_INTEGER}
      onClick={() => openItem(path)}
      onContextMenu={(e) => {
        e.preventDefault();
        if (e.buttons == 2) {
          setDisplayOptions(displayOptions ? false : true);
        }
      }}
      className="file"
    >
      {isAFile ? (
        <>
          {/* File */}
          <img
            src="https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png"
            alt=""
            width={"150px"}
          />
        </>
      ) : (
        <>
          {/* folder */}
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAolBMVEU0mNv///8pgLm9w8f2+vyRu9kae7aduMxFndhwn7/Cxcgyl9sticVDi74lfrg0mdwvjs2Ap8Hb6vPy9/vT5PCewt280+XW5fB9rtJLlMQ1hbxrp89mocsRebbq8vhJi7tXkbxkmb6ftcSvvMWhtcOeuMxhpNVTodcbkdiLwug6ndvO5fVqsuNYnMh+stSKtdWuy+Gz1++Hv+eZx+paqODC2elUpLirAAAERUlEQVR4nO3dcVPaPADH8SSUKNCkUFoQSjuGY6gbA3W8/7f2pEWkhaLb0TZLnt/nRAUPL99Lmhb8Q0JtR3QPoHYoNB8KzYdC831Q6FSguZCLLhQmfjAK29cbN1tTprTQH91NZMyvF4tt0nTRqZJCP1wzLiWrgmR3QfNRBeeFozWrKC9LlJNQ79F4VtieVtiXNbKZr6Ps4LQw4pXmZYlShlra9k4Ko7jywLQxXuubxmJhu/oZ3ONiO/wXCkfTmgJ1bqr5Qn9d7R5TTOSTUMs05gtDVmNhOo2RjmnMFdY6hVkiFxo21VzhqN6+rFE2f248FiZ3dW2keZw1vakeC/1JzYv0TRw1+4LjWBhUfLV2EZ82+oLjWDiq5XKmjJRNnhvfC52wicPwkNjgufFYWNsVW2njtLGjUVOhMhUVmkTt3T9XKNOXVYdb+unwtfBA4cGLP5SS8zguv2TSV1g9zqPg/P0EmwrTE1F4diKyqzA9EZ1eFlpWqK7uT99OsK1QrdR1Ynkhk9EfFWb7sDnyw5Us/LRQyqn4Mv/aMcfX+Rfx/kavnAQfF0op5oNFq2uW1mIwF2+NcuN8VChF56bVbZmn27rpCHk2iaeFks0XRval1ETOs3fT5PaDOezc6x7nVe47aQS/Sy4V8oHuIV5twNMjbXyhkA9MXaBH3TSRB+WFsmN+oErsSBZvSwvlXPfgKjKX8fHPsrnCWHzrtu4Xy+WNuZbLxX2r+03wdlkh7yw30ffVrdlW36PNslNe6K5WT70MKX6c3i95SN0Kj57e//sn/sGvK/v1KW+1cksK/d/pU+ygSn77p4XPnu5hVcx7LhY+Ptgyfwe9h5dcofNiW1+q9+IcCp1Xz8pC79V5K3x+sjFQJT497wvVLqp7LDXJdlSi1qitgSpRrVNCfSsPwr2e56vCxwfd46jRwyMlQ0u3mb3e05D8sHkK1ST+IK+WF76SnzYvUrVMf5JbywtvdY8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgU3b/Yzn7+1J92/4hd5HX/x8UupYXuoTpHkPNGGFWL1Ovrwpd3aOolasKbZ5ENYWMTJnbs/Ws2Ou5bEoEs3iduowJspZqneoeSU3UGpVr8oszWxNVIOO/yChmzMrdJt1lGItHJMkKmevZ1eh5btYVJ8SJePatZSu1v4/ikUPo7q2Quf10f9U9tKulCX33rYnvKKHJ7JCoGvvGv2Lskf57H+OzRBXS0ZTluKbLx0xHNC0cbiSzk9wMs0Lqz+xM5DOf7gtpMLExUYqAHgrpWEjbGqUUY3ospMnaskQp1wnNF1JnY9M0qgncOLRYSOluIzj//MkG4Fxsdu9dx0LqBGEkeBxzk6nhiygMHFpWmB6O4902bJss3O7GSaGpWJhNpdnOes4LbYNC86HQfCg0n/2F/wFwwr1OUMAp9wAAAABJRU5ErkJggg=="
            alt=""
            width={"150px"}
          />
        </>
      )}
      <h4>{itemName}</h4>
      {displayOptions && (
        <div className="options">
          <span
            onClick={() => setDisplayInfo(displayInfo ? false : true)}
            className="bx bx-info-circle"
          >
            info
          </span>
          <span
            onClick={() => copyItem(itemName, isAFile)}
            className="bx bx-copy"
          >
            copy
          </span>
          <span
            onClick={() => removeItem(itemName, isAFile)}
            className="bx bxs-x-square"
          >
            delete
          </span>
          <span
            onClick={() => renameItem(itemName, isAFile)}
            className="bx bxs-edit-alt"
          >
            rename
          </span>
          <span
            onClick={() => moveItem(itemName, isAFile)}
            className="bx bxs-right-arrow-square"
          >
            move
          </span>

          {displayInfo && (
            <div className="item-info">
              <h6> Size: {itemInfo.size}kb</h6>
              <h6>Created: {itemInfo.birthtime}</h6>
              <h6>Changed: {itemInfo.ctime}</h6>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Item;
