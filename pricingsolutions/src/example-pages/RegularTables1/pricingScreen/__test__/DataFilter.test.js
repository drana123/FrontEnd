import React, { Component } from 'react';
import { fireEvent, render,screen } from '@testing-library/react';
import DataFilter  from '../GridViewComponents/DataFilter';

describe('Handle Data Scrollbars and Filters' , ()=>{
    test('should render data filter component without crashing' , ()=>{

        const handleSliderMock = jest.fn();
        render(<DataFilter
            Filtertext = {"Market Price Range"}
            MaxValue = {[0,100000]}
            initValue = {[0,100]}
            callbackFunc = {handleSliderMock}
        />);
    });

    test('should render Slider and Input Group without crashing' , ()=>{
      const handleSliderMock = jest.fn();

        render(<DataFilter
            Filtertext = {"Market Price Range"}
            MaxValue = {[0,100000]}
            initValue = {[0,100]}
            callbackFunc = {handleSliderMock}
        />);

        expect(screen.getByText(/Market Price Range/)).toBeInTheDocument;
        expect(screen.getByTestId("SliderId")).toBeInTheDocument; 
        expect(screen.getByTestId("InputGroupId")).toBeInTheDocument; 
    });
    test ('should set the rows when slider value is changed' ,()=>{
        const handleSliderMock = jest.fn();

        render(<DataFilter
            Filtertext = {"Market Price Range"}
            MaxValue = {[0,100000]}
            initValue = {[0,100]}
            callbackFunc = {handleSliderMock}
        />);
        fireEvent.mouseDown(screen.getByTestId("SliderId") ,{ clientX: 162, clientY: 302 });
        expect(handleSliderMock.mock.calls.length).toBe(1);
        const allBtns =  screen.getAllByRole("button");
        fireEvent.click(allBtns[0]);
        expect(handleSliderMock.mock.calls.length).toBe(2);
        fireEvent.click(allBtns[1]);
        expect(handleSliderMock.mock.calls.length).toBe(3);
        fireEvent.click(allBtns[3]);
        expect(handleSliderMock.mock.calls.length).toBe(4);
    });
});