import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Main = () => {
    let [userData,setUserData] = useState([])
    // useEffect(()=>{
    //     fetchdata()
    // })
    async function fetchdata() {
        let res = await fetch('http://localhost:8000/users/ziv');
        let data = await res.json();
        setUserData(data)
        console.log(data);
    }
    async function fetchdata() {
        let res = await fetch(`http://localhost:8000/users/ziv/${}`);
        let data = await res.json();
        setUserData(data)
        console.log(data);
    }
    return <div className="main" onClick={fetchdata}>main
        {userData.forEach(file => {
            <div onClick={}>{file}</div>
        })}
    </div>;
};

export default Main;
