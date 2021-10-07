import React from 'react';
 import configureStore from '../../config/configureStore';
import apiMiddleware from '../apiMiddleware';
import * as url from '../../Actions/apiUrlEndPoints';
import { API_ERROR, FETCH_PREF } from '../../Actions/types';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe('handle Middleware',  () => {
    const store = configureStore();
    it('dispatch Error type action object', () => {
      const next = jest.fn();
      const onSuccess = jest.fn();
      const onFailure = jest.fn();
      store.dispatch = jest.fn(); 
      const action = {type: 'ERROR', payload: { url : '', method : 'GET', OnSuccess : onSuccess, OnFailure : onFailure, label : API_ERROR}};
      apiMiddleware(store)(next)(action);
      expect(next.mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    
    it('dispatch API type action object', () => {
      const next = jest.fn();
      const onSuccess = jest.fn();
      const onFailure = jest.fn();
      store.dispatch = jest.fn(); 
      let mock;
      mock = new MockAdapter(axios);
      const resp = {
        id : 1,
        email : "ksagar640@gmail.com",
        preference : {}
      }
      mock.onGet(`${url.fetchUserPreferenceUrl}?email=ksagar640@gmail.com`).reply(200, resp);
      const action = {type: 'API', payload: { url : url.fetchUserPreferenceUrl, method : 'GET', OnSuccess : onSuccess, OnFailure : onFailure, label : FETCH_PREF}};
      apiMiddleware(store)(next)(action);
      expect(mock.history.get[0].url).toEqual("https://apim-price-prod-02.azure-api.net/api/userPreference/preference-get");
    });
  });
  