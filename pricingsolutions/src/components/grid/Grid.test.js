import React from 'react';
import {render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Grid from "../grid/Grid";
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'

import "regenerator-runtime";
import {CancelButton, AddButton, EditButton, DeleteButton, customSort, CommitButton} from "./Grid"
afterEach(cleanup);

describe("Grid component Tests", ()=>{
    
    let vdom;
    beforeEach(()=>{
            vdom = render(
                <Grid />
            )
    })
    afterEach(cleanup);

    it("renders without crashing", ()=>{
        expect(vdom.container).toBeInTheDocument();
    })
    it("renders grid without crashing", ()=>{
        expect(screen.getByTestId("grid")).toBeInTheDocument();
    })
    it("renders pagingPanel without crashing", ()=>{
        expect(screen.getByTestId("pagingPanel")).toBeInTheDocument();
    })
    
    it("renders editingState without crashing", ()=>{
        expect(screen.getByTestId("editingState")).toBeInTheDocument();
    })
    it("renders pagingState without crashing", ()=>{
        expect(screen.getByTestId("pagingState")).toBeInTheDocument();
    })
    
});

describe("buttons test",()=>{
    it("cancel button renders",()=>{
        let vdom = render(      <CancelButton />);
        expect(screen.getByRole("button"));
    })
    it("edit button renders", ()=>{
        render(<EditButton/> )
        expect(screen.getByRole("button"));
    })
    it("delete button renders", ()=>{
        render(<DeleteButton/> )
        expect(screen.getByRole("button"));
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByTitle("Delete row")).toBeInTheDocument();
    })
    it("add button renders", ()=>{
        render(<AddButton/> )
        expect(screen.getByRole("button"));
    })
    it("commit button renders", ()=>{
        render(<CommitButton/> )
        expect(screen.getByRole("button"));
    })
    
});

describe("customSort function test",()=>{
    it("return 0 if strings are same",()=>{
        let result  = customSort("ajay", "ajay");
        expect(result).toBe(0);
    })
    it("return -1 if string1 > string 2 albhbetically",()=>{
        let result  = customSort("aajay", "ajay");
        expect(result).toBe(-1);
    })
    it("return 1 if string1 < string 2 albhbetically",()=>{
        let result  = customSort("zjay", "ajay");
        expect(result).toBe(1);
    })
    
})
