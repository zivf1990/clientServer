import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    username: "ziv",
    password: "1234",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInput((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getUser((data) => {
      if (data) {
        console.log("access granted");
        navigate(`/home/${userInput.username}`);
      } else {
        console.log("access denied");
      }
    });
    console.log(userInput.username);
  };

  const getUser = async (cb) => {
    const res = await fetch(`http://localhost:8000/users/validation`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    const data = await res.json();

    console.log(data);
    cb(data);
  };

  const validateUser = async (user) => {
    //delete path from history
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = window.history.go(1);

    // navigate(`/home/${userInput.username}`);
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 signin-image">
              <div className="text"></div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <header>Log In</header>
                <div className="input-field">
                  <input
                    type="text"
                    name="username"
                    className="input"
                    id="username"
                    onChange={handleChange}
                    value={userInput.username}
                    required
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    name="password"
                    className="input"
                    id="password"
                    onChange={handleChange}
                    value={userInput.password}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="input-field">
                  <input type="submit" className="submit" value="Login" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
