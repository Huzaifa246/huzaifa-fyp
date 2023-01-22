import React from "react";
import "../Pages/CSS/Footer.css";
import AppStore from "./images/app-store.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <footer className="section" style={{ color: "white", height: "auto" }}>
      <div className="container">
        <div className="row">
          <div className="col-4 col-md-6 col-sm-12">
            <div className="content">
              <div>
                <i className="bx bx-movie-play bx-tada main-color"></i>Fan
                <span className="main-color">C</span>lub
                {/* <img src={logo} alt="" style={{ maxHeight: "80px", maxWidth: "80px" }} /> */}
              </div>
              <p>
                FanClub is a platform that connects celebrities to their fans
                through the website. FanClub allows fans to pay
                their favorite celebrities for a one-to-one virtual conversation to experience
                a new exposure of their lives.
              </p>
              <div className="social-list">
                <a href="#" className="social-item">
                  <i className="bx bxl-facebook">
                    <FacebookIcon />
                  </i>
                </a>
                <a href="#" className="social-item">
                  <i className="bx bxl-twitter">
                    <TwitterIcon />
                  </i>
                </a>
                <a href="#" className="social-item">
                  <i className="bx bxl-instagram">
                    <InstagramIcon />
                  </i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-8 col-md-6 col-sm-12">
            <div className="row">
              <div className="col-3 col-md-6 col-sm-6">
                <div className="content">
                  <p style={{ fontWeight: "bold", marginLeft: "30px" }}>
                    FanClub
                  </p>
                  <ul className="footer-menu" style={{ marginTop: "-10px" }}>
                    <li>
                      <a href="/about-us">Team</a>
                    </li>
                    <li>
                      <a href="/about-us">Our Profile</a>
                    </li>
                    <li>
                      <a href="#">Roadmap</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-3 col-md-6 col-sm-6">
                <div className="content">
                  <p style={{ fontWeight: "bold", marginLeft: "30px" }}>
                    Browse
                  </p>
                  <ul className="footer-menu" style={{ marginTop: "-10px" }}>
                    <li>
                      <a href="/">Online Platform</a>
                    </li>
                    <li>
                      <a href="/categories">Explore</a>
                    </li>
                    <li>
                      <a href="/about-us">Pricing Plan</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-3 col-md-6 col-sm-6">
                <div className="content">
                  <p style={{ fontWeight: "bold", marginLeft: "30px" }}>Help</p>
                  <ul className="footer-menu" style={{ marginTop: "-10px" }}>
                    <li>
                      <a href="/about-us">FAQ</a>
                    </li>
                    <li>
                      <a href="/about-us">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-3 col-md-6 col-sm-6">
                <div className="content">
                  <p style={{ fontWeight: "bold", marginLeft: "20px" }}>
                    Download App
                  </p>
                  <ul className="footer-menu" style={{ marginTop: "-10px" }}>
                    <li>
                      <a href="#">
                        <img
                          src="https://www.pngmart.com/files/10/Get-It-On-Google-Play-Transparent-PNG.png"
                          alt=""
                          style={{
                            width: "300px",
                            marginLeft: "-35px",
                            height: "",
                          }}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src={AppStore}
                          alt=""
                          style={{
                            width: "300px",
                            marginLeft: "-35px",
                            marginTop: "10px",
                          }}
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
}
