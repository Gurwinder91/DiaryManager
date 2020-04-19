import React, { Fragment } from 'react';
import { Divider, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@material-ui/core';

import useStyles from './style';
import { ActionIcon, MyConfirmDialog } from '../../../core';
import * as ROUTES from '../../../constants/routes';

export default ({ customers, history, firebase, onRemoveCustomer }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedCustomer, setSelectedCustomer] = React.useState({});

    const removeCustomer = (uid) => {
        firebase.customers().child(uid).remove()
            .then(() => onRemoveCustomer(uid))
    }

    const onMenuclosed = (customer, actionType) => {
        switch (actionType) {
            case 'delete':
                setOpen(true);
                setSelectedCustomer(customer);
                break;
            case 'edit':
                history.push(`${ROUTES.CUSTOMER_URLS.customer}${ROUTES.CUSTOMER_URLS.edit}${customer.uid}`);
                break;
            default:
                break;
        }
    }

    const dialogClosedHandler = (state, value) => {
        setOpen(false);
        if (state === 'ok') {
            removeCustomer(selectedCustomer.uid);
        }
    }

    return (
        <>
            {customers.map(customer =>
                <Fragment key={customer.uid}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="No Image" src={customer.image}
                                className={classes.largeAvatar} >
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText className={classes.listItemText}
                            primary={
                                <Typography
                                    component="span"
                                    variant="h6"
                                    color="textPrimary"
                                >
                                    {`${customer.customerName}`}
                                </Typography>
                            }
                            secondary={`+91 ${customer.phoneNumber}, ${new Date(customer.registeredDate).toLocaleDateString()}`}
                        />
                        <ActionIcon whenMenuClosed={onMenuclosed.bind(this, customer)} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </Fragment>
            )}
            <MyConfirmDialog
                maxWidth="xs"
                dialogOk={dialogClosedHandler.bind(this, 'ok')}
                dialogCancel={dialogClosedHandler.bind(this, 'cancel')}
                open={open}>

                <Typography variant="body1" component="div" color="textPrimary">
                    Are you sure want to remove&nbsp;
                        <Typography variant="h6" component="span">
                        {selectedCustomer.customerName}
                    </Typography>?
                    </Typography>
            </MyConfirmDialog>
        </>
    )
}



