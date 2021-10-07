import {render, screen, cleanup, fireEvent} from '@testing-library/react'
import React from 'react'
import {Router} from 'react-router-dom'
import SignOutButton, {handleLogout} from "./SignOutButton"
import '@testing-library/jest-dom'

describe('NavBar Component', () => {
    test("logout on click button works", ()=>{
            
        const handleLoginMock =jest.fn();
        const vdom = render(<SignOutButton handleLogout = {handleLoginMock}/>);
        fireEvent.click(screen.getByRole("button"));
        expect(handleLoginMock.mock.calls.length).toBe(1);

    });
});
describe("handleLogout function", ()=>{
    test("handleLogout test - local starage is cleared",()=>{
        let instance = ()=>{};
        let called=0, instanceCalled=0;
        instance.logoutRedirect = ()=>{}
        let storage = {};
        storage.clear = ()=>{
            called = 1;
        }
        handleLogout(instance, storage);
        expect(called).toBe(1);
    })
    test("handleLogout test - redirect function is called", ()=>{
        let instance = ()=>{};
        let instanceCalled=0;
        instance.logoutRedirect = ()=>{
            instanceCalled=1;
        }
        let storage = {};
        storage.clear = ()=>{}
        handleLogout(instance, storage);
        expect( instanceCalled).toBe(1);
    })
})