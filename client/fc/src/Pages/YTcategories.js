import { Card, CardContent, CardMedia, Typography, Grid } from "./imports";
import { useEffect, useState } from "react"
import React from "react";
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
        Youtubers
      </div>
      <Grid container>
        {data.filter((index) => index.category === "youtuber")
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
                    sx={{ width: 500, maxHeight: 450, minHeight: 300 }}
                    component="img"
                    height="120"
                    image={index.image}
                    alt="green iguana"
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
