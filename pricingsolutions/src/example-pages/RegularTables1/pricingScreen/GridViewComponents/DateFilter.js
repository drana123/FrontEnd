import React,{useState} from 'react';
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { difference ,getStringDate} from './utils';
import { fetchMarketPrice } from '../../../../Actions/fetchMarketPriceAction';
import {connect} from 'react-redux';
import {SuccessNotification,ErrorNotification} from './Notification';
import { FETCH_PRICE, RESET_FETCH_PRICE } from '../../../../Actions/types';

export function DateFilter(props){
    const [startDate, setStartDate] = useState(new Date((new Date()).valueOf() - 1000*60*60*24*5));
    const [endDate, setEndDate] = useState(new Date());
    return (
        <div className="dateFilter">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                data-testid = {"DatePickerId"}
                disableFuture
                label="FROM"
                openTo="year"
                views={["year", "month", "date"]}
                value={startDate}
                onChange={(newStartDate) => {if (newStartDate <= endDate) setStartDate(newStartDate);}}
                renderInput={(props) => <TextField {...props} />}
            />
            </MuiPickersUtilsProvider>
        <hr></hr>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                disableFuture
                label="TO"
                openTo="year"
                views={["year", "month", "date"]}
                value={endDate}
                onChange={(newEndDate) => {if (newEndDate >= startDate) setEndDate(newEndDate);}}
                renderInput={(props) => <TextField {...props} />}
            />
            </MuiPickersUtilsProvider>
        <hr></hr>
            <Button variant="contained" color="primary" startIcon={<DateRangeIcon />}
            onClick={()=>{
                if (difference(startDate, endDate) > 30) {
                    ErrorNotification("Data too large");
                }
                else
                {
                    props.handleDateFilterButton(startDate,endDate);
                    if (props.loadingStatus.marketPriceLoadingStatus ===  true) 
                    {
                        if (props.ErrorStatus.marketPriceErrorStatus === false) 
                        SuccessNotification("Data filtered successfully");
                        else 
                        ErrorNotification("Error in getting filtered Data");
                        props.resetfetchDataStatus();
                    }
                }
            }}>
            Apply Date Filter
            </Button>
      </div>
    );
}

export const mapStateToProps = (state) =>{
    return {
    loadingStatus : state.apiStatusReducer.loadingStatus,
    ErrorStatus : state.apiStatusReducer.ErrorStatus,
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        handleDateFilterButton : (startDate, endDate)=> {
            const dates = getStringDate(startDate,endDate)
            dispatch(fetchMarketPrice(dates[0], dates[1]));
        },
        resetfetchDataStatus : () => {
            dispatch({type : RESET_FETCH_PRICE , payload : FETCH_PRICE});
        }
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DateFilter);