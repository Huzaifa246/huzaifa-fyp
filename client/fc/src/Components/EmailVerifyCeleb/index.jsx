import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../images/success.png";
import styles from "./styles.module.css";
import { Fragment } from "react";

const EmailVerifyCeleb = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:5000/api/celebs/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <Fragment>
      (
      <div className={styles.container}>
        <img src={success} alt="success_img" className={styles.success_img} />
        <h1>Email verified successfully</h1>
        <Link to="/celeb-login">
          <button className={styles.green_btn}>Login</button>
        </Link>
      </div>
      )
    </Fragment>
  );
};

export default EmailVerifyCeleb;
