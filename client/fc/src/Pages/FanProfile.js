import "./CSS/PersonalProfile.css";
import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { defaultpic, user4 } from "./imports";
// --------------------

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, fans: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Profile(props, setCurrentId) {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error }, dispatch] = useReducer(reducer, {
    // celebs: [],
    loading: true,
    error: "",
  });


  const [fans, setFans] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });

      try {
        // get data of every individual fans by slug
        const result = await axios.get(`http://localhost:5000/api/users/indi/${slug}`).then((resp) => {
          setFans(resp.data.users);
          console.log(resp.data.users);
        });

        dispatch({ type: "FETCH_SUCCESS", payload: result.data });

      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();

  }, [slug]);

  return (
    <>
      <br />
      <div style={{ display: "flex", justifyContent: "space-around", }} >
        <div className="container-width">
          <div className="col-12 col-sm-12 col-md-12 col-lg-3">
            <div className="our-team">
              <div className="picture">
                <a href={fans.image}>
                  <LazyLoadImage
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "80px",
                    }}
                    src={fans.image || user4}
                    alt=""
                    // acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    // showPreviews={true}
                    maxFileSize={1000000}
                    filesLimit={1}
                  />
                </a>
              </div>
              <Link to={`/FanProfile/edit-profile/${fans.slug}`}>
                <button className="pro" onClick={() => (setCurrentId = fans._id)}>EDIT</button>
              </Link>
              <div className="team-content">
                <h3 className="name">{fans.fullName}</h3>
                <h4 className="title">{fans.email}</h4>
                <h5 className="title">{fans.bio}</h5>
              </div>
              <ul className="social">
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;