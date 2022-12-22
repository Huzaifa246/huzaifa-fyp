import { Grid, Typography, CardMedia, Card, CardContent, Button, CardActions } from "./imports"

const sessionsData = [
    {
        Name: "Hero",
        Image: "https://assets.change.org/photos/3/pz/ur/IZPZUrJczRxOpDB-400x400-noPad.jpg?1528808989",
        desc: "DECRIPTION 1",
    },
    {
        Name: "Hero1",
        Image: "https://assets.change.org/photos/3/pz/ur/IZPZUrJczRxOpDB-400x400-noPad.jpg?1528808989",
        desc: "DECRIPTION 2",
    },
    {
        Name: "Hero2",
        Image: "https://assets.change.org/photos/3/pz/ur/IZPZUrJczRxOpDB-400x400-noPad.jpg?1528808989",
        desc: "DECRIPTION 3",
    }, {
        Name: "Hero",
        Image: "https://assets.change.org/photos/3/pz/ur/IZPZUrJczRxOpDB-400x400-noPad.jpg?1528808989",
        desc: "DECRIPTION 4",
    }, {
        Name: "Hero",
        Image: "https://assets.change.org/photos/3/pz/ur/IZPZUrJczRxOpDB-400x400-noPad.jpg?1528808989",
        desc: "DECRIPTION 5",
    }, {
        Name: "Hero",
        Image: "https://assets.change.org/photos/3/pz/ur/IZPZUrJczRxOpDB-400x400-noPad.jpg?1528808989",
        desc: "DECRIPTION 6",
    },
    {
        Name: "Hero",
        Image: "https://assets.change.org/photos/3/pz/ur/IZPZUrJczRxOpDB-400x400-noPad.jpg?1528808989",
        desc: "DECRIPTION 7",
    },
    {
        Name: "Hero1",
        Image: "https://assets.change.org/photos/3/pz/ur/IZPZUrJczRxOpDB-400x400-noPad.jpg?1528808989",
        desc: "DECRIPTION 8",
    },
    {
        Name: "Hero2",
        Image: "https://assets.change.org/photos/3/pz/ur/IZPZUrJczRxOpDB-400x400-noPad.jpg?1528808989",
        desc: "DECRIPTION 9",
    },
];
export default function CategoriesCard() {
    return (
        <>

            <Grid container >
                {/* {Array.from(Array(12)).map((_, index) => ( */}
                {sessionsData.map((index) => (
                    <Grid item xs={4} m="auto" pt={3} px={3} key={index} align='center' padding="90px" >
                        <Card sx={{ maxWidth: 500 , maxHeight: 'auto'}}>
                            <CardMedia
                               sx={{ width: "auto", height: "auto"}}
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
                            <CardActions style={{justifyContent: 'center'}}>
                                <Button size="small">Book Now</Button>
                                <Button size="small">$24/hours⚡</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}