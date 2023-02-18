import React, { useContext, useState } from "react";
import "./CSS/Login.css";
import styles from "./CSS/fanLogin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/index";

export default function Login() {
  const [data, setData] = useState({ slug: "", password: "" });
  const [error, setError] = useState("");
  const [slug, setSlug] = useState("");
  const dispatch = useDispatch();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/celeb-auth";
      // const url = `http://localhost:5000/api/users/indi/${slug}`;
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      localStorage.setItem("username", JSON.stringify(data.slug));
      dispatch(
        setLogin({
          slug: data.slug,
          loggedIn: "celeb",
        })
      );
      console.log(res.data + "res.data hai ye");
      window.location = `/profile/${data.slug}`;
      // window.localStorage.setItem("isLoggedIn", true);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <h3 className="Auth-form-title">Welcome back, Celebrity!</h3>
        <div className="text-center">
          Not yet registered?{" "}
          <span className="link-primary" style={{ color: "" }}>
            {/* onClick={changeAuthMode}> */}
            <Link to={"/celeb-signup-copy"}>Sign up</Link>
          </span>
        </div>
        <div className="Auth-form-content">
          {/* <h3 className="Auth-form-title">Sign In</h3> */}
          {/* <div className="form-group mt-3">
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
          </div> */}
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="slug"
              placeholder="slug"
              name="slug"
              onChange={handleChange}
              value={data.slug}
              required
              className="form-control mt-1"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="form-control mt-1"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            <Link to="/celeb-forgot-password">Forgot password? </Link>
          </p>
        </div>
        {/* <ToastContainer /> */}
      </form>
    </div>
  );
}
