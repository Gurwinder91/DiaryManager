
import React, { Fragment } from 'react';
import { Typography, ListItem, ListItemText, Divider, ListItemAvatar, Avatar, Chip, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { firestoreConnect } from 'react-redux-firebase';

import { ActionIcon, MyConfirmDialog } from '../../../core';
import useStyles from './style';
import * as ROUTES from '../../../constants/routes';
import { removeMilk } from '../../../actions/milk';

const MilkList = ({ customers, milks, removeMilk }) => {

    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [dialogValue, setDialogValue] = React.useState({});

    const onMenuclosed = (milk, actionType) => {
        switch (actionType) {
            case 'delete':
                setOpen(true);
                setDialogValue(milk);
                break;
            case 'edit':
                history.push(`${ROUTES.MILK_URLS.milk}${ROUTES.MILK_URLS.edit}${milk.id}`, { childRoute: true });
                break;
            default:
                break;
        }
    }

    const dialogClosedHandler = (output) => {
        setOpen(false);
        if (output) {
            removeMilk(output.id);
        }
    }

    const getClassName = (milkType) => {
        switch (milkType) {
            case 'BM':
                return classes.orange;
            case 'CM':
                return classes.purple;
            default:
                return classes.teal;
        }
    }

    const getCustomerName = (customerId) => {
        return customers ? customers[customerId].customerName : '';
    }

    return (
        <>
            {
                milks.map(item => (
                    <Fragment key={item.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={`${classes.largeAvatar} ${getClassName(item.milkType)}`}>
                                    {item.milkType}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                disableTypography
                                primary={
                                    <div className={classes.contentSection}>
                                        <Typography className={classes.customerName}
                                            component="span"
                                            variant="h6"
                                            color="textPrimary"
                                        >
                                            {`${getCustomerName(item.customerId)}`}
                                        </Typography>

                                        <Typography component="span" className={classes.time}
                                            variant="body2"
                                            color="textSecondary">
                                            {item.time}
                                        </Typography>
                                    </div>

                                }
                                secondary={
                                    <div className={classes.contentSection}>
                                        <div className={classes.chips}>
                                            <Chip label={`${item.milkQuantity} L`} />
                                            <Chip label={`${item.milkFat} F`} />
                                            <Chip label={`Rs ${item.milkPrice}`} />
                                        </div>
                                        <ActionIcon whenMenuClosed={onMenuclosed.bind(this, item)} icon={<ExpandMoreIcon />} />
                                    </div>

                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </Fragment>
                ))
            }
            <MyConfirmDialog
                onDialogClose={dialogClosedHandler}
                open={open}
                data={dialogValue}>
            </MyConfirmDialog>
        </>
    )

}

const mapStateToProps = state => ({
    customers: state.firestore.data.customers,
})
const mapDispatchToProps = dispatch => ({
    removeMilk: (id) => dispatch(removeMilk(id))
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps),
    firestoreConnect([
        { collection: 'customers' },
    ])
)(MilkList);
