import React, { Fragment } from 'react';

import { PageTitle, Sidebar } from '../../layout-components';

import { ExampleWrapperSeamless } from '../../layout-components';
import { useHistory } from 'react-router-dom';
import { Hidden } from '@material-ui/core';

import FormsControlsBasic from '../../example-components/FormsControls/FormsControlsBasic';


export default function APIConfiguration() {
  const history = useHistory();
  var Email = localStorage.getItem('Email');
  var UserRole = localStorage.getItem('userRole');

  if (Email == null) {
    history.push('/');
    return <></>;
  }
  if (Email != null && UserRole != 'admin') {
    history.push('/pricingView');
    return <></>;
  }

  return (
    <Fragment>
      <Hidden mdUp>
        <PageTitle
          titleHeading="API Configuration"
          titleDescription="Details of the registered API can be changed here."
        />
      </Hidden>
      <ExampleWrapperSeamless>
        <FormsControlsBasic />
      </ExampleWrapperSeamless>
    </Fragment>
  );
}
