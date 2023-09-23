import React, { useState, useContext } from "react";
import AuthForm from "../AuthForm/AuthForm.jsx";
import { UserContext } from "../../../context/UserProvider.jsx";
import "../Auth.css";

const initInputs = { username: "", password: "" };

const Auth = () => {
  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext);

  const [inputs, setInputs] = useState(initInputs);
  const [toggle, setToggle] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSignup(e) {
    e.preventDefault();
    signup(inputs);
  }

  function handleLogin(e) {
    e.preventDefault();
    login(inputs);
  }

  function toggleForm() {
    setToggle((prev) => !prev);
    resetAuthErr();
  }

  return (
    <div className="auth-container">
      <h1>ESCAPE!</h1>
      {!toggle ? (
        <>
          <AuthForm
            handleChange={handleChange}
            handleSubmit={handleLogin}
            toggle={toggle}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}
          />
          <h2>Not A Member?</h2>
          <button className="toggleButton" onClick={toggleForm}>
            Signup Here
          </button>
        </>
      ) : (
        <>
          <AuthForm
            handleChange={handleChange}
            handleSubmit={handleSignup}
            toggle={toggle}
            inputs={inputs}
            btnText="Sign up"
            errMsg={errMsg}
          />
          <h2>Already A Member?</h2>
          <button className="toggleButton" onClick={toggleForm}>
            Login Here
          </button>
        </>
      )}
    </div>
  );
};

export default Auth;
