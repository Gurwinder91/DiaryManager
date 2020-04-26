
import React, { Fragment } from 'react';
import { Typography, ListItem, ListItemText, Divider, ListItemAvatar, Avatar, Chip, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { withFirebase } from '../../Firebase';
import { ActionIcon, MyConfirmDialog } from '../../../core';
import useStyles from './style';
import * as ROUTES from '../../../constants/routes';
import * as ACTIONS from '../../../actions';

const MilkList = ({customers,  milks, firebase, onRemoveMilk, date }) => {

    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [dialogValue, setDialogValue] = React.useState({});

    const removeMilkEntry = (uid) => {
        firebase.milks().child(date).child(uid).remove()
            .then(() => onRemoveMilk(date, uid))
    }

    const onMenuclosed = (milk, actionType) => {
        switch (actionType) {
            case 'delete':
                setOpen(true);
                setDialogValue(milk);
                break;
            case 'edit':
                history.push(`${ROUTES.MILK_URLS.milk}${ROUTES.MILK_URLS.edit}${date}/${milk.uid}`, { childRoute: true });
                break;
            default:
                break;
        }
    }

    const dialogClosedHandler = (output) => {
        setOpen(false);
        if (output) {
            removeMilkEntry(output.uid);
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

    const getCustomerName = (customerId) => Object.keys(customers).length ? customers[customerId].customerName : '';

    return (
        <>
            {
                milks.map(item => (
                    <Fragment key={item.uid}>
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
    customers: state.customerState.customers,
})

const mapDispatchToProps = dispatch => ({
    onRemoveMilk: (date, uid) => dispatch({ type: ACTIONS.MILK_REMOVE, date, uid })
})

export default compose(
    withFirebase,
    connect(
        mapStateToProps,
        mapDispatchToProps)
)(MilkList);
