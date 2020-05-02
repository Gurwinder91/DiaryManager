
import React from 'react';
import { useHistory } from "react-router-dom";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';

import AddMilk from './AddMilk';
import EditMilk from './EditMilk';
import MilkList from './MilkList';
import { MyList, AddCircle } from '../../core';
import * as ROUTES from '../../constants/routes';
import MilkExpensionPanel from './MilkExpensionPanel';
import MilkFilters from './MilkFilters';
import MilkSkeleton from './MilkSkeleton';
import { withAuthorization } from '../Session';

const todayDate = moment();

const MilkBase = () => {
    const history = useHistory();
    const [date, setDate] = React.useState(todayDate);
    const [time, setTime] = React.useState('All');

    useFirestoreConnect(() => [
        { collection: 'milks', where: [['date', '==', date.format('DD-MM-YYYY')]] }
    ])
    const milks = useSelector(state => state.firestore.ordered.milks)

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

    const navigateTo = () => {
        history.push(`${ROUTES.MILK_URLS.milk}${ROUTES.MILK_URLS.add}`, { childRoute: true });
    }

    const renderMilk = () => {

        let filteredMilks = milks;
        if (time !== 'All') {
            filteredMilks = milks.filter(item => item.time === time);
        }

        const milkMath = (filteredMilks && filteredMilks.length) ? calculateMilkMath(filteredMilks) : null;

        return (
            <>
                { milkMath && <MilkExpensionPanel milkMath={milkMath} />}
                <MyList>
                    {(filteredMilks && filteredMilks.length) && <MilkList milks={filteredMilks} />}
                </MyList>
            </>
        )
    }

    return (
        isLoaded(milks)
            ?
            <>
                <MilkFilters date={date} time={time} setDate={setDate} setTime={setTime} />
                {renderMilk()}
                <AddCircle whenClicked={navigateTo} />
            </>
            :
            <MilkSkeleton />
    )
}


const mapStateToProps = (state, props) => {
    return {
        milks: state.firestore.ordered.milks,
    }
}


const Milk = compose(
    withAuthorization(authUser => !!authUser),
    connect(mapStateToProps),
)(MilkBase);

export { Milk, AddMilk, EditMilk };