// import React, { useContext, useState } from "react"; kahan gaye???
// import "./CSS/Login.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { UserContext } from "../App";

// export default function Login({ props, currentUser, setCurrentUser }) {
//   const { state, dispatch } = useContext(UserContext);


//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [slug, setSlug] = useState("");

//   const celebLogin = async (e) => {
//     e.preventDefault();
//     await axios
//       .get(`http://localhost:5000/api/fans/indiFans/${slug}`, {
//         slug: slug,
//         email: email,
//         password: password,
//       })

//       .then((res) => {

//         if (res.data.fans.email === email) {
//           // if(res.data.fans.email==email && res.data.fans.password==password){
//           dispatch({ type: "USER", payload: true });
//           localStorage.setItem("userInfo", JSON.stringify(res.data.token));
//           localStorage.setItem("username", JSON.stringify(slug));
//           localStorage.setItem("email", JSON.stringify(email));
//           localStorage.setItem("password", JSON.stringify(password));
//           setCurrentUser(slug)
//           console.log(res.data.fans.email)
//           console.log("my entered " + email)
//           console.log(res.data.fans.slug)
//           console.log("my entered " + slug)
//           console.log(res.data.fans.password)
//           console.log("my entered " + password)
//           // console.log("objct se nikala hai "+res.data.fans.slug);
//           // console.log("login mein likha hai " +slug)
//           navigate(`/FanProfile/${slug}`);
//         }
//         else {
//           toast.error("Invalid Login hy", {
//             position: "top-center",
//           });
//         }

//       })
//       .catch((err) => {
//         toast.error("Invalid Login", {
//           position: "top-center",
//         });
//       });
//   };

//   return (
//     <div className="Auth-form-container">
//       <form className="Auth-form" onSubmit={celebLogin}>
//         <h3 className="Auth-form-title">Welcome back, Fan!</h3>
//         <div className="text-center">
//           Not yet registered?{" "}
//           <span className="link-primary" style={{ color: "" }}>
//             {/* onClick={changeAuthMode}> */}
//             <Link to={"/celeb-signup"}>Sign up</Link>
//           </span>
//         </div>
//         <div className="Auth-form-content">
//           {/* <h3 className="Auth-form-title">Sign In</h3> */}
//           <div className="form-group mt-3">
//             <input
//               type="text"
//               className="form-control mt-1"
//               placeholder="Enter your username"
//               name="username"
//               required
//               onChange={(event) => {
//                 setSlug(event.target.value);
//               }}
//             />
//           </div>
//           <div className="form-group mt-3">
//             <input
//               type="email"
//               className="form-control mt-1"
//               placeholder="Enter email"
//               name="email"
//               required
//               onChange={(event) => {
//                 setEmail(event.target.value);
//               }}
//             />
//           </div>
//           <div className="form-group mt-3">
//             <input
//               type="password"
//               className="form-control mt-1"
//               placeholder="Enter password"
//               name="password"
//               required
//               onChange={(event) => {
//                 setPassword(event.target.value);
//               }}
//             />
//           </div>
//           <div className="d-grid gap-2 mt-3">
//             <button type="submit" className="btn btn-primary">
//               Login
//             </button>
//           </div>
//           <p className="forgot-password text-right mt-2">
//             <Link to="/ResetComponent">Forgot password? </Link>
//           </p>
//         </div>
//         <ToastContainer />
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./CSS/fanLogin.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [slug, setSlug] = useState("");
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const url = `http://localhost:5000/api/auth/${id}`;
      const url = `http://localhost:5000/api/users/indi/${slug}`;
      const { data: res } = await axios.get(url, data);
      localStorage.setItem("token", res.data);
      localStorage.setItem("username", JSON.stringify(slug));
      console.log(res.data + "res.data hai ye");
      window.location = `/FanProfile/${slug}`;
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
        <h3 className="Auth-form-title">Welcome back, Fan!</h3>
        <div className="text-center">
          Not yet registered? {" "}
          <span className="link-primary" style={{ color: "" }}>
            {/* onClick={changeAuthMode}> */}
            <Link to={'/fanSignup'}>Sign up</Link>
          </span>
        </div>
        <div className="Auth-form-content">
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              placeholder="username"
              name="slug"
              onChange={(event) => {
                setSlug(event.target.value);
              }}
              value={slug}
              required
              className="form-control mt-1"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
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
            {<Link to="/forgot-password">Forgot password? </Link>}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
