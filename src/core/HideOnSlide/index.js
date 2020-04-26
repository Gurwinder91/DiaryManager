
import React from 'react';
import { Slide, useScrollTrigger } from '@material-ui/core';

export default (props) => {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {props.children}
        </Slide>
    )
}