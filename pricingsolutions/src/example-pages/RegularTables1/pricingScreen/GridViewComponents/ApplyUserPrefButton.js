import { connect } from 'react-redux';
import { fetchUserPref } from '../../../../Actions/fetchUserPrefAction';
import { FETCH_PREF } from '../../../../Actions/types';
import Button from '@material-ui/core/Button';

import { SuccessNotification, ErrorNotification } from './Notification';
import React from 'react';

export function ApplyUserPrefButton({ loadingStatus, ErrorStatus, handleApplyButtonClick, resetFetchPrefStatus }) {

  return (
    <div>
        
        <Button
            data-testid = {"applyPrefBtn"} 
            variant="contained" color="primary" 
            onClick = {()=>{
              resetFetchPrefStatus();
              const email = localStorage.getItem("Email");
              handleApplyButtonClick(email);
              if (loadingStatus.userPrefLoadingStatus ===  true){
                if (ErrorStatus.userPrefErrorStatus === false)
                {
                  SuccessNotification("Preferences Applied");
                }
                else
                {
                 ErrorNotification("Error in applying preferences");
                }
          }}}
          >
            Apply Saved Preferences
          </Button>

    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleApplyButtonClick: (email) => {
      dispatch(fetchUserPref(email))
    },
    resetFetchPrefStatus: () => {
      dispatch({ type: "RESET_FETCH_PREF", payload: FETCH_PREF });
    }
  }
}


const mapStateToProps = (state)=> {
  return {
  loadingStatus : state.apiStatusReducer.loadingStatus,
  ErrorStatus : state.apiStatusReducer.ErrorStatus
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyUserPrefButton);