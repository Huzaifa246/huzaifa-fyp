// import { Link } from "react-router-dom";
import "./CSS/profile.css";
import React, { useEffect, useReducer, useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "@material-ui/core/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { user4 } from "./imports";
// --------------------

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


const Meetings = React.memo(() => {
  const params = useParams();
  const { slug } = params;
  const [data, setData] = useState([]);
  const [celeb, setCeleb] = useState(null)

  useEffect(() => {
    const func = async () => {
      await axios
        .get(`http://localhost:5000/api/celebs/indi/${slug}`)
        .then((resp) => {
          setData(resp.data.celebrities.meeting);
          setCeleb(resp.data.celebrities);
        });
    };
    func();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (meet_id) => {
    try {
      axios.delete(`http://localhost:5000/api/celebs/${celeb._id}/meet/${meet_id}`)
    }
    catch (error) {
      console.error(error, "ERROR IN DELETE");
    }
    setOpen(false)
  };


  return (
    <>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Meetings
      </div>
      {data.map((meeting) => {
        return (
          <>
            {/* slider */}

            <Col className="meeting__column" style={{ paddingBottom: "10px" }}>
              <div className="bookedMeeting">
                <div className="bookedMeeting__title">
                  <strong>Meeting ID : {meeting._id}</strong>
                </div>
                <div className="bookedMeeting__title">
                  <strong>Cost : {meeting.total_cost}</strong>
                </div>
                <div className="bookedMeeting__time">
                  <strong>Time : {meeting.time}</strong>
                  <strong>Date : {meeting.date}</strong>
                </div>
                {/* //onClick={() => handleDelete()} */}
                <Button onClick={handleOpen}>
                  Delete Session
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"UPDATE PROFILE?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are You sure you want to delete this session???
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} >Disagree</Button>
                    <Button onClick={() => handleDelete(meeting._id)} style={{ color: "red" }}>
                      Delete Session
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Col>
            {/* slider end */}
          </>
        );
      })}
      ;
    </>
  );
});
function Profile(props, setCurrentId) {
  const params = useParams();
  const { slug } = params;
  const [celeb, setCeleb] = useState({})
  const [id, setId] = useState()

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
      <div className="profile-div" style={{ align: "center", display: 'flex', justifyContent: "center", margin: "10px" }} >
        <Link to={`/profile/${celeb.slug}/add-session`}>
          <Button variant="contained" style={{ backgroundColor: "rgb(39, 0, 0)", color: "white" }} size="large">
            Add Session
          </Button>
        </Link>
      </div>
      <Meetings />
    </>
  );
}

export default Profile;