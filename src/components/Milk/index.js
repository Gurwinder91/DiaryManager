
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';

import { withFirebase } from '../Firebase';
import AddMilk from './AddMilk';
import EditMilk from './EditMilk';
import MilkList from './MilkList';
import { MyList, AddCircleIcon, MyConfirmDialog } from '../../core';
import * as ACTIONS from '../../actions';
import { MyObject } from '../../utilty';

class MilkBase extends Component {
    state = {
        openConfirmDialog: false,
        selectedMilk: {}
    }

    componentDidMount() {
        this.props.firebase.milks().on('value', snapshot => {
            this.props.onSetMilks(snapshot.val())
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


    render() {
        return (
            <>
                <MyList>
                    <MilkList
                        milks={this.props.milks}
                        customers={this.props.customers}
                        firebase={this.props.firebase}
                        history={this.props.history}
                        onRemoveMilk={this.props.onRemoveMilk}
                         />
                </MyList>
                <AddCircleIcon whenClicked={this.navigateTo.bind(this, 'add')} />
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

const mapStateToProps = state => ({
    milks: new MyObject(state.milkState.milks).toArray()
})

const mapDispatchToProps = dispatch => ({
    onSetMilks: (milks) => dispatch({ type: ACTIONS.MILKS_SET, milks }),
    onRemoveMilk: (uid) => dispatch({ type: ACTIONS.MILK_REMOVE, uid })
})

const Milk = compose(
    withRouter,
    withFirebase,
    connect(
        mapStateToProps,
        mapDispatchToProps)
)(MilkBase);

export { Milk, AddMilk, EditMilk };