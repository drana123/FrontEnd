// import callApi from './callApi'
import React from 'react'
import callApi from './callApi'
import ApiConfiguration from '../example-pages/APIConfiguration/index'
import { createMemoryHistory } from 'history'
import { Router } from "react-router-dom";
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
let vdom;
jest.mock('./callApi');
console.log(callApi.mock.calls.length)
afterEach(() => { localStorage.clear(); });
describe("Sample test", () => {
    afterEach(cleanup)

    it("Renders ApiConfiguration page correctly", () => {
        localStorage.setItem("Email", "ajay@hmail.com");
        localStorage.setItem("userRole", "admin");
        const mockCallApi = jest.fn();
        const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

        // const history = createMemoryHistory();
        vdom = render(
            <Router >
                <ApiConfiguration history={historyMock}/>
             </Router>
        );
        expect(callApi.mock.calls.length).toBe(1);
        localStorage.clear();
    });

    it("Check for the PUT/POST Request", () => {
        localStorage.setItem("Email", "ajay@hmail.com");
        localStorage.setItem("userRole", "admin");
        const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

        // const history = createMemoryHistory();
        vdom = render(
            <Router history={historyMock}>
                <ApiConfiguration />
            </Router>,
        );
        userEvent.click(screen.getByText(/Submit/));
        localStorage.clear();
    })
})
