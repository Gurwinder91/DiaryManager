import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import styles from './style';

const createArrayFromCount = (count) => {
    if (count) {
        return [...Array(+count).keys()]
    }
    return [...Array(9).keys()]
}


export default function MyListSkeleton({ count }) {
    const classes = styles();
    return (
        createArrayFromCount(count).map((item) =>
            <div className={classes.root} key={item}>
                <Skeleton animation="wave" variant="circle" width={80} height={60}
                    style={{ marginRight: 20 }} />
                <div style={{ width: '100%' }}>
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="40%" />
                </div>
            </div >
        )
    )
}