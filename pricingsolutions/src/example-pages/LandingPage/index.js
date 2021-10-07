import React, { Fragment } from 'react';

import {Container,} from '@material-ui/core';


import LoginBox from "../../example-pages/LandingPage/LoginBox";

import hero9 from '../../assets/images/hero-bg/hero-5.jpg';
import { loginApiEndPoint } from "../../constants/apiEndPoints";
import { useHistory } from "react-router";
import loginApiCall from "../../example-pages/LandingPage/loginApiCall";

const LandingPage = () => {

  
  const history = useHistory();
  var Email = localStorage.getItem("Email");

  if (Email != null) {
    history.push("/pricingView");
    return (<>  </>);
  }
  return (
    <Fragment>
      <div className="hero-wrapper bg-composed-wrapper bg-premium-dark min-vh-100">
        <div className="flex-grow-1 w-100 d-flex align-items-center">
          <div
            className="bg-composed-wrapper--image opacity-5"
            style={{ backgroundImage: 'url(' + hero9 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-second opacity-3" />
          <div className="bg-composed-wrapper--bg bg-red-lights opacity-1" />
          <div className="bg-composed-wrapper--content pt-5 pb-2 py-lg-5">
            <Container maxWidth="md" className="pb-5">
              {/* <Grid container spacing={4}>
                <Grid */}
                  {/* item
                  lg={10}
                  className="px-0 mx-auto d-flex align-items-center"> */}
                  <div className="text-center">
                    <div className="px-4 px-sm-0 text-white mt-4">
                      <h1 className="display-2 mb-5 font-weight-bold">
                        Pricing Solution View
                      </h1>
                      
                      <div className="divider border-2 border-light my-5 border-light opacity-2 mx-auto rounded-circle w-50" />
                      <div>
                        <LoginBox  handleLogin={loginApiCall}
               
                endPoint={loginApiEndPoint}/>
                    </div>
                   </div>
                   </div>
                  
        
            </Container>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;
