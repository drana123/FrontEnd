import React from 'react';
import Header from '../header/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';



function PricingScreen() {
  return (
    <>
      <Router>
         <Header /> 
          <Route path='/' component={PricingScreen} />
          <Route path='/apiConfig' component={AdminScreen} />
      </Router>
    </>
  );
}

export default PricingScreen;
