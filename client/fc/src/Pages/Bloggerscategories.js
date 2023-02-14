import { React, Grid, Typography, CardMedia, Card, CardContent } from "./imports"
import { useEffect, useState } from "react"
import axios from "axios";


export default function CategoriesCard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const func = async () => {
      await axios.get("http://localhost:5000/api/celebs").then((resp) => {
        return setData(resp.data.celebrities);
      });
    };
    func();
  }, []);
  return (
    <>
      <div
        class="section-header"
        style={{ height: "50px", marginTop: "40px", marginLeft: "90px" }}
      >
        Bloggers
      </div>
      <Grid container>
        {data.filter((index) => index.category === "blogger")
          .map((index) => {
            return (
              <Grid
                item
                sm={4}
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
                    sx={{ width: 500, maxHeight: 500, minHeight: 300 }}
                    component="img"
                    image={index.image}
                    alt="Bloggers"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {index.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {index.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}
