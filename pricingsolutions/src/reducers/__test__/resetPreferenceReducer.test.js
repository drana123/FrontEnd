import { RESET_SAVE_PREF , RESET_FETCH_PREF, RESET_FETCH_PRICE } from '../../Actions/types';
import pricingAppReducer from '../index';

import setDefaultpreferences from '../setDefaultpreferences';
const InitialState = {
    rows : [],
    preference : setDefaultpreferences(),
    loadingStatus :  {
       marketPriceLoadingStatus : false,
       userPrefLoadingStatus : false,
       saveUserLoadingStatus : false,
    },
    ErrorStatus : {
      marketPriceErrorStatus : false,
      userPrefErrorStatus : false,
      saveUserErrorStatus : false,
    },
    isHavingPreference : 1
}

describe('states returned for RESET_SAVE_PREF action type', () => {
    it('updates save user states ', () => {
        const newState = pricingAppReducer.resetPreferenceReducer(InitialState,{type: RESET_SAVE_PREF});
        expect(newState.loadingStatus.saveUserLoadingStatus).toBe(false);
        expect(newState.ErrorStatus.saveUserErrorStatus).toBe(false);
        
    });
})

describe('states returned for RESET_FETCH_PREF action type', () => {
    it('updates user pref states ', () => {
        const newState = pricingAppReducer.resetPreferenceReducer(InitialState, {type: RESET_FETCH_PREF});
        expect(newState.loadingStatus.userPrefLoadingStatus).toBe(false);
        expect(newState.ErrorStatus.userPrefErrorStatus).toBe(false);
    });
}) 


describe('states returned for RESET_FETCH_PRICE action type', () => {
    it('updates market price states ', () => {
        const newState = pricingAppReducer.resetPreferenceReducer(InitialState, {type: RESET_FETCH_PRICE});
        expect(newState.loadingStatus.marketPriceLoadingStatus).toBe(false);
        expect(newState.ErrorStatus.marketPriceErrorStatus).toBe(false);
    });
}) 

describe('Handles reset preference reducer', () => {
    it('should return default state ', () => {
        const newState = pricingAppReducer.resetPreferenceReducer(InitialState, {type: "None"});
        expect(newState).toEqual(InitialState);
        
    });
}) 