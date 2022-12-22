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

function handleDelete() {
  alert("Session is available"); // eslint-disable-line no-alert
}



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

  const [{ loading, error, celebs }, dispatch] = useReducer(reducer, {
    // celebs: [],
    loading: true,
    error: "",
  });

  const [celeb, setCeleb] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });

      try {
        // get data of every individual celeb by slug
        const result = await axios.get(`http://localhost:5000/api/celebs/indi/${slug}`).then((resp) => {
          setCeleb(resp.data.celebrities);
          console.log(resp.data.celebrities);
        });

        dispatch({ type: "FETCH_SUCCESS", payload: result.data });

      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();

  }, [slug]);
  const meeting = celeb.meeting
  // meeting?.map((c) => (
  //   console.log(c) 
  // ))

  const [delMeet, setDelMeet] = useState()

  function AvailableDate() {
    const sessions = meeting?.map((items) => {
      function delete_meeting() {
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
              onDelete={handleDelete}
              deleteIcon={<DeleteIcon />}
              variant="outlined"
              onClick={delete_meeting}
              style={{ width: "40%", marginLeft: "20px", marginTop: "10px" }}

            />

          </>
        );
      }
    });

    return <div>{sessions}</div>;
  }
  function AvailableTime(props) {
    const sessions = meeting?.map((items) => {
      function delete_meeting() {
        alert(items._id)
      }
      if (items.time !== undefined) {
        return (
          <>
            <Chip
              key=""
              avatar={<Avatar>T</Avatar>}
              label={items.time}
              clickable
              color="primary"
              // onClick={() => handleDelete(items.id)}
              onDelete={handleDelete}
              onClick={delete_meeting}
              deleteIcon={<DeleteIcon />}
              variant="outlined"
              style={{ minWidth: "40%", marginLeft: "20px", marginTop: "10px" }}
            // style={{ maxWidth: "50%", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}
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
                  src={celeb.image}
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
              <div className={classes.section2}>
                <Typography gutterBottom variant="h6">
                  Avalible Time Slots
                </Typography>
                <div>
                  <AvailableTime />
                </div>
              </div>
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