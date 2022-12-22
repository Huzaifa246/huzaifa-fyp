import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./CSS/fansup.css";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
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
			const url = "http://localhost:5000/api/cusers";
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
          <h3 className="Auth-form-title">Hello Star,</h3>
          <p className="Auth-form-title">Sign Up to connect with your fans</p>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary">
              <Link to={"/celeb-login-copy"}>Login</Link>
            </span>
          </div>
          <div className="form-group mt-3">
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className="form-control mt-1"
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
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
              			style={{width:"220px", marginLeft:"55px", marginTop:"10px", marginBottom:"10px"}}
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
