import "./CSS/Schedule.css"
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useSelector } from "react-redux";

const Meetings = React.memo((props) => {
  const [data, setData] = useState([]);
  const slug = useSelector((state) => state.slug);
  const meeting = useSelector((state) => state.meeting);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/indi/${slug}`)
      .then(response => {
        setData(response.data.users.booked_meetings)
        console.log(response.data.users.booked_meetings)
      })
      .catch(error => {
        console.log(error, "Api error")
      });
  }, []);

  const filteredData = data.filter(users => users)

  return (
    <>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Meetings
      </div>
      {filteredData.map((users) => {
        return (
          <>

            <Col style={{ paddingBottom: "10px" }}>
              <div className='bookedMeeting'>

                <div className='bookedMeeting__title'>
                  <strong >
                    users : {users._id}
                    <br />
                    {/* {users.name} */}
                  </strong>
                </div>
                <div className='bookedMeeting__time'>
                  <strong>{users.date}</strong>
                  <strong>{users.time}</strong>
                  <strong>{meeting.name}</strong>
                  {/* <strong>{users.cost}</strong> */}
                </div>
                <a href="http://localhost:5000/createMeeting" target="_blank" rel="noopener noreferrer">
                  <button>Join Meeting</button>
                </a>
              </div>
            </Col>
          </>
        );
      })};

    </>
  );
})

function Schedule(props) {
  const loggedIn = useSelector((state) => state.loggedIn);

  if (loggedIn === "fan") {
    return (
      <div className="schedule">
        <div className="schedule__row">
          {/* <Meetings message="Join Meeting"/> */}
          <Meetings meetingList={props.FanSlug} />
        </div>
      </div>
    );
  }
  return (
    <div className="schedule">
      <div className="schedule__row">
        {/* <Meetings message="Join Meeting"/> */}
        <h1>Celeb Schedule</h1>
      </div>
    </div>
  );
}

export default Schedule