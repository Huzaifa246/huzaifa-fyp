import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const PasswordResetCeleb = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const param = useParams();
  const url = `http://localhost:5000/api/password-reset/${param.id}/${param.token}`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(url, { password });
      setMsg(data.message);
      setError("");
      window.location = "/celeb-login";
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
    <Fragment>
      {validUrl ? (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleSubmit}>
            <h3 className="Auth-form-title">Add New Password</h3>
            <div className="Auth-form-content">
              <div className="form-group mt-3">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
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
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default PasswordResetCeleb;
