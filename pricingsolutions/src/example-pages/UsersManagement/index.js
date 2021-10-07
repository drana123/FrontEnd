import React, { Fragment, lazy } from 'react';

import { PageTitle, Sidebar } from '../../layout-components';

import { ExampleWrapperSeamless } from '../../layout-components';
import { useHistory } from 'react-router-dom';
import { Hidden } from '@material-ui/core';
const Grid = lazy(()=> import('../../components/grid/Grid'));



export default function () {
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
    <Fragment data-testid = "usersPageTest" >
      <Hidden mdUp>
        <PageTitle
          titleHeading="Users Management"
          titleDescription="User configuration and details"
        />
      </Hidden>
      <ExampleWrapperSeamless>
        <Grid data-testid = "gridTest"/>
      </ExampleWrapperSeamless>
    </Fragment>
  );
}
