import React, { useEffect, useState } from "react";
import "./CSS/Dashboard.css";
import Categories from "../Components/Dashboard-Slider";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { TextField } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useStateValue } from "../reducer/StateProvider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TvIcons = React.memo(() => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const func = async () => {
      await axios.get("http://localhost:5000/api/celebs").then((resp) => {
        return setData(resp.data.celebrities);
      });
    };
    func();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div>
      <div className="section-header" style={{ marginTop: "50px" }}>
        TV Icons
      </div>
      <Slider {...settings}>
        {data
          .filter((celeb) => celeb.category === "tv")
          .map((celeb) => {
            return (
              <div key={celeb.id}>
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
                      <Link to={`/profile/view-as/${celeb.slug}`}>
                        <h3 className="card-title">{celeb.name}</h3>
                      </Link>
                      <p className="card-text">{celeb.bio}</p>
                    </div>
                  </div>
                </Col>
              </div>
            );
          })}
      </Slider>
    </div>
  );
});

const FilmIcons = React.memo(() => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const func = async () => {
      await axios.get("http://localhost:5000/api/celebs").then((resp) => {
        return setData(resp.data.celebrities);
      });
    };
    func();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Film Icons
      </div>
      <Slider {...settings}>
        {data
          .filter((celeb) => celeb.category === "film")
          .map((celeb) => {
            return (
              <div key={celeb.id}>
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
                      <Link to={`/profile/view-as/${celeb.slug}`}>
                        <h3 className="card-title">{celeb.name}</h3>
                      </Link>
                      <p className="card-text">{celeb.bio}</p>
                    </div>
                  </div>
                </Col>
              </div>
            );
          })}
      </Slider>
    </div>
  );
});
const Bloggers = React.memo(() => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const func = async () => {
      await axios.get("http://localhost:5000/api/celebs").then((resp) => {
        return setData(resp.data.celebrities);
      });
    };
    func();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Bloggers
      </div>
      <Slider {...settings}>
        {data
          .filter((celeb) => celeb.category === "blogger")
          .map((celeb) => {
            return (
              <div key={celeb.id}>
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
                      <Link to={`/profile/view-as/${celeb.slug}`}>
                        <h3 className="card-title">{celeb.name}</h3>
                      </Link>
                      <p className="card-text">{celeb.bio}</p>
                    </div>
                  </div>
                </Col>
              </div>
            );
          })}
      </Slider>
    </div>
  );
});
const Youtubers = React.memo(() => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const func = async () => {
      await axios.get("http://localhost:5000/api/celebs").then((resp) => {
        return setData(resp.data.celebrities);
      });
    };
    func();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Youtubers
      </div>
      <Slider {...settings}>
        {data
          .filter((celeb) => celeb.category === "youtuber")
          .map((celeb) => {
            return (
              <div key={celeb.id}>
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
                      <Link to={`/profile/view-as/${celeb.slug}`}>
                        <h3 className="card-title">{celeb.name}</h3>
                      </Link>
                      <p className="card-text">{celeb.bio}</p>
                    </div>
                  </div>
                </Col>
              </div>
            );
          })}
      </Slider>
    </div>
  );
});

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="fa fa-arrow-right"></i>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="fa fa-arrow-left"></i>
    </div>
  );
};

const Search = React.memo((props) => {
  const [data, setData] = useState([]);

  // return data.filter(data => {
  //   return data.toLowerCase()
  // })

  useEffect(() => {
    const func = async () => {
      await axios.get("http://localhost:5000/api/celebs").then((resp) => {
        return setData(resp.data.celebrities);
      });
    };
    func();
  }, []);

  console.log(data.filter((celeb) => celeb.name === props));
  console.log(props);

  return (
    <div>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Found Results
      </div>

      {data
        .filter((celeb) => celeb.name === props.celeb)
        .map((celeb) => {
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
    </div>
  );
});

export default function Dashboard() {
  // --- Search Bar
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
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
        {/* <List input={inputText} /> */}
      </div>
      {inputText ? <Search celeb={inputText} /> : ""}
      <TvIcons />
      <FilmIcons />
      <Bloggers />
      <Youtubers />
    </>
  );
}
