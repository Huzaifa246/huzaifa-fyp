import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function UserMode() {
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login as</h3>

          <div className="d-grid gap-2 mt-3">
            <Link to={"/fan-login"}>
              <Button type="submit" className="btn btn-primary">
                Fan
              </Button>
            </Link>
          </div>

          <div className="d-grid gap-2 mt-3">
            {/* <Link to={"/celeb-login-copy"}> */}
            <Link to={"/celeb-login"}>
              <Button type="submit" className="btn btn-primary">
                Celebrity
              </Button>
            </Link>
          </div>
          <p style={{ marginTop: "32px", marginLeft: "30%" }}>
            <Link to={'/signup-usermode'}>Not yet registered?</Link>
          </p>
        </div>

      </form>
    </div>
  );
}
