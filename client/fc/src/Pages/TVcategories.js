import { React, Card, CardContent, CardMedia, Typography, Grid } from "./imports";

const sessionsData = [
  {
    Image:
      "https://reviewit.pk/wp-content/uploads/2021/06/bilal-abbas-1-1024x1024.jpg",
    Name: "Bilal Abbas",
    desc: "Versatile actor, works in the Pakistani Drama industry",
  },
  {
    Image:
      "https://pbs.twimg.com/profile_images/752449825988304896/10-IS9jN_400x400.jpg",
    Name: "Farhan Ally Agha",
    desc: "Pakistani politician, and voice actor of television serials and films",
  },
  {
    Image:
      "https://reviewit.pk/wp-content/uploads/2022/03/ALIABBAS-1-scaled.jpg",
    Name: "Ali Abbas",
    desc: "Tv and Film actor of Pakistani industry",
  },
  {
    Image: "https://cutacut.com/wp-content/uploads/2020/10/Yumna-Zaidi.jpg",
    Name: "Yumna Zaidi",
    desc: "Leading television actress in Pakistani television industry",
  },
  {
    Image: "https://thecurrent.pk/wp-content/uploads/2020/04/zahid-ahmed.jpg",
    Name: "Zaid Ahmed",
    desc: "Television actor, former RJ and a creative manager at PTV World",
  },
  {
    Image:
      "https://dailytimes.com.pk/assets/uploads/2020/06/14/IMG-20200505-WA0160.jpg",
    Name: "Kinza Hashmi",
    desc: "Television actress and nomiated for a best serial actress ",
  },
  {
    Image: "https://i.hipinpakistan.com/large/2017/06/5937da61020ef.png",
    Name: "Madiha Imam",
    desc: "Pakistani VJ-turned-actress and television host",
  },
  {
    Image:
      "https://www.magtheweekly.com/assets/uploads/updates/2021-12-14/14012_358043_updates.jpg",
    Name: "Imran Ashraf",
    desc: "Pakistani actor and writer, best known for Bhola in Ranjha Kardi",
  },
  {
    Image:
      "https://publicbiography.com/public/uploads/8aecffbc45741ba74b7f9a38b06424fb.webp",
    Name: "Nauman Ijaz",
    desc: "Television & film actor and a TV anchorperson & show presenter",
  },
];
export default function CategoriesCard() {
  return (
    <>
      <div class="section-header" style={{ height: "50px", marginTop:"40px", marginLeft:"90px" }}>
        Tv Personalities
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
