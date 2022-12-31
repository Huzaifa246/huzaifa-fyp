import React, { useEffect, useState } from "react";
import "./CSS/Dashboard.css";
import Categories from "../Components/Dashboard-Slider";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { TextField } from "@mui/material";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "carousel-react-rcdev";
import styled from "styled-components"

const DashContainer = styled.div
  ` display: flex;
flex-flow: row wrap;
`
const allCelebs = [
  {
    id: "1",
    name: "Muzammil Hassan",
    slug: "muzammil-hassan",
    email: "muzammil@gmail.com",
    password: "muzammil123",
    category: "blogger",
    bio: "Podcast Host, Digital Media SME and Tech Influencer",
    image:
      "https://pbs.twimg.com/profile_images/1271404071350677504/sDcIb9wO_400x400.jpg",
    reels: "",
  },
  {
    id: "2",
    name: "Hira Attique",
    slug: "hira-attique",
    email: "hira@gmail.com",
    password: "hira123",
    category: "blogger",
    bio: "Pakistani Content Creator, Fashion Blogger, and Influencer",
    image:
      "https://www.pakpedia.pk/files/Image/42ac66faa936100d83f263f006a79686.jpg",
    reels: "",
  },
  {
    id: "3",
    name: "Syed Moiz Balkhi",
    slug: "syed-moiz-balkhi",
    email: "balkhi@gmail.com",
    password: "balkhi123",
    category: "blogger",
    bio: "Pakistani American award winning entrepreneur and a Tech Blogger",
    image:
      "https://syedbalkhi.com/wp-content/uploads/2019/08/syed-wpb-shirt.jpg",
    reels: "",
  },
  {
    id: "4",
    name: "Humna Raza",
    slug: "humna-raza",
    email: "humna@gmail.com",
    password: "humna123",
    category: "blogger",
    bio: "Dentist, Fashion Blogger and part time YouTuber",
    image:
      "https://www.thehandbook.com/cdn-cgi/image/width=300,height=300,fit=cover,q=85/https://files.thehandbook.com/uploads/2021/03/123139742-402367334265209-5750982135070760480-n.jpg",
    reels: "",
  },
  {
    id: "5",
    name: "Maaz Safdar",
    slug: "maaz-safdar",
    email: "maaz@gmail.com",
    password: "maaz123",
    category: "blogger",
    bio: "Pakistani Influencer and a Fashion Blogger",
    image: "https://hamariweb.com/profiles/images/profile/0138-206.jpg",
    reels: "",
  },
  {
    id: "6",
    name: "Neil Patel",
    slug: "neil-patel",
    email: "neil@gmail.com",
    password: "neil123",
    category: "blogger",
    bio: "Co-founder of Hello Bar. Helped companies to grow their revenue",
    image:
      "https://neilpatel.com/wp-content/uploads/2016/02/slideshareneil.png",
    reels: "",
  },
  {
    id: "62f2ba4900c452f512553e67",
    name: "Madiha Imam",
    slug: "madiha-imam",
    email: "madiha@gmail.com",
    password: "madiha123",
    category: "tv",
    bio: "Pakistani VJ-turned-actress and television host",
    image: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/sDXVlcTWfI5dAUKmvA8dEDI6vqR.jpg",
    reels: "",
  },
  {
    id: "8",
    name: "Vasay Chaudhry",
    slug: "vasay-chaudhry",
    email: "vasay@gmail.com",
    password: "vasay123",
    category: "film",
    bio: "Pakistani screenwriter, actor, director, producer, host, and comedian",
    image:
      "https://i.tribune.com.pk/media/images/2238264-vasayy-1591614759/2238264-vasayy-1591614759.jpg",
    reels: "",
  },
  {
    id: "9",
    name: "Imran Ashraf",
    slug: "imran-ashraf",
    email: "imran@gmail.com",
    password: "imran123",
    category: "tv",
    bio: "Pakistani actor and writer, best known for Bhola in Ranjha Ranjha Kardi",
    image:
      "https://www.magtheweekly.com/assets/uploads/updates/2021-12-14/14012_358043_updates.jpg",
    reels: "",
  },
  {
    id: "10",
    name: "Syra Yousuf",
    slug: "syra-yousuf",
    email: "syra@gmail.com",
    password: "syra123",
    category: "film",
    bio: "Pakistani model, tv actress and former VJ",
    image:
      "https://i.tribune.com.pk/media/images/2234440-syra-1591176131/2234440-syra-1591176131.jpg",
    reels: "",
  },
  {
    id: "11",
    name: "Nauman Ijaz",
    slug: "nauman-ijaz",
    email: "nauman@gmail.com",
    password: "nauman123",
    category: "tv",
    bio: "Television & film actor and a TV anchorperson & show presenter",
    image:
      "https://publicbiography.com/public/uploads/8aecffbc45741ba74b7f9a38b06424fb.webp",
    reels: "",
  },
  {
    id: "12",
    name: "Jibran Nasir",
    slug: "jibran-nasir",
    email: "jibran@gmail.com",
    password: "jibran123",
    category: "tv",
    bio: "Pakistani activist who raise voice for protection of minorities",
    image: "https://hamariweb.com/profiles/images/profile/0904-294.jpg",
    reels: "",
  },
  {
    id: "13",
    name: "Vasay Chaudhry",
    slug: "vasay-chaudhry",
    email: "vasay@gmail.com",
    password: "vasay123",
    category: "film",
    bio: "Pakistani screenwriter, actor, director, producer, host, and comedian",
    image:
      "https://i.tribune.com.pk/media/images/2238264-vasayy-1591614759/2238264-vasayy-1591614759.jpg",
    reels: "",
  },
  {
    id: "14",
    name: "Sarwat Gilani",
    slug: "sarwat-gillani",
    email: "sarwat@gmail.com",
    password: "sarwat123",
    category: "film",
    bio: "Pakistani model, film, television and voice actress",
    image:
      "https://i0.wp.com/www.primesworld.com/wp-content/uploads/Sarwat-Gilani-Biography-Height-Age-TV-Serials-Husband-Family-Salary-Net-Worth-Awards-Photos-Facts-More.jpg?resize=1600%2C960&ssl=1",
    reels: "",
  },
  {
    id: "15",
    name: "Bilal Ashraf",
    slug: "bilal-ashraf",
    email: "bilal@gmail.com",
    password: "bilal123",
    category: "film",
    bio: "Pakistani film actor and visual effects director",
    image:
      "https://pakistani.pk/uploads/reviews/photos/thumbnail/200x200c/9a/77/a9/ashrafbilal-50883753-996608377195067-6960332599117679267-n-77-1554108773.jpg",
    reels: "",
  },
  {
    id: "16",
    name: "Kubra Khan",
    slug: "kubra-khan",
    email: "kubra@gmail.com",
    password: "kubra123",
    category: "film",
    bio: "Film and Tv actress of Pakistani industry",
    image: "https://i.dawn.com/large/2021/03/605b0341bb22a.jpg",
    reels: "",
  },
  {
    id: "17",
    name: "Ahmed Ali Butt",
    slug: "ahmed-ali-butt",
    email: "ahmed@gmail.com",
    password: "ahmed123",
    category: "film",
    bio: "Pakistani actor, television host, comedian, singer and songwriter",
    image:
      "https://i.tribune.com.pk/media/images/Ahmed-Butt-weight-loss1611046025-0/Ahmed-Butt-weight-loss1611046025-0.jpg",
    reels: "",
  },
  {
    id: "18",
    name: "Syra Yousuf",
    slug: "syra-yousuf",
    email: "syra@gmail.com",
    password: "syra123",
    category: "film",
    bio: "Pakistani model, tv actress and former VJ",
    image:
      "https://i.tribune.com.pk/media/images/2234440-syra-1591176131/2234440-syra-1591176131.jpg",
    reels: "",
  },
  {
    id: "19",
    name: "Bilal Abbas",
    slug: "bilal-abbas",
    email: "bilal@gmail.com",
    password: "bilal123",
    category: "tv",
    bio: "Versatile actor, works in the Pakistani Drama industry",
    image:
      "https://reviewit.pk/wp-content/uploads/2021/06/bilal-abbas-1-1024x1024.jpg",
    reels: "",
  },
  {
    id: "20",
    name: "Farhan Ally Agha",
    slug: "farhan-ally-agha",
    email: "farhan@gmail.com",
    password: "farhan123",
    category: "tv",
    bio: "Pakistani politician, and voice actor of television serials and films",
    image:
      "https://pbs.twimg.com/profile_images/752449825988304896/10-IS9jN_400x400.jpg",
    reels: "",
  },
  {
    id: "21",
    name: "Ali Abbas",
    slug: "ali-abbas",
    email: "ali@gmail.com",
    password: "ali123",
    category: "tv",
    bio: "Tv and Film actor of Pakistani industry",
    image:
      "https://reviewit.pk/wp-content/uploads/2022/03/ALIABBAS-1-scaled.jpg",
    reels: "",
  },
  {
    id: "22",
    name: "Yumna Zaidi",
    slug: "yumna-zaidi",
    email: "yumna@gmail.com",
    password: "yumna123",
    category: "tv",
    bio: "Leading television actress in Pakistani television industry",
    image: "https://dailytimes.com.pk/assets/uploads/2022/09/07/Yumna-Zaidi-768x521.jpg",
    reels: "",
  },
  {
    id: "23",
    name: "Zaid Ahmed",
    slug: "zaid-ahmed",
    email: "zaid@gmail.com",
    password: "zaid123",
    category: "tv",
    bio: "Television actor, former RJ and a creative manager at PTV World",
    image: "https://thecurrent.pk/wp-content/uploads/2020/04/zahid-ahmed.jpg",
    reels: "",
  },
  {
    id: "24",
    name: "Kinza Hashmi",
    slug: "kinza-hashmi",
    email: "kinza@gmail.com",
    password: "kinza123",
    category: "tv",
    bio: "Television actress and nomiated for a best serial actress",
    image:
      "https://dailytimes.com.pk/assets/uploads/2020/06/14/IMG-20200505-WA0160.jpg",
    reels: "",
  },
  {
    id: "25",
    name: "Madiha Imam",
    slug: "madiha-imam",
    email: "madiha@gmail.com",
    password: "madiha123",
    category: "tv",
    bio: "Pakistani VJ-turned-actress and television host",
    image: "https://i.hipinpakistan.com/large/2017/06/5937da61020ef.png",
    reels: "",
  },
  {
    id: "26",
    name: "Nauman Ijaz",
    slug: "nauman-ijaz",
    email: "nauman@gmail.com",
    password: "nauman123",
    category: "tv",
    bio: "Television & film actor and a TV anchorperson & show presenter",
    image:
      "https://publicbiography.com/public/uploads/8aecffbc45741ba74b7f9a38b06424fb.webp",
    reels: "",
  },
  {
    id: "27",
    name: "Junaid Akram",
    slug: "junaid-akram",
    email: "junaid@gmail.com",
    password: "junaid123",
    category: "youtuber",
    bio: "Youtuber, Blogger, Podcasts Host discuss Culture and Current Affairs",
    image: "https://hamariweb.com/profiles/images/profile/4347-679.jpg",
    reels: "",
  },
  {
    id: "28",
    name: "Umer Khan",
    slug: "umer-khan",
    email: "umer@gmail.com",
    password: "umer123",
    category: "youtuber",
    bio: "Pakistani YouTuber, Vlogger, Photographer and Traveler",
    image:
      "https://1.bp.blogspot.com/-qhxsmeZpsNk/YAHF_iqFGhI/AAAAAAAABkg/dJOHnSX10i0FDSLcuEv21pVJS9pkv2NmgCLcBGAsYHQ/s577/ukhano.png",
    reels: "",
  },
  {
    id: "29",
    name: "Saad ur Rehman",
    slug: "saad-ur-rehman",
    email: "saad@gmail.com",
    password: "saad123",
    category: "youtuber",
    bio: "Pakistani YouTuber, Gamer, and Roaster. Famous as Ducky bhai",
    image:
      "https://pakistantime.net/wp-content/uploads/2021/05/Couple-Of-The-Year-Looks-Like-Ducky-Bhai-Sham.jpg",
    reels: "",
  },
  {
    id: "30",
    name: "Taimoor Salahuddin",
    slug: "taimoor-salahuddin",
    email: "taimoor@gmail.com",
    password: "taimoor123",
    category: "youtuber",
    bio: "YouTuber, Influencer, Filmmaker , Actor, Comedian and Musician",
    image:
      "https://pakistani.pk/uploads/reviews/photos/thumbnail/1500x500s/9c/72/36/Taimoor-Salahuddin-Complete-Information-53-1599593719.jpg",
    reels: "",
  },
  {
    id: "31",
    name: "Shahveer Jafry",
    slug: "shahveer-jafry",
    email: "shahveer@gmail.com",
    password: "shahveer123",
    category: "youtuber",
    bio: "Pakistani Youtuber, Blogger and Sketch-Comedy artist",
    image:
      "https://1.bp.blogspot.com/-gRtDv6fznk8/XooCwWdKA0I/AAAAAAAACgI/IlP-EtIWwLslpm2-6g0w18JDFJkv2nAZgCLcBGAsYHQ/s1600/1623926536934406-c5-1080x1080.jpg",
    reels: "",
  },
];

const TvIcons = () => {

  return (
    <>
      <div className="section-header" style={{ marginTop: "50px" }}>
        TV Icons
      </div>
      <Carousel>
        {allCelebs.filter((celeb) => celeb.category === "tv").map((celeb) => {
          {/* {youtubersData.map((celeb) => { */ }
          return (
            <>
              {/* slider */}

              <Col>
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
}

const FilmIcons = () => {

  return (
    <>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Film Icons
      </div>
      <Carousel>
        {allCelebs.filter((celeb) => celeb.category === "film").map((celeb) => {
          {/* {youtubersData.map((celeb) => { */ }
          return (
            <>
              {/* slider */}

              <Col>
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
}

const Bloggers = () => {

  return (
    <>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Bloggers
      </div>
      <Carousel>
        {allCelebs.filter((celeb) => celeb.category === "blogger").map((celeb) => {
          {/* {youtubersData.map((celeb) => { */ }
          return (
            <>
              {/* slider */}

              <Col>
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
}

const Youtubers = () => {

  return (
    <>
      <div className="section-header" style={{ marginTop: "50px" }}>
        Youtubers
      </div>
      <Carousel>
        {allCelebs.filter((celeb) => celeb.category === "youtuber").map((celeb) => {
          {/* {youtubersData.map((celeb) => { */ }
          return (
            <>
              {/* slider */}

              <Col>
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
}


// const Search = React.memo((props) => {
//   const [data, setData] = useState([]);

//   // return data.filter(data => {
//   //   return data.toLowerCase()
//   // })

//   useEffect(() => {
//     const func = async () => {
//       await axios.get("http://localhost:5000/api/celebs").then((resp) => {
//         return setData(resp.data.celebrities);
//       });
//     };
//     func()
//   }, []);

//   return (
//     <div>
//       <div className="section-header" style={{ marginTop: "50px" }}>
//         Found Results
//       </div>
//       <DashContainer>

//         {data.filter((celeb) => celeb.name === props.celeb).map((celeb) => {
//           return (
//             <>
//               {/* slider */}

//               <Col>
//                 <div className="card" style={{ marginLeft: "50px" }}>
//                   <figure>
//                     <LazyLoadImage
//                       src={celeb.image}
//                       alt="Hotel"
//                       style={{ width: "400px", height: "250px" }}
//                     />
//                   </figure>

//                   <div className="card-body">
//                     {/* <h3 className="card-title">{celeb.name}</h3> */}
//                     <Link to={`/profile/view-as/${celeb.slug}`}>
//                       <h3 className="card-title">{celeb.name}</h3>
//                     </Link>
//                     <p className="card-text">{celeb.bio}</p>
//                   </div>
//                 </div>
//               </Col>
//               {/* slider end */}
//             </>
//           );
//         })}
//         {/* =============================================================================== */}

//       </DashContainer>
//     </div>
//   );
// })

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
      {/* <div>
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
      {/* </div> */}
      {/* {inputText ? <Search celeb={inputText} /> : ""} * /} */}
      < TvIcons />
      <FilmIcons />
      <Bloggers />
      <Youtubers />
    </>
  );
}