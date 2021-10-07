import React , {Component} from 'react';
import {render ,screen } from '@testing-library/react';
import * as Notification from '../GridViewComponents/Notification';



describe('Testing Notification Function of Apply User Preference' , ()=>{
    it('should should display Success when invoked' , ()=> {
        Notification.SuccessNotification("Success")
        expect(screen.findByText("Success")).toBeInTheDocument;
        
    });
    it('should should display Error  when invoked' , ()=> {
        Notification.ErrorNotification("Error");
        expect(screen.findByText("Error")).toBeInTheDocument;  
    });
});