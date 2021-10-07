import React, { lazy,Component } from 'react';
import { connect } from 'react-redux';
import { fetchMarketPrice } from '../../../Actions/fetchMarketPriceAction';
import { fetchUserPref } from '../../../Actions/fetchUserPrefAction';
const GridView = lazy(() => import('./GridViewComponents/GridView'));



class WithCustomMiddleware extends Component {

    componentDidMount() {
    const email = localStorage.getItem("Email");
    var endDate = new Date();
    var end_dd = String(endDate.getDate()).padStart(2, '0');
    var end_mm = String(endDate.getMonth() + 1).padStart(2, '0'); 
    var end_yyyy = endDate.getFullYear();
    endDate = end_dd + '/' + end_mm + '/' + end_yyyy;

    let startDate = new Date((new Date()).valueOf() - 1000*60*60*24*5);
    var start_dd = String(startDate.getDate()).padStart(2, '0');
    var start_mm = String(startDate.getMonth() + 1).padStart(2, '0');
    var start_yyyy = startDate.getFullYear();
    startDate = start_dd + '/' + start_mm + '/' + start_yyyy;
    this.props.getAllMarketprices(startDate,endDate);
    
    this.props.getUserPreference(email);
  }

  render () {

    return (
      <div data-testid="containerDiv">
      <GridView/>
      </div>
    );
    
  }
}

const  mapDispatchToProps = (dispatch)=> {
  return {
    getAllMarketprices: (startDate,endDate) => {dispatch(fetchMarketPrice(startDate , endDate))},
    getUserPreference : (email) => {dispatch(fetchUserPref(email));}
  }
}

export default connect(
  null,
  mapDispatchToProps
)(WithCustomMiddleware);