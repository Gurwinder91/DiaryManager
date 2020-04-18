import React, {Fragment } from 'react';
import { Divider, ListItem, ListItemAvatar, Avatar, ListItemText, Typography} from '@material-ui/core';

import styles from './style';

const handleListItemClick = (uid, event) => {
    console.log(uid, event)
}

const CustomersList = ({ customers }) => {
    const classes = styles();
    return (
        customers.map(customer =>
            <Fragment key={customer.uid}>
                <ListItem
                    button
                    selected={customers.selected}
                    onClick={handleListItemClick.bind(this, customer.uid)}>
                    <ListItemAvatar>
                        <Avatar alt="No Image" src={customer.image} className={classes.largeAvatar}>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className={classes.listItemText}
                        primary={
                            <div className={classes.primary}>
                                <Typography className={classes.customerName}
                                    component="span"
                                    variant="h6"
                                    color="textPrimary"
                                >
                                    {`${customer.customerName}`}
                                </Typography>
                                <Typography
                                    className={classes.dateText}
                                    component="span"
                                >
                                    {new Date(customer.dateofbirth).toLocaleDateString()}
                                </Typography>
                            </div>
                        }
                        secondary={`Phone Number: ${customer.phoneNumber}`}
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </Fragment>
        ))
}

export default CustomersList;