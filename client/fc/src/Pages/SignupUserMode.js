import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function UserMode() {
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up as</h3>

          <div className="d-grid gap-2 mt-3">
            <Link to={"/fanSignup"}>
              <Button type="submit" className="btn btn-primary">
                Fan
              </Button>
            </Link>
          </div>

          <div className="d-grid gap-2 mt-3">
            {/* <Link to={"/celeb-signup-copy"}> */}
            <Link to={"/celeb-signup"}>
              <Button type="submit" className="btn btn-primary">
                Celebrity
              </Button>
            </Link>
          </div>
          <p style={{ marginTop: "32px", marginLeft: "23%" }}>
            <Link to={'/login-usermode'}>Already have an account?</Link>
          </p>
        </div>

      </form>
    </div>
  );
}
