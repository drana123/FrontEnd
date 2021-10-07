import React, { Fragment } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { IconButton, Box } from '@material-ui/core';

import HomeIcon from '@mui/icons-material/Home';

const HeaderLogo = props => {
  return (
    <Fragment>
      <div className={clsx('app-header-logo', {})}>
        <Box className="header-logo-wrapper" title="Sapient Pricing Solution">
          <Link to="/pricingView" className="header-logo-wrapper-link">
            <IconButton
              color="primary"
              size="medium"
              className="header-logo-wrapper-btn">
              <HomeIcon/>
            </IconButton>
          </Link>
          <Box className="header-logo-text">Sapient Pricing Solution</Box>
        </Box>
      </div>
    </Fragment>
  );
};

export default HeaderLogo;
