import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const sessionsData = [
    {
        Image: "https://i.tribune.com.pk/media/images/2238264-vasayy-1591614759/2238264-vasayy-1591614759.jpg",
        Name: "Vasay Chaudhry",
        desc: " Pakistani screenwriter, actor, director, producer, host, and comedian"
    },
    {
        Image: "https://i0.wp.com/www.primesworld.com/wp-content/uploads/Sarwat-Gilani-Biography-Height-Age-TV-Serials-Husband-Family-Salary-Net-Worth-Awards-Photos-Facts-More.jpg?resize=1600%2C960&ssl=1",
        Name: "Sarwat Gilani",
        desc: "Pakistani model, film, television and voice actress."
    },
    {
        Image: "https://pakistani.pk/uploads/reviews/photos/thumbnail/200x200c/9a/77/a9/ashrafbilal-50883753-996608377195067-6960332599117679267-n-77-1554108773.jpg",
        Name: "Bilal Ashraf",
        desc: "Pakistani film actor and visual effects director"
    },
    {
        Image: "https://i.dawn.com/large/2021/03/605b0341bb22a.jpg",
        Name: "Kubra Khan",
        desc: "Film and Tv actress of Pakistani industry"
    },
    {
        Image: "https://i.tribune.com.pk/media/images/Ahmed-Butt-weight-loss1611046025-0/Ahmed-Butt-weight-loss1611046025-0.jpg",
        Name: "Ahmed Ali Butt",
        desc: "Pakistani actor, television host, comedian, singer and songwriter"
    },
    {
        Image: "https://i.tribune.com.pk/media/images/2234440-syra-1591176131/2234440-syra-1591176131.jpg",
        Name: "Syra Yousuf",
        desc: "Pakistani model, tv actress and former VJ"
    },
];
export default function CategoriesCard() {
    return (
        <>
            <div class="section-header" style={{ height: "50px", marginTop: "40px", marginLeft: "90px" }}>
                Film Icons
            </div>

            <Grid container >
                {/* {Array.from(Array(6)).map((_, index) => ( */}
                {sessionsData.map((index) => (
                    <Grid item xs={4} m="auto" pt={3} px={3} key={index} align='center' padding="90px" >
                        <Card sx={{ maxWidth: 500, maxHeight: 'auto', marginTop: "-60px" }}>
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