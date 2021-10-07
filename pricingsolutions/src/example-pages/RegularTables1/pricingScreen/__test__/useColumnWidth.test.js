import React, { Component } from 'react';
import { render,screen } from '@testing-library/react';
import useColumnWidth from '../GridViewComponents/useColumnWidth';
import { renderHook } from '@testing-library/react-hooks';

describe('Handle use Column width hook' , ()=>{
    test('should' , ()=>{
        const myComp = renderHook(()=>useColumnWidth());
        expect(myComp.result.current.columnWidths).toEqual([
            { columnName: 'createdAt', width: 180 },
            { columnName: 'marketQuoteId', width: 180 },
            { columnName: 'regularMarketPrice', width: 190 },
            { columnName: 'region', width: 110 },
            { columnName: 'quoteType', width: 135 },
            { columnName: 'regularMarketChange', width: 210 },
            { columnName: 'regularMarketChangePercentage', width: 280 },
            { columnName: 'regularMarketDayHigh', width: 210 },
            { columnName: 'regularMarketDayLow', width: 210 },
            { columnName: 'regularMarketVolume', width: 210 },
            { columnName: 'regularMarketOpen', width: 190 },
            { columnName: 'trailingPE', width: 140 },
            { columnName: 'priceToSales', width: 150 },
            { columnName: 'forwardPE', width: 140 },
            { columnName: 'tradeable', width: 140 },
            { columnName: 'symbol', width: 140 },
          ]);

        myComp.result.current.setColumnWidths([]);
        expect(myComp.result.current.columnWidths).toEqual([]);
    });
});