import { useEffect, useReducer, useState } from "react";
import "./CSS/Booking.css";
import axios from "axios";
import styles from "./CSS/fanLogin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";


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
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState("");


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
          });

        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };

    fetchData();
  }, [slug]);


  const new_meeting = {
    name: celeb.name,
    total_cost: total_cost,
    total_members: total_members,
    message: message,
    date: date,
    time: time,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.put(`http://localhost:5000/api/celebs/${id}`, new_meeting)
      toast.success("Session Booked", {
        position: "top-center",
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErrors(error.response.data.message);
      }
    }
  }

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
                <form onsubmit={handleSubmit}>
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
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="date"
                          required
                          name="date"
                          value={date}
                          onChange={(event) => {
                            setDate(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    {/* time */}

                    <div className="col-md-6">
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
                    </div>
                  </div>
                  <div className="form-btn">
                    {errors && <div className={styles.error_msg}>{errors}</div>}
                    <button className="submit-btn" onClick={handleSubmit}>
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