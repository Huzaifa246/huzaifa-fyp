import "./CSS/Schedule.css"
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMeeting } from "../state/index";
import { useSelector } from "react-redux";

const Meetings = React.memo((props) => {
  const [data, setData] = useState([]);
  const slug = useSelector((state) => state.slug);
  const meeting = useSelector((state) => state.meeting);

  const handleJoinMeeting = (meeting) => {
    window.location.href = `https://backend-fanclub.onrender.com/${meeting}`;
  }
  useEffect(() => {
    axios.get(`http://localhost:5000/api/celebs/meeting/${slug}`)
      .then(response => {
        setData(response.data.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error, "Api error")
      });
  }, []);

  return (
    <>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Booked Meetings
      </div>
      {data.map((users) => {
        return (
          <>

            <Col style={{ paddingBottom: "10px" }}>
              <div className='bookedMeeting'>

                <div className='bookedMeeting__title'>
                  <strong >

                    <strong>Celebrity: {users.name}</strong>
                    <br />
                  </strong>
                </div>
                <div className='bookedMeeting__time'>
                  <strong>Date : {users.date}</strong>
                  <strong>Time : {users.time}</strong>
                  {/* <strong>{users.cost}</strong> */}
                </div>
                <button onClick={() => handleJoinMeeting(users._id)}>
                  Join Meeting
                </button>
              </div>
            </Col>
          </>
        );
      })};

    </>
  );
})

const CelebMeetings = React.memo(() => {
  const [celebData, setCelebData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.loggedIn);
  const celebSlug = useSelector((state) => state.slug);

  useEffect(() => {
    const func = async () => {
      await axios
        .get(`http://localhost:5000/api/celebs/indi/${celebSlug}`)
        .then((resp) => {
          return setCelebData(resp.data.celebrities.meeting);
        });
    };
    func();
  }, []);

  const handleJoinMeeting = (meeting) => {
    window.location.href = `https://backend-fanclub.onrender.com/${meeting}`;
  }
  return (
    <>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Booked Meetings
      </div>
      {celebData.filter(meeting => meeting.fanSlug !== null).map((meeting) => {
        return (
          <>

            <Col className="meeting__column" style={{ paddingBottom: "10px" }}>
              <div className="bookedMeeting">
                <div className="bookedMeeting__title">
                  <strong>Fan : {meeting.fanSlug}</strong>
                </div>

                <div className="bookedMeeting__time">
                  <strong>Time : {meeting.time}</strong>
                  <strong>Date : {meeting.date}</strong>
                </div>
                <button onClick={() => handleJoinMeeting(meeting._id)}>
                  Join Meeting
                </button>
              </div>
            </Col>
          </>
        );
      })};
    </>
  );
});
function Schedule(props) {
  const loggedIn = useSelector((state) => state.loggedIn);

  if (loggedIn === "fan") {
    return (
      <div className="schedule">
        <div className="schedule__row">
          <Meetings />
        </div>
      </div>
    );
  }
  return (
    <div className="schedule">
      <div className="schedule__row">
        <CelebMeetings />
      </div>
    </div>
  );
}

export default Schedule