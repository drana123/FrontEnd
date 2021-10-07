import React, { Component } from 'react';
import { render,screen ,fireEvent} from '@testing-library/react';
import {DateFilter, mapStateToProps , mapDispatchToProps} from '../GridViewComponents/DateFilter';

describe('Handle Data Scrollbars and Filters' , ()=>{
    test('should render data filter component without crashing' , ()=>{
        render(<DateFilter/>);
        expect(screen.getByTestId("DatePickerId")).toBeInTheDocument;
        expect(screen.getByText("FROM")).toBeInTheDocument;
        expect(screen.getByText("TO")).toBeInTheDocument;
        
    });

    test('should render data filter component without crashing' , ()=>{
        const DateFilterMock = jest.fn();
        const resetMock = jest.fn();
        const loadingStatus =  {
            marketPriceLoadingStatus : false,
            userPrefLoadingStatus : false,
            saveUserLoadingStatus : false,
         };
        const ErrorStatus = {
            marketPriceErrorStatus : false,
            userPrefErrorStatus : false,
            saveUserErrorStatus : false,
        };
        render(<DateFilter
            loadingStatus = {loadingStatus}
            ErrorStatus = {ErrorStatus}
            handleDateFilterButton = {DateFilterMock}
            resetfetchDataStatus = {resetMock}
        />);
        expect(screen.getByText(/Apply Date Filter/)).toBeInTheDocument;
        fireEvent.click(screen.getByRole("button"));
        expect(DateFilterMock.mock.calls.length).toBe(1);
        
    });
});

describe('handle redux function' , ()=>{
    test('should test mapStateToProps function' , ()=>{
        let state = {
            apiStatusReducer : {
                loadingStatus : "something loading",
                ErrorStatus : "some Error"
            }
        }
        const stateProps = mapStateToProps(state);
        expect(stateProps.loadingStatus).toEqual("something loading");
        expect(stateProps.ErrorStatus).toEqual("some Error");
    });

    test('should test mapDispatchToProps function' , ()=>{
        let state = {
            apiStatusReducer : {
                loadingStatus : "something loading",
                ErrorStatus : "some Error"
            }
        }
        const dispatchProps = mapDispatchToProps();
        expect(dispatchProps.handleDateFilterButton).toBeDefined;
        expect(dispatchProps.resetfetchDataStatus).toBeDefined;
        
    });
});