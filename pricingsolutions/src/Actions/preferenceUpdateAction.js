import * as ActionTypes from './types';

export function updateMarketPriceAction(data){
    return {
        type: ActionTypes.UPDATE_MARKET_PRICE,
        payload : data
    }
}

export function updateMarketOpenAction(data){
    return {
        type: ActionTypes.UPDATE_MARKET_OPEN,
        payload : data
    }
}

export function updateMarketLowAction(data){
    return {
        type: ActionTypes.UPDATE_MARKET_LOW,
        payload : data
    }
}

export function updateMarketHighAction(data){
    return {
        type: ActionTypes.UPDATE_MARKET_HIGH,
        payload : data
    }
}

export function updateFiltersAction(data){
    return {
        type: ActionTypes.UPDATE_FILTERS,
        payload : data
    }
}

export function updateSortingAction(data){
    return {
        type: ActionTypes.UPDATE_SORTING,
        payload : data
    }
}

export function updateCurrentPageAction(data){
    return {
        type: ActionTypes.UPDATE_CURRENT_PAGE,
        payload : data
    }
}

export function updatePageSizeAction(data){
    return {
        type: ActionTypes.UPDATE_PAGE_SIZE,
        payload : data
    }
}

export function updateGroupsAction(data){
    return {
        type: ActionTypes.UPDATE_GROUPS,
        payload : data
    }
}
