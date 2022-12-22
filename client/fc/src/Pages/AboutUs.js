import { React, Grid, about1, about2, about3 ,styled} from "./imports"
import "./CSS/AboutUs.css";
function AboutUs() {
  const aboutUs_data = [
    {
      id: 1,
      name: "Huzaifa Rehman",
      title: "Chief Operating Officer",
      description:
        "Manages and handles the daily business operations of the company",
      email: "huzaifa@gmail.com",
      image: about1,
    },
    {
      id: 2,
      name: "Nihal Sarwar",
      title: "Chief Executing Officer",
      description:
        "Leads a team of executives and manages company primary goals and objectives",
      email: "nihal17@gmail.com",
      image: about2,
    },
    {
      id: 3,
      name: "Shehmeer Ashfaq",
      title: "Chief Technology Officer",
      description:
        "Leads the technology and manages the company's technology resources",
      email: "ShemmerDsu@gmail.com",
      image: about3,
    },
  ];

  const Title = styled.p`
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 15px;
  font-weight: bold;
  margin: 10px 0px 10px 20px; /* Tweak this to your liking (also add padding) */
  letter-spacing: 3px;
  `
  const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
  width: 310px;
  `

  return (
    <>
      <div className="container">
        {/* <!--Page Title--> */}
        <div className="page section-header" style={{ marginTop: "20px" }}>
          <div className="about-section">
            <h1 className="page-width">About Team</h1>
          </div>
        </div>
        {/* End page title */}
        <div className="container">
          <div>
            <h2 style={{ fontWeight: "bold", fontSize: "40px" }}>Meet The Founders</h2>
            <h5 style={{ textAlign: "center" }}>The immensely talented team at FanClub is backed up by the following individuals</h5>
          </div>
          {aboutUs_data.map((slide) => (
            <div className="column" style={{ marginTop: "30px" }}>
              <Card style={{ marginLeft: "60px" }}>
                <img
                  className="blur-up lazyload"
                  src={slide.image}
                  alt="About Us"
                  style={{ height: "350px" }}
                />
                <div className="container" style={{ height: "170px" }}>
                  <h2 style={{ marginTop: "20px" }}>{`${slide.name}`}</h2>
                  <Title>{`${slide.title}`}</Title>
                  <p>{`${slide.description}`}</p>
                  <Grid
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                    gap={2}
                  >
                  </Grid>
                  <p>
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}

export default AboutUs;
