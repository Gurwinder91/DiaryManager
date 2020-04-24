import React from 'react';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import * as ACTIONS from '../../../actions';
import MilkForm from '../MilkForm';
import { withFirebase } from '../../Firebase';

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
        <MilkForm milk={milk} uid={match.params.uid} mode='edit' />
    )

}

const mapStateToProps = (state, {match}) => {
    let milk = {};
    if (state.milkState.milks) {
        milk = state.milkState.milks[match.params.date][match.params.uid];
        milk = { ...milk, date: new Date(Number(match.params.date)) };
    }

    return {
        milk: milk
    };
}


const mapDispatchToProps = dispatch => ({
    onSetMilk: (milk, date, uid) => dispatch({ type: ACTIONS.MILK_SET, milk, date, uid })
})

export default compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(EditMilk)
