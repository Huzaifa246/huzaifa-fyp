import React from 'react'
import "./CSS/PersonalProfile.css";
import { about2 } from "./imports"
function PersonalProfile() {
    return (
        <>
            <br />
            <div style={{ display: "flex", justifyContent: "space-around", }} >
                <div className="container-width">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="our-team">
                            <div className="picture">
                                <img className="img-fluid" src={about2} alt="user" />
                            </div>
                            <button className="pro">EDIT</button>
                            <div className="team-content">
                                <h3 className="name">Nihal</h3>
                                <h4 className="title">Web Developer</h4>
                            </div>
                            <ul className="social">
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonalProfile
