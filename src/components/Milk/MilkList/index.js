
import React, { Fragment } from 'react';
import { Typography, ListItem, ListItemText, Divider, ListItemAvatar, Avatar } from '@material-ui/core';

import { ActionIcon } from '../../../core';
import useStyles from './style';

export default ({ milks, customers, firebase, history, onRemoveMilk }) => {
    const classes = useStyles();
    return (
        milks.map(item => (
            <Fragment key={item.uid}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar
                            className={item.milkType === 'BM' ? classes.orange : classes.purple}>
                            {item.milkType}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography className={classes.customerName}
                                component="span"
                                variant="h6"
                                color="textPrimary"
                            >
                                {`${item.customerName}`}
                            </Typography>
                        }
                        secondary={
                            <>
                                <Typography
                                    component="span"
                                >
                                    {item.milk} L,  {item.milkFat} F,   {item.time}
                                </Typography>
                            </>
                        }
                    />
                    <ActionIcon />
                </ListItem>
                <Divider variant="inset" component="li" />
            </Fragment>
        ))
    )

}