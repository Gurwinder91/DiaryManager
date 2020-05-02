import React from 'react';

import { Typography } from '@material-ui/core';
import { compose } from 'recompose';
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

import MilkForm from '../MilkForm';
import { withAuthorization } from '../../Session';

const EditMilk = (props) => {
    useFirestoreConnect(() => [
        { collection: 'milks', doc: props.match.params.id } 
    ])
    const milk = useSelector(({ firestore: { data } }) => data.milks && data.milks[props.match.params.id])

    return (
        <>
            <Typography variant="h4" align="center">
                Edit Milk
            </Typography>
            {milk && <MilkForm milk={milk} id={props.match.params.id} mode='edit' />}
        </>
    )

}


export default compose(
    withAuthorization(authUser => !!authUser),
)(EditMilk)
