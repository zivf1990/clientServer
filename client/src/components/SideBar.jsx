import React from "react";

const SideBar = () => {
  return (
    <div className="side-bar">
      <div className="row">
        <svg
          className=" c-qd"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="#000000"
          focusable="false"
        >
          <path d="M19 2H5C3.9 2 3 2.9 3 4V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V4C21 2.9 20.1 2 19 2ZM19 20H5V19H19V20ZM19 17H5V4H19V17Z"></path>
          <path d="M13.1215 6H10.8785C10.5514 6 10.271 6.18692 10.0841 6.46729L7.14019 11.6075C7 11.8878 7 12.215 7.14019 12.4953L8.26168 14.4579C8.40187 14.7383 8.72897 14.9252 9.05608 14.9252H15.0374C15.3645 14.9252 15.6449 14.7383 15.8318 14.4579L16.9533 12.4953C17.0935 12.215 17.0935 11.8878 16.9533 11.6075L13.9159 6.46729C13.7757 6.18692 13.4486 6 13.1215 6ZM10.1776 12.0748L12.0467 8.8972L13.8692 12.0748H10.1776Z"></path>
        </svg>
        <h6>האחסון שלי</h6>
      </div>
      <div className="row">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="#000000"
          focusable="false"
          className="c-qd"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
          <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
        </svg>
        <h6>פח אשפה</h6>
      </div>
    </div>
  );
};

export default SideBar;
