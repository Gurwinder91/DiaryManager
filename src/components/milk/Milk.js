
import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { compose } from 'recompose';

import { Typography, ListItem, ListItemText, Divider, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withFirebase } from '../Firebase';

import { MyList, AddCircleIcon, MyConfirmDialog } from '../../core';

class Milk extends Component {
    state = {
        milk: [],
        openConfirmDialog: false,
        selectedMilk: {}
    }

    componentDidMount() {
        this.props.firebase.milks().on('value', snapshot => {
            const milksObject = snapshot.val();
            let milksList = [];
            if (milksObject) {
                milksList = Object.keys(milksObject).map(key => ({
                    ...milksObject[key],
                    id: key
                }));
            }

            this.setState({ milk: milksList })
        });
    }

    componentWillUnmount() {
        this.props.firebase.milks().off();
    }

    navigateTo = (to) => {
        this.props.history.push(`/milk/${to}/`);
    }


    deleteIconClickHandler = (id) => {
        const milks = [...this.state.milk];
        const milk = milks.find(m => m.id === id);
        this.setState({ selectedMilk: milk, openConfirmDialog: true });
    }

    deleteMilkEntry = () => {
        const selectedMilk = this.state.selectedMilk;
        const milk = [...this.state.milk];

        const requiredMilk = milk.filter(m => m.id !== selectedMilk.id);
        this.setState({ milk: requiredMilk })
    }

    dialogClosedHandler = (state, value) => {
        console.log(state, value);
        this.setState({ openConfirmDialog: false });
        if (state === 'ok') {
            this.deleteMilkEntry();
        }
    }

    getList() {
        return (
            this.state.milk.map(item => (
                <Fragment key={item.id}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography
                                        component="span"
                                        variant="h6"
                                        color="textPrimary"
                                    >
                                        {`${item.customerName}`}
                                    </Typography>
                                    <div>
                                        <IconButton edge="end" aria-label="edit" style={{ marginRight: 5, padding: 0 }}
                                            onClick={this.navigateTo.bind(this, `edit/${item.id}`)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" style={{ marginRight: 5, padding: 0 }}
                                            onClick={this.deleteIconClickHandler.bind(this, item.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            }
                            secondary={
                                <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>
                                        <Typography
                                            component="span"
                                            variant="body1"
                                            color="textPrimary"
                                            style={{ display: 'block' }}
                                        >
                                            {`Milk - ${item.milk} Litres`}
                                        </Typography>
                                        <Typography
                                            component="span"
                                            variant="body1"
                                            color="textPrimary"
                                        >
                                            {`Fat - ${item.milkFat}`}
                                        </Typography>
                                    </span>
                                    <span>
                                        <Typography
                                            component="span"
                                            variant="body1"
                                            color="textPrimary"
                                            style={{ display: 'block' }}
                                        >
                                            {item.date}
                                        </Typography>
                                        <Typography
                                            component="span"
                                            variant="body1"
                                            color="textPrimary"
                                        >
                                            {item.time}
                                        </Typography>
                                    </span>

                                </span>
                            }
                        />

                    </ListItem>
                    <Divider variant="inset" component="li" />
                </Fragment>
            ))
        )
    }
    render() {
        return (
            <>
                <MyList>
                    {this.getList()}
                    <AddCircleIcon whenClicked={this.navigateTo.bind(this, 'add')} />
                </MyList>
                <MyConfirmDialog
                    maxWidth="xs"
                    dialogOk={this.dialogClosedHandler.bind(this, 'ok')}
                    dialogCancel={this.dialogClosedHandler.bind(this, 'cancel')}
                    open={this.state.openConfirmDialog}>

                    <Typography variant="body1" component="div" color="textPrimary">
                        Are you sure want to remove&nbsp;
                        <Typography variant="h6" component="span">
                            {this.state.selectedMilk.customerName}
                        </Typography>
                        &nbsp;milk?
                    </Typography>

                </MyConfirmDialog>
            </>
        )
    }
}


export default compose(
    withRouter,
    withFirebase
)(Milk);