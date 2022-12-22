import { React, Grid, Typography, CardMedia, Card, CardContent } from "./imports"

const sessionsData = [
  {
    Image:
      "https://pbs.twimg.com/profile_images/1271404071350677504/sDcIb9wO_400x400.jpg",
    Name: "Muzammil Hassan",
    desc: "Podcast Host, Digital Media SME and Tech Influencer",
  },
  {
    Image:
      "https://media-exp1.licdn.com/dms/image/C4E03AQGWkGzELcjQKQ/profile-displayphoto-shrink_800_800/0/1544050156624?e=1665619200&v=beta&t=Vw_eQi5RzQrYXtkNc0NUKQOZejiWqoyKUF-bz3YqYRI",
    Name: "Hira Attique",
    desc: "Pakistani Content Creator, Fashion Blogger, and Influencer",
  },
  {
    Image:
      "https://syedbalkhi.com/wp-content/uploads/2019/08/syed-wpb-shirt.jpg",
    Name: "Syed Moiz Balkhi",
    desc: " Pakistani American award winning entrepreneur and a Tech Blogger",
  },
  {
    Image:
      "https://www.thehandbook.com/cdn-cgi/image/width=300,height=300,fit=cover,q=85/https://files.thehandbook.com/uploads/2021/03/123139742-402367334265209-5750982135070760480-n.jpg",
    Name: "Humna Raza",
    desc: "Dentist, Fashion Blogger and part time YouTuber",
  },
  {
    Image: "https://hamariweb.com/profiles/images/profile/0138-206.jpg",
    Name: "Maaz Safdar",
    desc: "Pakistani Influencer and a Fashion Blogger",
  },
  {
    Image:
      "https://neilpatel.com/wp-content/uploads/2016/02/slideshareneil.png",
    Name: "Neil Patel",
    desc: "Co-founder of Hello Bar. Helped companies to grow their revenue",
  },
];
export default function CategoriesCard() {
  return (
    <>
      <div
        class="section-header"
        style={{ height: "50px", marginTop: "40px", marginLeft: "90px" }}
      >
        Bloggers
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
