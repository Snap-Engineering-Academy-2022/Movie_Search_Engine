import { Card, CardContent, CardHeader, CardMedia, Typography, CardActionArea } from "@mui/material";
import React from "react";

export default function Movie(props){
    return (
        <Card sx={{ maxWidth: 345, mt: 8}}>
            <CardActionArea
                // onClick={() => console.log("Hello")}
                >
            <CardMedia
                component='img'
                height='350px'
                image={props.pic}
                alt='movie image'
            />
            <CardHeader 
                title={props.title}
                titleTypographyProps={{align: 'center'}}
                sx={{ mt: 1}}
            />
            <CardContent 
                sx={{ pt: 0}}>
                <ul>
                    <Typography component='li'>
                        Published: {props.year}
                    </Typography>
                </ul>
            </CardContent>
            </CardActionArea>
        </Card>
    )
}
