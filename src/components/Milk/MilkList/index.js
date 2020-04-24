
import React, { Fragment } from 'react';
import { Typography, ListItem, ListItemText, Divider, ListItemAvatar, Avatar, Chip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withFirebase } from '../../Firebase';
import { ActionIcon, MyConfirmDialog } from '../../../core';
import useStyles from './style';
import * as ROUTES from '../../../constants/routes';
import * as ACTIONS from '../../../actions';

const MilkList = ({ milks, firebase, onRemoveMilk }) => {

    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [dialogValue, setDialogValue] = React.useState({});

    const removeMilkEntry = (uid) => {
        firebase.milks().child(uid).remove()
            .then(() => onRemoveMilk(uid))
    }

    const onMenuclosed = (milk, actionType) => {
        switch (actionType) {
            case 'delete':
                setOpen(true);
                setDialogValue(milk);
                break;
            case 'edit':
                history.push(`${ROUTES.MILK_URLS.milk}${ROUTES.MILK_URLS.edit}${milk.uid}`);
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
                                    <Typography className={classes.customerName}
                                        component="span"
                                        variant="h6"
                                        color="textPrimary"
                                    >
                                        {`${item.customerName}`}
                                    </Typography>
                                }
                                secondary={
                                    <div>
                                        <Chip label={`${item.milkQuantity} L`} className={classes.milkQuantityChip} />
                                        <Chip label={`${item.milkFat} F`} className={classes.chip} />
                                        <Chip label={item.time} className={classes.chip} />
                                    </div>
                                }
                            />
                            <ActionIcon whenMenuClosed={onMenuclosed.bind(this, item)} />
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

const mapDispatchToProps = dispatch => ({
    onRemoveMilk: (uid) => dispatch({ type: ACTIONS.MILK_REMOVE, uid })
})

export default compose(
    withFirebase,
    connect(
        null,
        mapDispatchToProps)
)(MilkList);
