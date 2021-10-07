import React ,{Component} from 'react';
import {apiEnd , apiError} from '../apiAction'; 
import {  FETCH_PRICE ,API_END , API_ERROR} from '../types';
describe('Handle api action creator' , ()=>{
    test('should return api_end action object' , ()=>{
        const actionObject = apiEnd(FETCH_PRICE);
        expect(actionObject).toEqual({
            type: API_END,
            payload: FETCH_PRICE
          })
    });

    test('should return api_error action object' , ()=>{
        const actionObject = apiError(FETCH_PRICE);
        expect(actionObject).toEqual({
            type: API_ERROR,
            payload : FETCH_PRICE
          });
    });
});