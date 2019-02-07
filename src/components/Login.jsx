import React from "react";

const Login = props => {
  return (
    <div  className="LoginDiv">
      <h1 className="Login">Login</h1>
      <form onSubmit={props.handleSubmit}>
        {props.renderInput("email", "Email")}
        {props.renderInput("password", "Password", "password")}
        
        <button className="btn btn-primary"> Login </button>
      </form>
    </div>
  );
};




export default Login;
