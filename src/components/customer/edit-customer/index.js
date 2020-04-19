
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withFirebase } from '../../Firebase';
import CustomerForm from '../customer-form';
import * as ACTIONS from '../../../actions';

class EditCustomer extends Component {

    componentDidMount() {
        const uid = this.props.match.params.uid;
        this.props.firebase.customers()
            .child(uid)
            .on('value', snapshot => {
                this.props.onSetCustomer(
                    snapshot.val(),
                    uid,
                );
            });
    }

    componentWillUnmount() {
        this.props.firebase.customers().off();
    }

    render = () => {
        return (
            <>
                <Typography variant="h4" align="center">
                    Edit Customer
                </Typography>
                <CustomerForm customer={this.props.customer} uid={this.props.match.params.uid} />
            </>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        customer: state.customerState.customers[props.match.params.uid]
    }
}

const mapDispatchToProps = dispatch => ({
    onSetCustomer: (customer, uid) => dispatch({ type: ACTIONS.CUSTOMER_SET, customer, uid })
})

export default compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(EditCustomer)

