import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flex: '1 1 20%',
        [theme.breakpoints.only('sm')]: {
            flex: '1 1 40%'
        },
        [theme.breakpoints.down('xs')]: {
            flex: '1 1 100%'
        }
    }
}))

export const MyCard = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={props.avatar}
                    title="Contemplative Reptile"
                />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {`${props.first_name} ${props.last_name}`}
                </Typography>
                <Typography gutterBottom component="h5">
                    {props.email}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                </Typography>
            </CardContent>
        </Card>
    )
}


