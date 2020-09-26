import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import { List, InfiniteLoader } from 'react-virtualized'


import GoogleLogin from "react-google-login";
// import { useGoogleLogin } from 'react-google-login'

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const {
    login,
    error,
    clearErrors,
    isAuthenticated,
    googleRegister,
  } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({
        email,
        password,
      });
      googleRegister();
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
  };
  const googleSuccess = (response) => {
    const googleEmail = response.profileObj.email;
    const token = response.accessToken;
    responseGoogle(response);
    login({
      googleEmail,
      token,
    });
  };

  return (
    <>
      <div className="form-container">
        <h1>
          Account <span className="text-primary">Login</span>
        </h1>
        <GoogleLogin
          clientId="77437234863-qridb0qil70aj57g5sjfc5qb9sjre1nd.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={googleSuccess}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-primary btn-block"
          />
        </form>


      </div>

    </>
  );
};

export default Login;
