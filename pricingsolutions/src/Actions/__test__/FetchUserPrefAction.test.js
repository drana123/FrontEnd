
import React , {Component} from 'react';
import { fetchUserPref , fetchUserPrefError ,fetchPreference , apiAction} from '../fetchUserPrefAction';

import { FETCH_PREF, API_ERROR, API } from '../types';


test("Fetch market price", () => {
    let actionObject = fetchPreference();
    expect(actionObject).toStrictEqual({"type": API_ERROR, "payload": FETCH_PREF});
    let data = {
        id : 1,
        emailId : "fake@ps",
        gridConfig : "",
    }
    actionObject = fetchPreference(data);
    expect(actionObject).toEqual({"type":FETCH_PREF , payload : {
        id : 1,
        email : "fake@ps",
        preference : {}
    }});
});


test("Error in set preference", () => {
    let errorInSetPreference = fetchUserPrefError("abc");
    expect(errorInSetPreference).toStrictEqual({"type":API_ERROR,"payload":FETCH_PREF})
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
        label : FETCH_PREF
    });
    expect(actionObject.type).toStrictEqual(API);
    expect(actionObject.payload.method).toStrictEqual("GET");
    expect(success).toBeCalled;
    expect(failure).toBeCalled;
});

test("should return apiAction" , ()=>{
    let actionObject = fetchUserPref();
    expect(actionObject.type).toStrictEqual(API);
    expect(actionObject.payload.method).toStrictEqual("GET");
});