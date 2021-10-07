import {connect} from 'react-redux';
import {setUserPref} from '../../../../Actions/setUserPrefAction';
import {updateUserPrefAction} from '../../../../Actions/updateUserPrefAction';
import { SET_PREF } from '../../../../Actions/types';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import {SuccessNotification , ErrorNotification} from './Notification';
import React, { useEffect, useState } from 'react';

export function SaveUserPrefButton(props) {
  const [preference , setPreference] = useState(props.preference);
  useEffect(()=>{setPreference(props.preference)},[props]);
  return (
    <div>
      <Button
       data-testid = {"savePrefBtn"}
        color="primary"
        startIcon={<SaveIcon />}
        variant="contained"
                 onClick = {()=>{     
                  const CurrentUserDefinedStates = {
                    sorting: preference.sorting,
                    currentPage: preference.currentPage,
                    pageSize: preference.pageSize,
                    MarketPrice: preference.MarketPrice,
                    MarketHigh: preference.MarketHigh,
                    MarketLow: preference.MarketLow,
                    MarketOpen: preference.MarketOpen,
                    filters: preference.filters,
                    groups: preference.groups
                  }
                const userPreferenceString = JSON.stringify(CurrentUserDefinedStates); 
                const email = localStorage.getItem("Email");
                if (userPreferenceString===undefined || userPreferenceString.length===0 || email===undefined)
                {
                  ErrorNotification("Error in saving preferences");
                }
                else
                {
                  props.resetSavePrefStatus();
                  if (props.isHavingPreference === 0)
                  {
                    props.handleSavePreference({emailId : email , gridConfig : userPreferenceString});
                  }
                  else
                  {
                    const userId = localStorage.getItem("Id");
                    props.handleUpdatePreference({emailId : email , gridConfig : userPreferenceString , id : userId});
                  }
                  if (props.loadingStatus.saveUserLoadingStatus ===  true) 
                  {
                    if (props.ErrorStatus.saveUserErrorStatus === false) 
                    SuccessNotification("Preferences saved");
                    else 
                    ErrorNotification("Error in saving preferences");
                    
                  }
                }
            }}
            >
                Save Your Preference
      </Button>
        
    </div>
    );
}
const mapStateToProps = (state) =>{
  return {
    isHavingPreference : state.fetchApiReducer.isHavingPreference,
    preference : state.fetchApiReducer.preference,
    loadingStatus : state.apiStatusReducer.loadingStatus,
    ErrorStatus : state.apiStatusReducer.ErrorStatus
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSavePreference : (data) => {
          dispatch(setUserPref(data))
        },
        handleUpdatePreference : (data) => {
          dispatch(updateUserPrefAction(data))
        },
        resetSavePrefStatus : () => {
          dispatch({type : "RESET_SAVE_PREF" , payload : SET_PREF});
        },
    }
  }
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveUserPrefButton);