import { useEffect, useReducer, useState } from "react";
import "./CSS/Booking.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

export default function Booking() {
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

  const params = useParams();
  const { slug } = params;

  const [id, setId] = useState("");
  const [total_cost, setTotal_Cost] = useState("");
  const [total_members, setTotal_Members] = useState("");
  const [message, setMessage] = useState("");
  const [dtPicker, setDTPicker] = useState("");


  const [{ loading, error, celebs }, dispatch] = useReducer(reducer, {
    // celebs: [],
    loading: true,
    error: "",
  });

  const [celeb, setCeleb] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });

      try {
        // get data of every individual celeb by slug
        const result = await axios
          .get(`http://localhost:5000/api/celebs/indi/${slug}`)
          .then((resp) => {
            setCeleb(resp.data.celebrities);
            setId(resp.data.celebrities._id);
            console.log(celeb)
          });

        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };

    fetchData();
  }, [slug]);


  const new_meeting = {
    total_cost: total_cost,
    total_members: total_members,
    message: message,
    date: dtPicker,
    // time: time,
  };


  const updateUser = async (e) => {

    axios.put(`http://localhost:5000/api/celebs/${id}`, new_meeting)

    alert("meeting added");
  };
  function myFunction(e) {
    e.preventDefault();
  }


  console.log(celeb.meeting);
  return (
    <>
      <div id="booking" className="section">
        <div className="section-center">
          <div className="container">
            <div className="row">
              <div className="booking-form">
                <div className="form-header">
                  <h1>Make your Meeting Session</h1>
                </div>
                <form onsubmit={myFunction}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          value={celeb.name}
                          type="text"
                          name="slug"
                          required
                        />
                        <span className="form-label">Name</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="tel"
                          value={celeb.category}
                          name="email"
                          required
                        />
                        <span className="form-label"></span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Total Cost"
                          name="cost"
                          required
                          value={total_cost}
                          onChange={(event) => {
                            setTotal_Cost(event.target.value);
                          }}
                        />
                        <span className="form-label">Cost</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          required
                          name="members"
                          onChange={(event) => {
                            setTotal_Members(event.target.value);
                          }}
                        >
                          <option value="" selected hidden>
                            No of Members
                          </option>
                          <option value="1">1</option>
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Meeting Message (Optional)"
                      name="message"
                      required
                      value={message}
                      onChange={(event) => {
                        setMessage(event.target.value);
                      }}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="datetime-local"
                          // min="2022-06-14 Time 00:00" max="2030-01-01Time00:00"
                          // pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}Time[0-9]{2}:[0-9]{2}"
                          required
                          name="date and time"
                          value={dtPicker}
                          onChange={(event) => {
                            setDTPicker(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    {/* time */}

                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="time"
                          required
                          name="time"
                          value={time}
                          onChange={(event) => {
                            setTime(event.target.value);
                          }}
                        />
                        <span className="form-label">Time</span>
                      </div>
                    </div> */}
                    {/* time end */}
                  </div>
                  <div className="form-btn">
                    <button className="submit-btn" onClick={updateUser}>
                      Post Meeting
                    </button>
                  </div>
                  <ToastContainer />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Box> */}
    </>
  );
}