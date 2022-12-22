import React, { useContext, useState } from "react";
import "./CSS/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";

export default function Login({ props, currentUser, setCurrentUser }) {
  const { state, dispatch } = useContext(UserContext);


  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [slug, setSlug] = useState("");

  const celebLogin = async (e) => {
    e.preventDefault();
    await axios
      .get(`http://localhost:5000/api/celebs/indi/${slug}`, {
        slug: slug,
        email: email,
        password: password,
      })
      .then((res) => {

        if (res.data.celebrities.email === email && res.data.celebrities.password === password) {
          dispatch({ type: "USER", payload: true });
          localStorage.setItem("userInfo", JSON.stringify(res.data.token));
          localStorage.setItem("username", JSON.stringify(slug));
          localStorage.setItem("email", JSON.stringify(email));
          localStorage.setItem("password", JSON.stringify(password));
          setCurrentUser(slug)
          console.log(res.data.celebrities.email)
          console.log("my entered " + email)
          console.log(res.data.celebrities.slug)
          console.log("my entered " + slug)
          console.log(res.data.celebrities.password)
          console.log("my entered " + password)
          // console.log("objct se nikala hai "+res.data.celebrities.slug);
          // console.log("login mein likha hai " +slug)
          navigate(`/profile/${slug}`);
        }
        else {
          toast.error("Invalid Login", {
            position: "top-center",
          });
        }

      })
      .catch((err) => {
        toast.error("Invalid Login", {
          position: "top-center",
        });
      });
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={celebLogin}>
        <h3 className="Auth-form-title">Welcome back, Celebrity!</h3>
        <div className="text-center">
          Not yet registered?{" "}
          <span className="link-primary" style={{ color: "" }}>
            {/* onClick={changeAuthMode}> */}
            <Link to={"/celeb-signup"}>Sign up</Link>
          </span>
        </div>
        <div className="Auth-form-content">
          {/* <h3 className="Auth-form-title">Sign In</h3> */}
          <div className="form-group mt-3">

            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter your username"
              name="username"
              required
              onChange={(event) => {
                setSlug(event.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              name="email"
              required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">

            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
              required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            <Link to="/forgot-passwordCeleb">Forgot password? </Link>
          </p>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}