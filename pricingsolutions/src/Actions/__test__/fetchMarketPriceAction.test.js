
import React , {Component} from 'react';
import { fetchMarketPriceError, fetchPrice ,fetchMarketPrice , apiAction} from '../FetchMarketPriceAction';

import { FETCH_PRICE, API_ERROR, API } from '../types';


test("Fetch market price", () => {
    let actionObject = fetchPrice("abc");
    expect(actionObject).toStrictEqual({"type": FETCH_PRICE, "payload": "abc"})
});


test("Error in set preference", () => {
    let errorInSetPreference = fetchMarketPriceError("abc");
    expect(errorInSetPreference).toStrictEqual({"type":API_ERROR,"payload":FETCH_PRICE})
});

test("should return fetch market price api action" , ()=>{
    const success = jest.fn();
    const failure = jest.fn();
    let actionObject = apiAction({
        url : "a",
        method : 'GET', 
        data : "fakeData",
        onSuccess : success,
        onFailure : failure,
        label : FETCH_PRICE
    });
    expect(actionObject.type).toStrictEqual(API);
    expect(actionObject.payload.method).toStrictEqual("GET");
    expect(success).toBeCalled;
    expect(failure).toBeCalled;
});

test("should return apiAction" , ()=>{
    let actionObject = fetchMarketPrice("01/02/2021" , "10/02/2021");
    expect(actionObject.type).toStrictEqual(API);
    expect(actionObject.payload.method).toStrictEqual("GET");
});