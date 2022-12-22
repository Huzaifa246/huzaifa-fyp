import React from "react";
import "../Pages/CSS/Footer.css";
import AppStore from "./images/app-store.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
export default function Footer() {
  return (
    <footer class="section" style={{ color: "white" , height:"300px"}}>
      <div class="container">
        <div class="row">
          <div class="col-4 col-md-6 col-sm-12">
            <div class="content">
              <a href="#" class="logo">
                <i class="bx bx-movie-play bx-tada main-color"></i>Fan
                <span class="main-color">C</span>lub
              </a>
              <p>
                FanClub is a platform that connects celebrities to their fans
                through the website. FanClub allows fans to pay
                their favorite celebrities for a one-to-one virtual conversation to experience
                a new exposure of their lives.
              </p>
              <div class="social-list">
                <a href="#" class="social-item">
                  <i class="bx bxl-facebook">
                    <FacebookIcon />
                  </i>
                </a>
                <a href="#" class="social-item">
                  <i class="bx bxl-twitter">
                    <TwitterIcon />
                  </i>
                </a>
                <a href="#" class="social-item">
                  <i class="bx bxl-instagram">
                    <InstagramIcon />
                  </i>
                </a>
              </div>
            </div>
          </div>
          <div class="col-8 col-md-6 col-sm-12">
            <div class="row">
              <div class="col-3 col-md-6 col-sm-6">
                <div class="content">
                  <p style={{ fontWeight: "bold", marginLeft: "30px" }}>
                    FanClub
                  </p>
                  <ul class="footer-menu" style={{ marginTop: "-10px" }}>
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
              <div class="col-3 col-md-6 col-sm-6">
                <div class="content">
                  <p style={{ fontWeight: "bold", marginLeft: "30px" }}>
                    Browse
                  </p>
                  <ul class="footer-menu" style={{ marginTop: "-10px" }}>
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
              <div class="col-3 col-md-6 col-sm-6">
                <div class="content">
                  <p style={{ fontWeight: "bold", marginLeft: "30px" }}>Help</p>
                  <ul class="footer-menu" style={{ marginTop: "-10px" }}>
                    <li>
                      <a href="/about-us">FAQ</a>
                    </li>
                    <li>
                      <a href="/about-us">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-3 col-md-6 col-sm-6">
                <div class="content">
                  <p style={{ fontWeight: "bold", marginLeft: "20px" }}>
                    Download App
                  </p>
                  <ul class="footer-menu" style={{ marginTop: "-10px" }}>
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
