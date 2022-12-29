import React, { useContext } from "react";
import $ from "jquery";
import "../Pages/CSS/Navbar.css";
import { Link } from "react-router-dom";
import { UserContext } from '../App';



export default function Navbar(props) {
  $(document).ready(() => {
    $("#hamburger-menu").click(() => {
      $("#hamburger-menu").toggleClass("active");
      $("#nav-menu").toggleClass("active");
    });
  });

  const {state, dispatch} = useContext(UserContext)

  const clear_user = ()=>{
    localStorage.clear()
    window.location.reload()
  }
  const NavItems = ()=>{
    var strWithOutQuotes
    var strWithQuotes = localStorage.getItem('username')
    if (strWithQuotes){ strWithOutQuotes = strWithQuotes.replace(/['"]+/g, '')}
    
    
    console.log(strWithOutQuotes)
    console.log("testin chalri hai")
    // if(state){
      if(localStorage.getItem('username')){
      
      return (
        <ul className="nav-menu" id="nav-menu" style={{ marginTop: "10px" }}>
              <li style={{marginRight:"30px"}}>
                <Link to={"/"}>Home</Link>
              </li>
              <div className="dropdown">
                <li >
                  <Link to={"/"}>Categories</Link>
                </li>
                <div className="dropdown-content">
                  <Link to={"/tvcategories"}>Tv Artist</Link>
                  <Link to={"/filmcategories"}>Film Icons </Link>
                  <Link to={"/bloggerscategories"}>Bloggers</Link>
                  <Link to={"/ytcategories"}>Yotubers</Link>
                </div>
              </div>
              {/* <li>
                <Link to={"/"}>Events</Link>
              </li> */}
              <li>
                <Link to={"/fan-schedule"}>Schedule</Link>
              </li>
              <li>
                <Link to={"/about-us"}>About</Link>
              </li>
              <li>
                
                <Link to={`/profile/${strWithOutQuotes}`}>Profile</Link>
              </li>
              
              <li onClick={clear_user}>
                <Link to={"/celeb-login"} className="btn btn-hover">
                  <span>Log out</span>
                </Link>
              </li>
            </ul>
      )
    }
    else{
      return (
        <ul className="nav-menu" id="nav-menu" style={{ marginTop: "10px" }}>
              <li style={{marginRight:"30px"}}>
                <Link to={"/"}>Home</Link>
              </li>
              <div className="dropdown">
                <li >
                  <Link to={"/"}>Categories</Link>
                </li>
                <div className="dropdown-content">
                  <Link to={"/tvcategories"}>Tv Artist</Link>
                  <Link to={"/filmcategories"}>Film Icons </Link>
                  <Link to={"/bloggerscategories"}>Bloggers</Link>
                  <Link to={"/ytcategories"}>Yotubers</Link>
                </div>
              </div>
              
              <li>
                <Link to={"/about-us"}>About</Link>
              </li>
  
              <li>
                <Link to={"/signup-usermode"} className="btn btn-hover">
                  <span>Log in</span>
                </Link>
                {/* <a href="/sign-usermode" className="btn btn-hover">
                              <span>Sign Up</span>
                          </a> */}
              </li>
            </ul>
      )
    }
  }

  return (
    <div className="nav-wrapper">
      <div className="container">
        <div className="nav">
          <a
            href="/"
            className="logo"
            style={{ marginTop: "-10px", marginLeft: "10px" }}
          >
            Fan<span className="main-color">C</span>lub
          </a>
          <NavItems/>
          {/* <!-- MOBILE MENU TOGGLE --> */}
          <div className="hamburger-menu" id="hamburger-menu">
            <div className="hamburger"></div>
          </div>
        </div>
      </div>
    </div>
  );
}