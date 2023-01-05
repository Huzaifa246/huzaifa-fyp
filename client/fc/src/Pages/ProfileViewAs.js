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
import Stack from '@mui/material/Stack';
import { defaultpic, user4 } from "./imports";
// --------------------

// const deleteFunction = async (id) => {
//   if (!window.confirm('Are you sure?')) return
//   try {
//     await fetch(`http://localhost:5000/api/celebs/${id}`, {
//       setEventId(eventId.filter((c) => c.id !== id))
//     })
//   } catch (err) {
//     console.log(err)
//   }
// }

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const styles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    align: "right",
  },
  chip: {
    marginRight: theme.spacing.unit,
  },
  // section1: {
  //   margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
  // },
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
  const [id, setId] = useState("");
  const [meet, setMeet] = useState("");
  // const [changeColor, setChangeColor] = useState("");

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
          console.log(resp.data.celebrities.meeting);
          setId(resp.data.celebrities._id)
          setMeet(resp.data.celebrities.meeting.meet)
          // console.log(meet)
          // console.log(id)
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
  //   console.log(c.date)
  // ))

  function AvailableDate() {
    const sessions = meeting?.map((items) => {
      function select_meeting() {
        alert(items._id)
        axios.put(`http://localhost:5000/api/celebs/${id}/meet/${items._id}`, {
          // const dateArr []
          // date: dateArr.push(capsule.value)
          date: items.date
        });
        // setChangeColor(!changeColor)
        // console.log(items.date)
      }

      console.log(items.date)
      return (

        <>
          {items.time !== "" ?
            <Stack direction="row" spacing={1}>
              <Chip
                size="medium"
                avatar={<Avatar>D</Avatar>}
                label={items.date}
                clickable
                color="secondary"
                onClick={select_meeting}
                onDelete={handleDelete}
                deleteIcon={<DeleteIcon variant="outlined" color="red" />}
                variant="outlined"
                style={{ width: "100%", padding: "20px", marginTop: "10px", backgroundColor: items.date === true ? "lightblue" : "" }}
              />
            </Stack>
            : ""}

        </>
      );
    });

    return <div>{sessions}</div>;
  }
  function AvailableTime(props) {
    const sessions = meeting?.map((items) => {
      function select_meetingTime() {
        alert(items._id)
        axios.put(`http://localhost:5000/api/celebs/${id}/meet/${items._id}`, {
          selectedTime: items.selectedTime
        });
        console.log(items.selectedTime)
      }
      return (
        <>
          {items.time !== "" ?
            <Chip
              avatar={<Avatar>T</Avatar>}
              label={items.time}
              clickable
              // className={classes.chip}
              color="primary"
              onClick={select_meetingTime}
              onDelete={handleDelete}
              deleteIcon={<DeleteIcon />}
              variant="outlined"
              style={{ width: "%", marginLeft: "20px", marginTop: "10px", backgroundColor: items.selectedTime === true ? "lightblue" : "" }}
            />
            : ""}
        </>
      );
    });

    return <div>{sessions}</div>;
  }
  const { classes } = props;
  // video
  const inputRef = React.useRef();
  const [source, setSource] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  // This function is called when the button is clicked the first time
  const handleClick = () => {
    setIsDisabled(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

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

      <div className="profile-div" style={{ align: "center", display: 'flex', justifyContent: "center", paddingTop: "40px" }} >
        <Grid item xs={3} style={{ width: "100%", minWidth: "350px" }}>
          <Item>
            <div className={classes.root}>
              <div className={classes.section1}>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography gutterBottom variant="h6">
                      {/* <Link to={`/profile/view-as/${slug}/Stripe`}>
                        Avalible Sessions
                      </Link> */}
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
                <Link to={"/payment"}>
                  <Button variant="contained" color="primary" fullWidth>
                    Book Session
                  </Button>
                </Link>
              </div>
            </div>
          </Item>
        </Grid>
      </div>
      <div style={styles.container}>
        <button
          disabled={isDisabled}
          onClick={handleClick}
          // this is the style for the button
          style={isDisabled ? styles.buttonDisabled : styles.button}
        >
          Button
        </button>
      </div>
    </>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);