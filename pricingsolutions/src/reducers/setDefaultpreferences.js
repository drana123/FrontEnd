export default function setDefaultpreferences() {
    return  {
      filters : [{columnName: 'region', value: ''} , {columnName: 'quoteType', value: ''},
                 {columnName: 'tradable', value: ''} ,{columnName: 'marketQuoteId', value: ''}],
      sorting : [{ColumnName : "marketQuoteId" , sortingDirection : "asc"}],
      currentPage : 0,
      pageSize : 15,
      MarketPrice : [0,10000],
      MarketHigh : [0,10000],
      MarketOpen : [0,10000],
      MarketLow : [0,10000],
      groups : []
    }
};  