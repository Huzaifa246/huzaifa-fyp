import React from 'react'
import Slider from "react-slick";
import '../Pages/CSS/categories.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "./images/banner1.jpg";
import banner2 from "./images/banner2.png";
import banner3 from "./images/banner3.jpg";

function Categories(props) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    lazyLoad: true
  };
  const slidesData = [
    {
      id: 1,
      image: banner1,
    },
    {
      id: 2,
      image: banner2,
    }, {
      id: 3,
      image: banner3,
    },
  ];
  return (
    <>

      <div className="App">
        <div className="slider-wrapper">

          <Slider {...settings}>

            {slidesData.map((slide) =>

              <div className="slick-slide" key={slide.id}>
                <h2 className="slick-slide-title">  </h2>
                <img className="slick-slide-image" src={slide.image} alt=""
                  style={{ height: "400px" }}
                />
                {/* <label className="slick-slide-label">{slide.label}</label> */}
              </div>
            )}

          </Slider>
          <br />

        </div>

      </div>
    </>
  )
}

export default Categories