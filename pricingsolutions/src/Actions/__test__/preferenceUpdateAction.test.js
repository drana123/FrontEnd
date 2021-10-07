import React , {Component} from 'react';
import * as ActionCreator from '../preferenceUpdateAction';
import * as ActionTypes from '../types';
describe ('handles the Action Object for updating preferences' , ()=>{
    test('should test update market price action creator' , ()=> {
        const actionObject = ActionCreator.updateMarketPriceAction([10,30]);
        expect(actionObject).toStrictEqual({
            type: ActionTypes.UPDATE_MARKET_PRICE,
            payload : [10,30]
        });
    });

    test('should test update market open action creator' , ()=> {
        const actionObject = ActionCreator.updateMarketOpenAction([10,30]);
        expect(actionObject).toStrictEqual({
            type: ActionTypes.UPDATE_MARKET_OPEN,
            payload : [10,30]
        });
    });

    test('should test update market low action creator' , ()=> {
        const actionObject = ActionCreator.updateMarketLowAction([10,30]);
        expect(actionObject).toStrictEqual({
            type: ActionTypes.UPDATE_MARKET_LOW,
            payload : [10,30]
        });
    });

    test('should test update market HIGH action creator' , ()=> {
        const actionObject = ActionCreator.updateMarketHighAction([10,30]);
        expect(actionObject).toStrictEqual({
            type: ActionTypes.UPDATE_MARKET_HIGH,
            payload : [10,30]
        });
    });
    test('should test filters action creator' , ()=> {
        const actionObject = ActionCreator.updateFiltersAction(["gibbrish"]);
        expect(actionObject).toStrictEqual({
            type: ActionTypes.UPDATE_FILTERS,
            payload : ["gibbrish"]
        });
    });

    test('should test sorting action creator' , ()=> {
        const actionObject = ActionCreator.updateSortingAction([{"gibbrish" : "asc"}]);
        expect(actionObject).toStrictEqual({
            type: ActionTypes.UPDATE_SORTING,
            payload : [{"gibbrish" : "asc"}]
        });
    });
    
    test('should test current page action creator' , ()=> {
        const actionObject = ActionCreator.updateCurrentPageAction(3);
        expect(actionObject).toStrictEqual({
            type: ActionTypes.UPDATE_CURRENT_PAGE,
            payload : 3
        });
    });
    
    test('should test current page size action creator' , ()=> {
        const actionObject = ActionCreator.updatePageSizeAction(13);
        expect(actionObject).toStrictEqual({
            type: ActionTypes.UPDATE_PAGE_SIZE,
            payload : 13
        });
    });
    
    test('should test groups action creator' , ()=> {
        const actionObject = ActionCreator.updateGroupsAction(["gibbrish"]);
        expect(actionObject).toStrictEqual({
            type: ActionTypes.UPDATE_GROUPS,
            payload : ["gibbrish"]
        });
    });
    
});