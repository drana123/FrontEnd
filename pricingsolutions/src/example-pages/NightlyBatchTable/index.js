import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSeamless } from '../../layout-components';
import CollapsibleTable from '../../components/nightlyBatch/NightlyBatchTable';
import { Hidden } from '@material-ui/core';
import {useHistory} from 'react-router-dom';

// import RegularTables4Example7 from '../../example-components/RegularTables4/RegularTables4Example7';
export default function NightlyBatchTable() {
  const history=useHistory();
  var Email= localStorage.getItem("Email");
  var UserRole= localStorage.getItem("userRole");

  if(Email == null)
 {
   history.push("/");
return(<></>);
}
            if(Email!=null && UserRole != "admin")
            {
                history.push("/pricingView");
        return(<></>);

            }

  return (
    <Fragment>
      
      <Hidden mdUp>
      <PageTitle
        titleHeading="Nightly Batch Process Table"
        titleDescription="Detailed report of batch runs"
      />
          </Hidden>
      
      <ExampleWrapperSeamless sectionHeading="">
        {/* <RegularTables4Example7 /> */}
        <CollapsibleTable />
      </ExampleWrapperSeamless>
    </Fragment>
  );
}
