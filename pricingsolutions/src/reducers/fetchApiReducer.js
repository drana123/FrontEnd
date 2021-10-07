import * as ActionType from '../Actions/types';
import setDefaultpreferences from './setDefaultpreferences';
import InitialState from './InitialState';
import { getScrollBarRange } from '../example-pages/RegularTables1/pricingScreen/GridViewComponents/getScrollBarRange';

export function fetchApiReducer(state = InitialState, action) {
  switch (action.type) {
    case ActionType.FETCH_PRICE:
        const fullRange = getScrollBarRange(action.payload);
        return {...state , 
          rows : action.payload,
           data : action.payload ,
           fullRangeOfMarketPrice : fullRange.fullRangeOfMarketPrice,
           fullRangeOfMarketOpen : fullRange.fullRangeOfMarketOpen,
           fullRangeOfMarketHigh : fullRange.fullRangeOfMarketHigh,
           fullRangeOfMarketLow : fullRange.fullRangeOfMarketLow
           };
    case ActionType.SET_PRICE:
        return {...state , rows : action.payload};
    case ActionType.FETCH_PREF:
        if ( action.payload.id===-1)
        {
          const newPreference = setDefaultpreferences();
          return {
            ...state,
            preference : {...newPreference}
          }
        }
        else
        {
          
          return {
            ...state,
            preference : {
              ...state.preference ,
              filters : action.payload.preference.filters,
              sorting : action.payload.preference.sorting,
              currentPage : action.payload.preference.currentPage,
              pageSize : action.payload.preference.pageSize,
              MarketPrice : action.payload.preference.MarketPrice,
              MarketHigh : action.payload.preference.MarketHigh,
              MarketLow : action.payload.preference.MarketLow,
              MarketOpen : action.payload.preference.MarketOpen,
              groups : action.payload.preference.groups
            },
            isHavingPreference : 1
          };      
        }
      case ActionType.UPDATE_MARKET_PRICE :
        let ovj = {
          ...state,
          preference :{
            ...state.preference,
            MarketPrice : action.payload
          }
        }
        return ovj;
      case ActionType.UPDATE_MARKET_OPEN :
      return {
        ...state,
        preference :{
          ...state.preference,
          MarketOpen : action.payload
        }
      }
      case ActionType.UPDATE_MARKET_LOW :
        return {
          ...state,
          preference :{
            ...state.preference,
            MarketLow : action.payload
          }
        }
    case ActionType.UPDATE_MARKET_HIGH :
      return {
        ...state,
        preference :{
          ...state.preference,
          MarketHigh : action.payload
        }
      }
    case ActionType.UPDATE_FILTERS :
      return {
        ...state,
        preference :{
          ...state.preference,
          filters : action.payload
        }
      }
    case ActionType.UPDATE_SORTING :
      return {
        ...state,
        preference :{
          ...state.preference,
          sorting : action.payload
        }
      }
    case ActionType.UPDATE_CURRENT_PAGE :
      return {
        ...state,
        preference :{
          ...state.preference,
          currentPage : action.payload
        }
      }
      case ActionType.UPDATE_PAGE_SIZE :
        return {
          ...state,
          preference :{
            ...state.preference,
            pageSize : action.payload
          }
        }
      case ActionType.UPDATE_GROUPS :
        return {
          ...state,
          preference :{
            ...state.preference,
            groups : action.payload
          }
        }

    default:
      return state;
  }
}