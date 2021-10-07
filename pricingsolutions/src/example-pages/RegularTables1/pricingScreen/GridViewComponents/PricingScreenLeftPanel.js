import React,{useEffect , useState , lazy} from 'react'

import * as Handlers from './handleScrollbarFunctions';
import {connect} from 'react-redux';
import {SET_PRICE} from '../../../../Actions/types';
import * as ActionCreator from '../../../../Actions/preferenceUpdateAction';

const SaveUserPrefButton = lazy(()=> import('./SaveUserPrefButton'));
const ApplyUserPrefButton = lazy(()=> import('./ApplyUserPrefButton'));
const DataFilter = lazy(()=>import('./DataFilter'));
const DateFilter = lazy(()=> import('./DateFilter'));

function PricingScreenLeftPanel(props){
    const [MarketPrice, setMarketPrice] = useState(props.preference.MarketPrice);
    const [MarketHigh, setMarketHigh] = useState(props.preference.MarketHigh);
    const [MarketOpen, setMarketOpen] = useState(props.preference.MarketOpen);
    const [MarketLow, setMarketLow] = useState(props.preference.MarketLow);

    useEffect(()=>{
            setMarketPrice(props.preference.MarketPrice);
            setMarketHigh(props.preference.MarketHigh);
            setMarketLow(props.preference.MarketLow);
            setMarketOpen(props.preference.MarketOpen);
            const newRows = Handlers.allFilters(props.preference.MarketPrice , props.preference.MarketOpen , props.preference.MarketHigh ,props.preference.MarketLow ,props.data);
            props.handleDataFilter(newRows);
    },[props.preference, props.data]);

    const MarketPriceCallback = (newRange) =>{
        const newRows = Handlers.allFilters(newRange , MarketOpen , MarketHigh ,MarketLow ,props.data);
        setMarketPrice(newRange);
        props.handleDataFilter(newRows);
        props.handleMarketPriceUpdate(newRange);
    }
    const MarketOpenCallback = (newRange) =>{
        const newRows = Handlers.allFilters(MarketPrice , newRange , MarketHigh ,MarketLow ,props.data);
        setMarketOpen(newRange);
        props.handleDataFilter(newRows);
        props.handleMarketOpenUpdate(newRange);
    }
    const MarketHighCallback = (newRange) =>{
        const newRows = Handlers.allFilters(MarketPrice , MarketOpen , newRange ,MarketLow ,props.data);
        setMarketHigh(newRange);
        props.handleDataFilter(newRows);
        props.handleMarketHighUpdate(newRange);
    }
    const MarketLowCallback = (newRange) =>{
        const newRows = Handlers.allFilters(MarketPrice , MarketOpen , MarketHigh ,newRange ,props.data);
        setMarketLow(newRange);
        props.handleDataFilter(newRows);
        props.handleMarketLowUpdate(newRange);
    }
    return (
        <div>
        <DateFilter/>
        <br/>
        <div className="dataFilter">
            <DataFilter 
            Filtertext = {"Market Price Range"}
            initValue = {MarketPrice}
            MaxValue = {props.fullRangeOfMarketPrice}
            callbackFunc = {MarketPriceCallback}
            />
            <hr/>
            <DataFilter 
            Filtertext = {"Market Open Range"}
            initValue = {MarketOpen}
            MaxValue = {props.fullRangeOfMarketOpen}
            callbackFunc = {MarketOpenCallback}
            />
            <hr/>
            <DataFilter 
            Filtertext = {"Market High Range"}
            initValue = {MarketHigh}
            MaxValue = {props.fullRangeOfMarketHigh}
            callbackFunc = {MarketHighCallback}
            />
            <hr/>
            <DataFilter 
            Filtertext = {"Market Low Range"}
            initValue = {MarketLow}
            MaxValue = {props.fullRangeOfMarketLow}
            callbackFunc = {MarketLowCallback}
            />
            <br/>
            <SaveUserPrefButton
            />
            <br/>
            <ApplyUserPrefButton
            />           
            <hr />
            </div>
        </div> 
);
}
const mapStateToProps = (state) =>{
    return {
    data : state.fetchApiReducer.data,
    preference : state.fetchApiReducer.preference,
    isHavingPreference : state.fetchApiReducer.isHavingPreference,
    fullRangeOfMarketPrice : state.fetchApiReducer.fullRangeOfMarketPrice,
    fullRangeOfMarketOpen : state.fetchApiReducer.fullRangeOfMarketOpen,
    fullRangeOfMarketHigh : state.fetchApiReducer.fullRangeOfMarketHigh,
    fullRangeOfMarketLow : state.fetchApiReducer.fullRangeOfMarketLow
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleDataFilter : (newRows)=> {
            dispatch({type: SET_PRICE , payload : newRows});
        },
        handleMarketPriceUpdate : (data) => {dispatch(ActionCreator.updateMarketPriceAction(data))},
        handleMarketOpenUpdate : (data) => {dispatch(ActionCreator.updateMarketOpenAction(data))},
        handleMarketLowUpdate : (data) => {dispatch(ActionCreator.updateMarketLowAction(data))},
        handleMarketHighUpdate : (data) => {dispatch(ActionCreator.updateMarketHighAction(data))},
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PricingScreenLeftPanel);
