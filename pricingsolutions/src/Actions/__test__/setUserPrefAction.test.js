
import React , {Component} from 'react';
import { setPreference , setPreferenceError , setUserPref , apiAction} from '../setUserPrefAction';

import { SET_PREF, API, API_ERROR } from '../types';


test("Set user preference action handler", () => {
    let actionObject = setPreference("abc");
    expect(actionObject).toStrictEqual({"type": SET_PREF, "payload": "abc"})
});


test("Error in set preference", () => {
    let errorInSetPreference = setPreferenceError("abc");
    expect(errorInSetPreference).toStrictEqual({"type":API_ERROR,"payload":SET_PREF})
});

test("should return fetch market price api action" , ()=>{
    const success = jest.fn();
    const failure = jest.fn();
    let actionObject = apiAction({
        url : "a",
        method : 'POST', 
        data : "fakeData",
        onSuccess : success,
        onFailure : failure,
        label : SET_PREF
    });
    expect(actionObject.type).toStrictEqual(API);
    expect(actionObject.payload.method).toStrictEqual("POST");
    expect(success).toBeCalled;
    expect(failure).toBeCalled;
});

test("should return apiAction" , ()=>{
    let actionObject = setUserPref("fakepreference");
    expect(actionObject.type).toStrictEqual(API);
    expect(actionObject.payload.method).toStrictEqual("POST");
    expect(actionObject.payload.data).toStrictEqual("fakepreference");
});