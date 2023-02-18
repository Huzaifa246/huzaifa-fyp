import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const ForgotPasswordCeleb = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:5000/api/celeb-password-reset`;
      const { data } = await axios.post(url, { email });
      setMsg(data.message);
      setError("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <h3 className="Auth-form-title">Forgot Password</h3>
        <div className="Auth-form-content">
          <div className="form-group mt-3">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="form-control mt-1"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordCeleb;
