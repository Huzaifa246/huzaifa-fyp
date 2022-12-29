import React, { useEffect, useState } from "react";
import "./CSS/Dashboard.css";
import Categories from "../Components/Dashboard-Slider";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { TextField } from "@mui/material";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Carousel from "carousel-react-rcdev";
import "react-responsive-carousel/lib/styles/carousel.min.css"

const TvIcons = React.memo(() => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const func = async () => {
      await axios.get("http://localhost:5000/api/celebs").then((resp) => {
        return setData(resp.data.celebrities);
      });
    };
    func()
  }, []);


  return (
    <div>
      <div className="section-header" style={{ marginTop: "50px" }}>
        TV Icons
      </div>
      <Carousel>
        {data.filter((celeb) => celeb.category === "tv").map((celeb) => {
          return (
            <>
              {/* slider */}

              <Col style={{ paddingBottom: "10px" }}>
                <div className="card" style={{ marginLeft: "20px" }}>
                  <figure>
                    <LazyLoadImage
                      src={celeb.image}
                      alt="Hotel"
                      style={{ width: "400px", height: "250px" }}
                    />
                  </figure>

                  <div className="card-body">
                    {/* <h3 className="card-title">{celeb.name}</h3> */}
                    <Link to={`/profile/view-as/${celeb.slug}`}>
                      <h3 className="card-title">{celeb.name}</h3>
                    </Link>
                    <p className="card-text">{celeb.bio}</p>
                  </div>
                </div>
              </Col>
              {/* slider end */}
            </>
          );
        })}
      </Carousel>
    </div >
  );
})

const FilmIcons = React.memo(() => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const func = async () => {
      await axios.get("http://localhost:5000/api/celebs").then((resp) => {
        return setData(resp.data.celebrities);
      });
    };
    func()
  }, []);

  return (
    <div>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Film Icons
      </div>
      <Carousel>
        {data.filter((celeb) => celeb.category === "film").map((celeb) => {
          return (
            <>
              {/* slider */}

              <Col style={{ paddingBottom: "10px" }}>
                <div className="card" style={{ marginLeft: "50px" }}>
                  <figure>
                    <LazyLoadImage
                      src={celeb.image}
                      alt="Hotel"
                      style={{ width: "400px", height: "250px" }}
                    />
                  </figure>

                  <div className="card-body">
                    {/* <h3 className="card-title">{celeb.name}</h3> */}
                    <Link to={`/profile/view-as/${celeb.slug}`}>
                      <h3 className="card-title">{celeb.name}</h3>
                    </Link>
                    <p className="card-text">{celeb.bio}</p>
                  </div>
                </div>
              </Col>
              {/* slider end */}
            </>
          );
        })}
      </Carousel>
    </div>
  );
})

const Bloggers = React.memo(() => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const func = async () => {
      await axios.get("http://localhost:5000/api/celebs").then((resp) => {
        return setData(resp.data.celebrities);
      });
    };
    func()
  }, []);

  return (
    <div>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Bloggers
      </div>
      {/* <Carousel> */}
      <Carousel>
        {data.filter((celeb) => celeb.category === "blogger").map((celeb) => {
          return (
            <>
              {/* slider */}

              <Col style={{ paddingBottom: "10px" }}>
                <div className="card" style={{ marginLeft: "50px" }}>
                  <figure>
                    <LazyLoadImage
                      src={celeb.image}
                      alt="Hotel"
                      style={{ width: "400px", height: "250px" }}
                    />
                  </figure>

                  <div className="card-body">
                    {/* <h3 className="card-title">{celeb.name}</h3> */}
                    <Link to={`/profile/view-as/${celeb.slug}`}>
                      <h3 className="card-title">{celeb.name}</h3>
                    </Link>
                    <p className="card-text">{celeb.bio}</p>
                  </div>
                </div>
              </Col>
              {/* slider end */}
            </>
          );
        })}
      </Carousel >
      {/* </Carousel> */}
    </div>
  );
})

const Youtubers = React.memo(() => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const func = async () => {
      await axios.get("http://localhost:5000/api/celebs").then((resp) => {
        return setData(resp.data.celebrities);
      });
    };
    func()
  }, []);

  // useEffect(() => {
  //   // fetching data to display in home page slider
  //   axios("api/celebs/youtubers").then((res) => setYoutubers(res.data));
  // }, []);

  return (
    <>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Youtubers
      </div>
      <Carousel>
        {/* {data.map((celeb) => { */}
        {data.filter((celeb) => celeb.category === "youtuber").map((celeb) => {
          return (
            <>
              {/* slider */}

              <Col style={{ paddingBottom: "10px" }}>
                <div className="card" style={{ marginLeft: "50px" }}>
                  <figure>
                    <LazyLoadImage
                      src={celeb.image}
                      alt="Hotel"
                      style={{ width: "400px", height: "250px" }}
                    />
                  </figure>

                  <div className="card-body">
                    {/* <h3 className="card-title">{celeb.name}</h3> */}
                    <Link to={`/profile/view-as/${celeb.slug}`}>
                      <h3 className="card-title">{celeb.name}</h3>
                    </Link>
                    <p className="card-text">{celeb.bio}</p>
                  </div>
                </div>
              </Col>
              {/* slider end */}
            </>
          );
        })}
        ;
      </Carousel>

    </>
  );
})


const Search = (props) => {
  const [data, setData] = useState([]);

  // return data.filter(data => {
  //   return data.toLowerCase()
  // })

  const searchItems = (searchValue) => {
    setData(searchValue)
    data.filter((item) => {
      return Object.values(item).join('').toLowerCase().includes(data.toLowerCase())
    })
  }
  useEffect(() => {
    let response;
    const func = async () => {
      response = await axios.get("http://localhost:5000/api/celebs");
      if (response.data) {

        response = response.data.celebrities.filter(celeb => celeb.name.toLowerCase() === props.celeb.toLowerCase());
        setData(response);
        console.log(response);
      }
      else {
        console.log("no data found.");
      }
    }
    func();
  }, []);

  return (
    <div>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Found Results
      </div>
      {console.log(props.celeb)}
      {data.map((celeb) => {
        return (
          <>
            {/* slider */}

            <Col style={{ paddingBottom: "10px" }}>
              <div className="card" style={{ marginLeft: "50px" }}>
                <figure>
                  <LazyLoadImage
                    src={celeb.image}
                    alt="Hotel"
                    style={{ width: "400px", height: "250px" }}
                  />
                </figure>

                <div className="card-body">
                  {/* <h3 className="card-title">{celeb.name}</h3> */}
                  <Link to={`/profile/view-as/${celeb.slug}`}>
                    <h3 className="card-title">{celeb.name}</h3>
                  </Link>
                  <p className="card-text">{celeb.bio}</p>
                </div>
              </div>
            </Col>
            {/* slider end */}
          </>
        );
      })}
      {/* =============================================================================== */}
    </div>
  );
}

export default function Dashboard() {
  // --- Search Bar
  const [inputText, setInputText] = useState("");
  const inputHandler = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };
  // -----------

  return (
    <>

      <Categories />
      <div>
        <TextField
          type="text"
          placeholder="Search..."
          id="outlined-basic"
          value={inputText}
          onChange={inputHandler}
          variant="outlined"
          label="Search"
        />

        {console.log(inputText)}
        {/* <List input={inputText} /> */}
      </div>
      {inputText.length > 1 ? <Search celeb={inputText} /> : ""}
      <TvIcons />
      <FilmIcons />
      <Bloggers />
      <Youtubers />
    </>
  );
}