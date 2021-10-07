import {commitChanges} from "./commitChanges";
import React, { useState } from 'react';
import {render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime' 
import azureService from "./azureService";


let rows = [{"emailId":"ajaydp31@gmail.com","userRoleName":"Risk Analyst","username":"ajaydeep"}];
let added = [{"emailId":"added@gmail.com","userRoleName":"Admin","username":"newUser"}];
let changed = [{"emailId":"ajaydp31@gmail.com","userRoleName":"Admin","username":"chnage name"}];
let deleted = [{"emailId":"ajaydp31@gmail.com","userRoleName":"Risk Analyst","username":"ajaydeep"}];

describe("commitChanges funtion tests", ()=>{

    it("row added test", ()=>{
        let azureServiceMock = jest.fn((type, url, params)=>{
            return { "data":{"emailId":"ajaydp31@gmail.com","userRoleName":"Risk Analyst","username":"ajaydeep"}}
        });
        let rowsReturned = commitChanges({ added }, rows,  azureServiceMock );
        expect(azureServiceMock.mock.calls.length).toBe(1);
    })
    it("row deleted test", ()=>{
        let azureServiceMock = jest.fn();

        commitChanges({ deleted }, rows,  azureServiceMock );
        expect(azureServiceMock.mock.calls.length).toBe(1);
    })
    it("row edited test", ()=>{
        let azureServiceMock = jest.fn();

        commitChanges({ changed }, rows,  azureServiceMock );
        expect(azureServiceMock.mock.calls.length).toBe(1);
    })
})