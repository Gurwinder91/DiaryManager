import React, { Fragment } from 'react';
import { Divider, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@material-ui/core';

import useStyles from './style';
import { ActionIcon, MyConfirmDialog } from '../../../core';
import * as ROUTES from '../../../constants/routes';

export default ({ customers, history, firebase, onRemoveCustomer }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [dialogValue, setDialogValue] = React.useState('');

    const removeCustomer = (uid) => {
        firebase.customers().child(uid).remove()
            .then(() => onRemoveCustomer(uid))
    }

    const onMenuclosed = (customer, actionType) => {
        switch (actionType) {
            case 'delete':
                setOpen(true);
                setDialogValue(customer);
                break;
            case 'edit':
                history.push(`${ROUTES.CUSTOMER_URLS.customer}${ROUTES.CUSTOMER_URLS.edit}${customer.uid}`);
                break;
            default:
                break;
        }
    }

    const dialogClosedHandler = (output) => {
        setOpen(false);
        if (output) {
            removeCustomer(output.uid);
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
                            secondary={`+91 ${customer.phoneNumber}, ${customer.registeredDate}`}
                        />
                        <ActionIcon whenMenuClosed={onMenuclosed.bind(this, customer)} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </Fragment>
            )}
            <MyConfirmDialog
                onDialogClose={dialogClosedHandler}
                data={dialogValue}
                open={open}>
            </MyConfirmDialog>
        </>
    )
}


