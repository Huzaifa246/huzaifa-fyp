// import { Link } from "react-router-dom";
import "./CSS/Profileviewas.css";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMeeting } from "../state/index";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Meetings = React.memo(() => {
  const params = useParams();
  const { slug } = params;
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.loggedIn);

  useEffect(() => {
    const func = async () => {
      await axios
        .get(`http://localhost:5000/api/celebs/indi/${slug}`)
        .then((resp) => {
          return setData(resp.data.celebrities.meeting);
        });
    };
    func();
  }, []);

  const handleBookMeeting = (meetingDetails) => {
    if (loggedIn === "fan") {
      dispatch(
        setMeeting({
          meeting: meetingDetails,
        })
      );
      navigate(`/payment`);
    }
    else {
      toast.error("Log in with fan account to book session", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Meetings
      </div>
      {data.filter(meeting => meeting.fanSlug === null).map((meeting) => {
        return (
          <>

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
                <button onClick={() => handleBookMeeting(meeting)}>
                  Book Meeting
                </button>
              </div>
            </Col>
            <ToastContainer />
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
  const [selected, setSelected] = useState(false);
  const [id, setId] = useState("");

  const [celeb, setCeleb] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get data of every individual celeb by slug
        const result = await axios
          .get(`http://localhost:5000/api/celebs/indi/${slug}`)
          .then((resp) => {
            setCeleb(resp.data.celebrities);
            // setId(resp.data.id);
            console.log(resp.data.celebrities.meeting);
            setId(resp.data.celebrities._id);
            console.log(id);
          });
      } catch (err) { }
    };
    fetchData();
  }, [slug]);
  const meeting = celeb.meeting;
  meeting?.map((c) => console.log(c.date));

  const { classes } = props;
  // video
  const inputRef = React.useRef();
  const [source, setSource] = useState();
  const [medias, setMedias] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };
  // end video

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
              <h6>{celeb.bio}</h6>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Meetings />
      </div>
    </>
  );
}

export default Profile;
