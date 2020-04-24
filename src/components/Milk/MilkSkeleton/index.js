import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import { MyListSkeleton } from "../../../core";

export default () => {
    return (
        <>
            <Skeleton animation="wave" variant="text" width="100%" height="20px" />
            <Skeleton animation="wave" variant="text" width="50%" height="20px" style={{ marginBottom: 10 }} />
            <Skeleton animation="wave" variant="rect" width="100%" height="120px" style={{ marginBottom: 20 }} />
            <MyListSkeleton  count="6"/>
        </>
    )
}