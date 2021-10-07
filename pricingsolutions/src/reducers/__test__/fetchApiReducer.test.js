import * as ActionType from '../../Actions/types';
import InitialState from '../InitialState';
import pricingAppReducer from '../index';
import setDefaultpreferences from '../setDefaultpreferences';

describe('state returned for FETCH_PRICE action type', () => {
    it('updates rows in state', () => {
        const newState = pricingAppReducer.fetchApiReducer(InitialState, {type: ActionType.FETCH_PRICE, payload: [{"marketQuoteId":7,"regularMarketPrice":28.3,"region":"US","quoteType":"EQUITY","regularMarketChange":0.20999908,"regularMarketChangePercentage":0.7475937,"regularMarketDayHigh":28.465,"regularMarketDayLow":28.3,"regularMarketVolume":1729,"regularMarketOpen":29.0,"trailingPe":0.4069249,"priceToSales":-16.231123,"forwardPe":0.0,"tradeable":false,"symbolName":"AAMC","createdAt":"2021-09-30T00:00:00"}]});
        expect(newState.rows).toEqual([{"marketQuoteId":7,"regularMarketPrice":28.3,"region":"US","quoteType":"EQUITY","regularMarketChange":0.20999908,"regularMarketChangePercentage":0.7475937,"regularMarketDayHigh":28.465,"regularMarketDayLow":28.3,"regularMarketVolume":1729,"regularMarketOpen":29.0,"trailingPe":0.4069249,"priceToSales":-16.231123,"forwardPe":0.0,"tradeable":false,"symbolName":"AAMC","createdAt":"2021-09-30T00:00:00"}]);
        expect(newState.data).toEqual([{"marketQuoteId":7,"regularMarketPrice":28.3,"region":"US","quoteType":"EQUITY","regularMarketChange":0.20999908,"regularMarketChangePercentage":0.7475937,"regularMarketDayHigh":28.465,"regularMarketDayLow":28.3,"regularMarketVolume":1729,"regularMarketOpen":29.0,"trailingPe":0.4069249,"priceToSales":-16.231123,"forwardPe":0.0,"tradeable":false,"symbolName":"AAMC","createdAt":"2021-09-30T00:00:00"}]);
    });
})

describe('states returned for FETCH_PREF action type', () => {
  

    it('applies existing pref states', () => {
        const newState = pricingAppReducer.fetchApiReducer(InitialState, {type: ActionType.FETCH_PREF, payload : { 
            preference :{
                    filters : [{columnName: 'region', value: ''} , {columnName: 'quoteType', value: ''},
                            {columnName: 'tradable', value: ''} ,{columnName: 'marketQuoteId', value: ''}],
                    sorting : [{ColumnName : "marketQuoteId" , sortingDirection : "desc"}],
                    currentPage : 2,
                    pageSize : 10,
                    MarketPrice : [100,200],
                    MarketHigh : [200,400],
                    MarketOpen : [200,400],
                    MarketLow : [10,400],
                    groups : []
                }
            }
        });
          
          
          expect(newState.preference).toEqual({
            filters : [{columnName: 'region', value: ''} , {columnName: 'quoteType', value: ''},
                       {columnName: 'tradable', value: ''} ,{columnName: 'marketQuoteId', value: ''}],
            sorting : [{ColumnName : "marketQuoteId" , sortingDirection : "desc"}],
            currentPage : 2,
            pageSize : 10,
            MarketPrice : [100,200],
            MarketHigh : [200,400],
            MarketOpen : [200,400],
            MarketLow : [10,400],
            groups : []
          });
    });

    it('applies existing pref states', () => {
        const newState = pricingAppReducer.fetchApiReducer(InitialState, {type: ActionType.FETCH_PREF, payload : { 
            id : -1,
            preference : {}
            }
        });
        const expectedValue = setDefaultpreferences();
        expect(newState.preference).toEqual(expectedValue);
    });

    it('should update market price', () => {
        const newState = pricingAppReducer.fetchApiReducer(InitialState, {type: ActionType.UPDATE_MARKET_PRICE, payload : [20,30]});
        expect(newState.preference.MarketPrice).toEqual([20,30]);
    });

    
    it('should update market open', () => {
        const newState = pricingAppReducer.fetchApiReducer(InitialState, {type: ActionType.UPDATE_MARKET_OPEN, payload : [20,30]});
        expect(newState.preference.MarketOpen).toEqual([20,30]);
    });

    
    it('should update market high price', () => {
        const newState = pricingAppReducer.fetchApiReducer(InitialState, {type: ActionType.UPDATE_MARKET_HIGH, payload : [20,30]});
        expect(newState.preference.MarketHigh).toEqual([20,30]);
    });

    
    it('should update market low price', () => {
        const newState = pricingAppReducer.fetchApiReducer(InitialState, {type: ActionType.UPDATE_MARKET_LOW, payload : [20,30]});
        expect(newState.preference.MarketLow).toEqual([20,30]);
    });

    it('should update filters', () => {
        const newState = pricingAppReducer.fetchApiReducer(InitialState, {type: ActionType.UPDATE_FILTERS, payload : []});
        expect(newState.preference.filters).toEqual([]);
    });
    
    it('should update sorting', () => {
        const newState = pricingAppReducer.fetchApiReducer(InitialState, {type: ActionType.UPDATE_SORTING, payload : [{'sorting' : 'id'}]});
        expect(newState.preference.sorting).toEqual([{'sorting' : 'id'}]);
    });

    it('should update current page', () => {
        const newState = pricingAppReducer.fetchApiReducer(InitialState, {type: ActionType.UPDATE_CURRENT_PAGE , payload : 12});
        expect(newState.preference.currentPage).toEqual(12);
    });

    it('should update  page size', () => {
        const newState = pricingAppReducer.fetchApiReducer(InitialState, {type: ActionType.UPDATE_PAGE_SIZE , payload : 12});
        expect(newState.preference.pageSize).toEqual(12);
    });
    
    it('should update grouping', () => {
        const newState = pricingAppReducer.fetchApiReducer(InitialState, {type: ActionType.UPDATE_GROUPS , payload : ['region']});
        expect(newState.preference.groups).toEqual(['region']);
    });
    
    
    
}); 