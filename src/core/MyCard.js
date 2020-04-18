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
                    alt="no image"
                    height="140"
                    image={props.image}
                    title="Customer Image"
                />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {`${props.customerName}`}
                </Typography>
                <Typography gutterBottom component="h5">
                    {props.email}
                </Typography>
                <Typography gutterBottom component="h5">
                    {props.milkType}
                </Typography>
                <Typography gutterBottom component="h5">
                    {props.phoneNumber}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.address}
                </Typography>
            </CardContent>
        </Card>
    )
}


