import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/auth.service";

const Login = () => {
  const navigate = useNavigate();
  
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    AuthService
    .login(email, password)
    .then(response=>{
        // console.log('response :>> ', response);
        if(response.data.token){
            localStorage.setItem("user", JSON.stringify(response.data))
        }
        navigate("/profile")
    }).catch(err=>{
        console.log(err.response);
        setMessage(err.response.data)
    })
  }

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <button className="btn btn-primary btn-block" onClick={handleLogin}>
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
