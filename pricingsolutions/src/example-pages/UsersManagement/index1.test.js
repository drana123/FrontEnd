import React from 'react';
import {render, cleanup, screen} from '@testing-library/react';
import { Router } from 'react-router-dom';

import '@testing-library/jest-dom';
import {createMemoryHistory} from 'history'
import UsersManagement from './index';

import "regenerator-runtime";

afterEach(cleanup);
let vdom;

describe("users managemnt page tests",()=>{
    it("doesnt renders the page when user is not loged in",()=>{
        
        const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
        const wrapper = render(
            <Router history={historyMock}>
                <UsersManagement/>
            </Router>,
        );
        vdom = render();
        expect(screen.queryByTestId("usersPageTest")).not.toBeInTheDocument();
    })
    it("doesnt renders the page when user is not admin",()=>{
        localStorage.setItem("Email","ajay@gmail.com");
        localStorage.setItem("userRole","risk analyist")
        
        const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
        vdom = render(
            <Router history={historyMock}>
                <UsersManagement/>
            </Router>,
        );
        expect(screen.queryByTestId("usersPageTest")).not.toBeInTheDocument();
    })
    
    // it("does renders the page when user is an admin ",()=>{
    //     localStorage.setItem("Email","ajay@gmail.com");
    //     localStorage.setItem("userRole","admin")
        
    //     const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    //     const wrapper = render(
    //         <Router history={historyMock}>
    //             <UsersManagement/>
    //         </Router>,
    //     );
    //     const componentUnderTest = render();

    //     expect(componentUnderTest).toBeInTheDocument();
    // })
})