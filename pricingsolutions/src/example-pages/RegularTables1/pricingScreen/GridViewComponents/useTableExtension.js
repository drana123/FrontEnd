import { useState } from 'react';

function useTableColumnExtensions() {

    const [tableColumnExtensions] = useState([

        { columnName: 'createdAt', align: 'center', groupingEnabled: false },
        { columnName: 'marketQuoteId', align: 'center' },
        { columnName: 'regularMarketPrice', align: 'center', groupingEnabled: false },
        { columnName: 'region', align: 'center' },
        { columnName: 'quoteType', align: 'center' },
        { columnName: 'regularMarketChange', align: 'center', groupingEnabled: false },
        { columnName: 'regularMarketChangePercentage', align: 'center', groupingEnabled: false },
        { columnName: 'regularMarketDayHigh', align: 'center', groupingEnabled: false },
        { columnName: 'regularMarketDayLow', align: 'center', groupingEnabled: false },
        { columnName: 'regularMarketVolume', align: 'center', groupingEnabled: false },
        { columnName: 'regularMarketOpen', align: 'center', groupingEnabled: false },
        { columnName: 'trailingPE', align: 'center', groupingEnabled: false },
        { columnName: 'priceToSales', align: 'center', groupingEnabled: false },
        { columnName: 'forwardPE', align: 'center', groupingEnabled: false },
        { columnName: 'tradeable', align: 'center' },
        { columnName: 'symbol', align: 'center', groupingEnabled: false },
    
      ]);
 
  return tableColumnExtensions;
}

export default useTableColumnExtensions;