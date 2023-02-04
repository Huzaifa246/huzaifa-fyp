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
import { user4 } from "./imports";
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
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2
      }px`,
  },
});

// ...state store previous state also called spread operator
// (current state, action performed)
// payload store data from backend
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, celebs: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Profile(props, setCurrentId) {
  const params = useParams();
  const { slug } = params;
  const [celeb, setCeleb] = useState({})
  const [id, setId] = useState()
  const [meet, setMeet] = useState()

  const [{ loading, error, celebs }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });

      try {
        // get data of every individual celeb by slug
        const result = await axios.get(`http://localhost:5000/api/celebs/indi/${slug}`).then((resp) => {
          setCeleb(resp.data.celebrities);
          setMeet(resp.data.celebrities.meeting)
        });

        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        console.log(result.data, "DATA");
        console.log(result.payload, "payload");
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();

  }, [slug]);
  function handleDelete() {
    axios.delete(`http://localhost:5000/api/celebs/${id}/meet/${meet}`)
      .then(response => {
        console.log(response.data.celebrities.meet, "delete ky click par");
      })
      .catch(error => {
        console.log(error, "Error aa raha");
      }); // eslint-disable-line no-alert
  }

  const meeting = celeb.meeting
  // meeting?.map((c) => (
  //   console.log(c) 
  // ))

  const [delMeet, setDelMeet] = useState()

  function AvailableDate() {
    const sessions = meeting?.map((items) => {
      function getID() {
        alert(items._id)
        setDelMeet(items._id)
      }

      if (items.date !== undefined) {
        return (
          <>
            <Chip
              key=""
              avatar={<Avatar>D</Avatar>}
              label={items.date}
              clickable
              color="primary"
              deleteIcon={<DeleteIcon onClick={handleDelete()} />}
              variant="outlined"
              onClick={getID}
              style={{ width: "40%", marginLeft: "20px", marginTop: "10px" }}

            />

          </>
        );
      }
    });

    return <div>{sessions}</div>;
  }
  const { classes } = props;


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
              <a href={celeb.image}>
                <img
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "80px",
                  }}
                  src={celeb.image || user4}
                  alt=""
                />
              </a>
              <Link to={`/profile/edit-profile/${celeb.slug}`}>
                <EditOutlinedIcon
                  style={{ margin: 15 }}
                  onClick={() => (setCurrentId = celeb._id)}
                  color="primary"
                  variant="outlined"
                >
                  Edit
                </EditOutlinedIcon>
              </Link>
            </div>
          </div>
          <div style={{ marginTop: "30px" }}>
            <h4>{celeb.name}</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h6>

                {celeb.bio}
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}> */}
      {/* Sessions Grid Starts */}
      {/* IS DIV PY KAM HO RAHA */}
      <div className="profile-div" style={{ align: "center", display: 'flex', justifyContent: "center", paddingTop: "50px" }} >
        <Grid item xs={4} style={{ maxWidth: "100%" }}>
          <Item>
            <div className={classes.root}>
              <div className={classes.section1}>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography gutterBottom variant="h6">
                      Avalible Sessions
                    </Typography>
                  </Grid>
                  <Grid item></Grid>
                </Grid>

                <AvailableDate />
              </div>
              <Divider variant="middle" />
              <div className={classes.section3}>
                <Link to={`/profile/${celeb.slug}/add-session`}>
                  <Button variant="contained" color="primary" fullWidth>
                    Add Session
                  </Button>
                </Link>
              </div>
            </div>
          </Item>
        </Grid>
      </div>
      {/* Sessions Grid End */}
    </>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);