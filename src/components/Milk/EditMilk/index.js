import React from 'react';

import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { compose } from 'recompose';
import moment from 'moment';

import * as ACTIONS from '../../../actions';
import MilkForm from '../MilkForm';
import { withFirebase } from '../../Firebase';
import { withAuthorization } from '../../Session';

const EditMilk = ({ firebase, match, onSetMilk, milk }) => {

    React.useEffect(() => {
        let uid = match.params.uid;
        let date = match.params.date;
        firebase.milks()
            .child(date)
            .child(uid)
            .on('value', snapshot => {
                onSetMilk(
                    snapshot.val(),
                    date,
                    uid,
                );
            });
        return () => firebase.milks().off();
    }, [match.params.uid, match.params.date])

    return (
        <>
            <Typography variant="h4" align="center">
                Edit Milk
            </Typography>
            <MilkForm milk={milk} uid={match.params.uid} mode='edit' />
        </>
    )

}

const mapStateToProps = (state, { match }) => {
    let milk = {};
    if (Object.keys(state.milkState.milks).length) {
        milk = state.milkState.milks[match.params.date][match.params.uid];
        milk = { ...milk, date: moment(match.params.date, 'DD-MM-YYYY') };
    }

    return {
        milk: milk
    };
}


const mapDispatchToProps = dispatch => ({
    onSetMilk: (milk, date, uid) => dispatch({ type: ACTIONS.MILK_SET, milk, date, uid })
})

export default compose(
    withAuthorization(authUser => !!authUser),
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(EditMilk)
