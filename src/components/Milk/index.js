
import React from 'react';
import { useHistory } from "react-router-dom";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import moment from 'moment';

import { withFirebase } from '../Firebase';
import AddMilk from './AddMilk';
import EditMilk from './EditMilk';
import MilkList from './MilkList';
import { MyList, AddCircleIcon, MyListSkeleton } from '../../core';
import * as ROUTES from '../../constants/routes';
import MilkExpensionPanel from './MilkExpensionPanel';
import MilkFilters from './MilkFilters';
import * as ACTIONS from '../../actions';
import { MyObject } from '../../utilty';
import MilkSkeleton from './MilkSkeleton';
import { withAuthorization } from '../Session';

const todayDate = moment();

const MilkBase = ({ firebase, onSetMilks, getMilksByDate }) => {
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);
    const [date, setDate] = React.useState(todayDate);
    const [time, setTime] = React.useState('All');

    React.useEffect(() => {
        setLoading(true);
        const formattedDate = getFormattedDate(date);
        firebase.milks().child(formattedDate).on('value', snapshot => {
            onSetMilks(snapshot.val(), formattedDate);
            setLoading(false);
        }, () => setLoading(false));

        return () => firebase.milks().off();
    }, [date])

    const calculateMilkMath = (milksToCalc) => {
        const BMMilks = milksToCalc.filter(item => item.milkType === 'BM').map(item => Number(item.milkQuantity));
        const CMMilks = milksToCalc.filter(item => item.milkType === 'CM').map(item => Number(item.milkQuantity));
        const totalMilks = milksToCalc.map(item => Number(item.milkQuantity));

        const milkMath = {
            total: calculateSum(totalMilks) || 0,
            BMTotal: calculateSum(BMMilks) || 0,
            CMTotal: calculateSum(CMMilks) || 0,
        }

        return milkMath;
    }

    const calculateSum = (arr) => {
        return arr.reduce((a, b) => a + b, 0);
    }

    const getFormattedDate = (date) => {
        return date.format('DD-MM-YYYY');
    }

    const navigateTo = () => {
        history.push(`${ROUTES.MILK_URLS.milk}${ROUTES.MILK_URLS.add}`);
    }

    const renderContent = () => {
        const formattedDate = getFormattedDate(date);
        let [ ...milks ] = getMilksByDate(formattedDate);
        if (time !== 'All') {
            milks = milks.filter(item => item.time === time);
        }
        const milkMath = calculateMilkMath(milks);

        return (
            <>
                {milks.length ? <MilkExpensionPanel milkMath={milkMath} /> : null}
                <MyList>
                    {
                        milks.length ? <MilkList milks={milks} date={formattedDate}/> : null
                    }
                </MyList>
            </>)
    }

    return (
        loading
            ?
            <MilkSkeleton />
            :
            <>
                <MilkFilters date={date} time={time} setDate={setDate} setTime={setTime} />

                {renderContent()}
                <AddCircleIcon whenClicked={navigateTo} />
            </>
    )
}


const mapStateToProps = (state, props) => {
    return {
        getMilksByDate: (date) => state.milkState.milks ? new MyObject(state.milkState.milks[date]).toArray() : [],
    }
}


const mapDispatchToProps = dispatch => ({
    onSetMilks: (milks, date) => dispatch({ type: ACTIONS.MILKS_SET_BY_DATE, milks, date }),
})

const Milk = compose(
    withAuthorization(authUser => !!authUser),
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(MilkBase);

export { Milk, AddMilk, EditMilk };