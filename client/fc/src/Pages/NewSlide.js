import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CSS/Dashboard.css";
// import '../Pages/CSS/newSlide.css'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}
function NewSlide(props) {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        // autoplaySpeed: 2000,
        // cssEase: "linear",
        slidesPerRow: 4,
        fade: true,
        lazyLoad: true,
        col: 4,
        adaptiveHeight: true,
        arrows: true,
        dotsClass: 'slick-dots',
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    };
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
        <>
            <div className="section-header" style={{ marginTop: "50px" }}>
                TV Icons
            </div>
            <Slider {...settings}>

                {data.filter((celeb) => celeb.category === "youtuber").map((celeb) =>
                    <Col style={{ paddingBottom: "10px" }}>
                        <div className="card" style={{ marginLeft: "30px" }}>
                            <figure>
                                <LazyLoadImage
                                    src={celeb.image}
                                    alt="celebrity"
                                    style={{ maxWidth: "350px", height: "250px" }}
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
                )}

            </Slider>
        </>
    )
}

export default NewSlide