import { React, Card, CardContent, CardMedia, Typography, Grid } from "./imports";
const sessionsData = [
  {
    Image: "https://hamariweb.com/profiles/images/profile/4347-679.jpg",
    Name: "Junaid Akram",
    desc: "Youtuber, Blogger, Podcasts Host discuss Culture and Current Affairs",
  },
  {
    Image:
      "https://1.bp.blogspot.com/-qhxsmeZpsNk/YAHF_iqFGhI/AAAAAAAABkg/dJOHnSX10i0FDSLcuEv21pVJS9pkv2NmgCLcBGAsYHQ/s577/ukhano.png",
    Name: "Umer Khan",
    desc: "Pakistani YouTuber, Vlogger, Photographer and Traveler",
  },
  {
    Image:
      "https://pakistantime.net/wp-content/uploads/2021/05/Couple-Of-The-Year-Looks-Like-Ducky-Bhai-Sham.jpg",
    Name: "Saad ur Rehman",
    desc: "Pakistani YouTuber, Gamer, and Roaster. Famous as Ducky bhai",
  },
  {
    Image:
      "https://pakistani.pk/uploads/reviews/photos/thumbnail/1500x500s/9c/72/36/Taimoor-Salahuddin-Complete-Information-53-1599593719.jpg",
    Name: "Taimoor Salahuddin",
    desc: "YouTuber, Influencer, Filmmaker , Actor, Comedian and Musician.",
  },
  {
    Image:
      "https://1.bp.blogspot.com/-gRtDv6fznk8/XooCwWdKA0I/AAAAAAAACgI/IlP-EtIWwLslpm2-6g0w18JDFJkv2nAZgCLcBGAsYHQ/s1600/1623926536934406-c5-1080x1080.jpg",
    Name: "Shahveer Jafry",
    desc: "Pakistani Youtuber, Blogger and Sketch-Comedy artist",
  },
  // {
  //     id: 6,
  //     url: "",
  //     title: "",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate nisi accusamus quos molestias!"
  // },
];
export default function CategoriesCard() {
  return (
    <>
      <div
        class="section-header"
        style={{ height: "50px", marginTop: "40px", marginLeft: "90px" }}
      >
        Youtubers
      </div>
      <Grid container>
        {/* {Array.from(Array(6)).map((_, index) => ( */}
        {sessionsData.map((index) => (
          <Grid
            item
            xs={4}
            m="auto"
            pt={3}
            px={3}
            key={index}
            align="center"
            padding="90px"
            marginTop="-60px"
          >
            <Card sx={{ maxWidth: 500, maxHeight: "auto" }}>
              <CardMedia
                sx={{ width: 500, height: 250 }}
                component="img"
                height="120"
                image={index.Image}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {index.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {index.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
