// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Signup(props) {

//   let regexEmail = (/^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,}$/);
//   const [user, setUser] = useState({
//     slug: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((user) => ({
//       ...user,
//       [name]: value,
//     }));
//   };


//   const PostData = async (e) => {
//     e.preventDefault();
//     const { slug, email, password } = user;

//     let res = await fetch("http://localhost:5000/api/fans/fan-signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         slug,
//         email,
//         password,
//       }),
//     });
//     await res.json() // to avoid loading on the screen
//     if (!slug || !email || !password) {
//       toast.error("Please fill out the form. Invalid Details", {
//         position: "top-center",
//       });
//     }
//     else if (!email.match(regexEmail)) {
//       toast.error("Invalid Email. Please Try again", {
//         position: "top-center",
//       });
//     }
//     else {
//       toast.success("Successful Signup.", {
//         position: "top-center",
//       });
//     }
//   };


//   return (
//     <div className="Auth-form-container">
//       <form method="POST" className="Auth-form">
//         <div className="Auth-form-content">
//           <h3 className="Auth-form-title">Hello Fan,</h3>
//           <p className="Auth-form-title">Sign Up to connect with your idols</p>
//           <div className="text-center">
//             Already registered?{" "}
//             <span className="link-primary">
//               <Link to={"/fan-login"}>Login</Link>
//             </span>
//           </div>
//           <div className="form-group mt-3">
//             <input
//               type="text"
//               name="slug"
//               required
//               value={user.slug}
//               onChange={handleChange}
//               className="form-control mt-1"
//               placeholder="User Name"
//             />
//           </div>
//           <div className="form-group mt-3">
//             <input
//               type="email"
//               name="email"
//               required
//               value={user.email}
//               onChange={handleChange}
//               className="form-control mt-1"
//               placeholder="Email Address"
//             />
//           </div>
//           <div className="form-group mt-3">
//             <input
//               type="password"
//               name="password"
//               required
//               value={user.password}
//               onChange={handleChange}
//               className="form-control mt-1"
//               placeholder="Password"
//             />
//           </div>
//           <div className="d-grid gap-2 mt-3">

//             <button
//               type="submit"
//               className="btn btn-primary"
//               onClick={PostData}
//               style={{ width: "220px", marginLeft: "55px", marginTop: "10px", marginBottom: "10px" }}
//             >
//               Create Account
//             </button>

//           </div>
//         </div>
//         <ToastContainer />
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./CSS/fansup.css";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    slug: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
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
      <form onSubmit={handleSubmit} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Hello Fan,</h3>
          <p className="Auth-form-title">Sign Up to connect with your idols</p>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary">
              <Link to={"/fan-login"}>Login</Link>
            </span>
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              onChange={handleChange}
              value={data.name}
              required
              className="form-control mt-1"
            />
            <input
              type="text"
              placeholder="slug"
              name="slug"
              onChange={handleChange}
              value={data.slug}
              required
              className="form-control mt-1"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="form-control mt-1"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="form-control mt-1"
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "220px", marginLeft: "55px", marginTop: "10px", marginBottom: "10px" }}
            >
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
