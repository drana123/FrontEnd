import React , {Component} from 'react';
import * as urls from '../apiUrlEndPoints';

describe('Handles the correctness of url strings' , ()=> {
    test ('should test that api urls are correct' , ()=>{
        expect(urls.fetchMarketPriceUrl).toStrictEqual("https://apim-price-prod-02.azure-api.net/api/pricingView/pricingdata-get");
        expect(urls.fetchUserPreferenceUrl).toStrictEqual("https://apim-price-prod-02.azure-api.net/api/userPreference/preference-get");
        expect(urls.addUserPreferenceUrl).toStrictEqual("https://apim-price-prod-02.azure-api.net/api/userPreference/preference-save");
        expect(urls.updateUserPreferenceeUrl).toStrictEqual("https://apim-price-prod-02.azure-api.net/api/userPreference/preference-update");
    });
});