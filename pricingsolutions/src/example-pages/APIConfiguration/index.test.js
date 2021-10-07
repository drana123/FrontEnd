import React from "react";
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import  ApiConfiguration  from './index'
import { createMemoryHistory } from 'history'
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import axios from 'axios';
import callApi from '../../components/callApi'

jest.mock('../../components/callApi');

let vdom;
afterEach(() => { localStorage.clear(); });

describe("API Configuration tests", () => {
    afterEach(cleanup);

    const mockModelObject = {
        apiEndpointId: 'TestEndpointId',
        apiEndpointUrl: 'TestEndpointUrl',
        region: 'TestRegion',
        symbols: 'TestSymbols',
        apiHost: 'TestApiHost',
        apiKey: 'TestApiKey',
        frequency: 'TestFrequency'
      
      };
      

    // test("Renders ApiConfiguration page correctly", () => {
    //     localStorage.setItem("Email", "ajay@hmail.com");
    //     localStorage.setItem("userRole", "admin");
    //     const mockCallApi = jest.fn();
    //     const history = createMemoryHistory();
    //     const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    //     vdom = render(
    //         <Router history={historyMock}>
    //             <ApiConfiguration/>
    //         </Router>,
    //     );
    //     expect(vdom.getByTestId("unique")).toBeInTheDocument();
    //     localStorage.clear();
    // });

    // test("Checks for the Api calls", () => {
    //     const mockCallApi = jest.fn();
    //     localStorage.setItem("Email", "ajay@hmail.com");
    //     localStorage.setItem("userRole", "admin");
    //     const history = createMemoryHistory();
    //     const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    //     vdom = render(
    //         <Router history={historyMock}>
    //             <ApiConfiguration  />
    //         </Router>,
    //     );
    //     localStorage.clear();
    // });

    

    it("doesn't render apiConfig page when local storage in null", ()=>{
        
        const history = createMemoryHistory();
        const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

        history.push("/")
        vdom = render(
            <Router history={historyMock}>
                <ApiConfiguration/>
            </Router>,
        );

        expect(vdom.queryByTestId("unique")).not.toBeInTheDocument();
    })
    
    it("doesn't render apiconfig page when user in not admin", ()=>{
        localStorage.setItem("Email", "ajay@hmail.com");
        localStorage.setItem("userRole", "dguhfj")
        const history = createMemoryHistory();
        const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

        history.push("/pricingView")
        vdom = render(
            <Router history={historyMock}>
                <ApiConfiguration/>
            </Router>,
        );

        expect(vdom.queryByTestId("unique")).not.toBeInTheDocument();
    })
});

