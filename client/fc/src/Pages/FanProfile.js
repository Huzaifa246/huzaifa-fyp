// import { Link } from "react-router-dom";
import "./CSS/profile.css";
import React, { useEffect, useReducer, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { defaultpic } from "./imports";
// --------------------


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  align: "center",
  color: theme.palette.text.secondary,
}));
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    minWidth: 350,
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    align: "center",
    justifyContent: "center",
  },
  chip: {
    marginRight: theme.spacing.unit,
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
  },
  section2: {
    margin: theme.spacing.unit * 1,
  },
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2
      }px`,
  },
});




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

  const [{ loading, error, celebs }, dispatch] = useReducer(reducer, {
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
        const result = await axios.get(`api/fans/indiFans/${slug}`).then((resp) => {
          setFans(resp.data.fans);
          console.log(resp.data.fans);
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

      <div style={{ maxWidth: "550px", margin: "0px auto" }}>
        <div
          style={{
            margin: "18px 0px",
            borderBottom: "1px solid grey",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div>
              <a href={fans.image}>
                <LazyLoadImage
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "80px",
                  }}
                  src={fans.image}
                  alt=""
                  visibleByDefault={defaultpic}
                />
              </a>
              <Link to={`/profile/edit-profile/${fans.slug}`}>
                <EditOutlinedIcon
                  style={{ margin: 15 }}
                  onClick={() => (setCurrentId = fans._id)}
                  color="primary"
                  variant="outlined"
                >
                  Edit
                </EditOutlinedIcon>
              </Link>
            </div>
          </div>
          <div style={{ marginTop: "30px" }}>
            <h4>{fans.name}</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h6>

                {fans.bio}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;