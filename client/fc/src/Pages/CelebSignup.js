import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup(props) {

  let regexEmail = (/^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,}$/);

  const [user, setUser] = useState({
    slug: "",
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { slug, email, password } = user;

    let res = await fetch("http://localhost:5000/api/celebs/celeb-signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        slug,
        email,
        password,
      }),
    });
    await res.json() // to avoid loading on the screen

    if (!slug || !email || !password) {
      toast.error("Please fill out the form. Invalid Details", {
        position: "top-center",
      });
    }
    else if (!email.match(regexEmail)) {
      toast.error("Invalid Email. Please Try again", {
        position: "top-center",
      });
    }
    else {
      toast.success("Successful Signup.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="Auth-form-container">
      <form method="POST" className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Hello, Celebrity!</h3>
          <p className="Auth-form-title">Sign Up to connect with your fans</p>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" style={{ color: "" }}>
              {/* onClick={changeAuthMode}> */}
              <Link to={"/celeb-login"}>Login</Link>
            </span>
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              name="name"
              required
              value={user.name}
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="Full Name"
            />

          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              name="slug"
              required
              value={user.slug}
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="Username"
            />

          </div>
          <div className="form-group mt-3">
            <input
              type="email"
              name="email"
              required
              value={user.email}
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="Email Address"
            />

          </div>
          <div className="form-group mt-3">
            <input
              type="password"
              name="password"
              required
              value={user.password}
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={PostData}
              style={{ width: "220px", marginLeft: "55px", marginTop: "10px", marginBottom: "10px" }}
            >
              Create Account
            </button>
          </div>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}