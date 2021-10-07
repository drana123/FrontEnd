import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import {
  Hidden,
  IconButton,
  AppBar,
  Box,
  Button,
  Tooltip
} from '@material-ui/core';

import { connect } from 'react-redux';

import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';

import HeaderLogo from '../../layout-components/HeaderLogo';
import HeaderUserbox from '../../layout-components/HeaderUserbox';

import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

const Header = props => {
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
  const {
    headerShadow,
    headerFixed,
    sidebarToggleMobile,
    setSidebarToggleMobile
  } = props;
  let isAdmin = localStorage.getItem('userRole');
  let isPricingView = window.location.href.replace(window.location.origin,'').toLowerCase() == "/pricingview";
  if (isAdmin !== 'admin') {
    return (
      <Fragment>
        <AppBar
          color="secondary"
          className={clsx('app-header', {})}
          position={headerFixed ? 'fixed' : 'absolute'}
          elevation={headerShadow ? 11 : 3}>
          {!props.isCollapsedLayout && <HeaderLogo />}
          <Box className="app-header-toolbar">
            <Hidden mdDown>
              <Box className="d-flex align-items-center"> </Box>
            </Hidden>
            <Box className="d-flex align-items-center">
              <HeaderUserbox />
              <Box className="toggle-sidebar-btn-mobile">
                <Tooltip title="Toggle Sidebar" placement="right">
                  <IconButton
                    color="inherit"
                    onClick={toggleSidebarMobile}
                    size="medium">
                    {sidebarToggleMobile ? (
                      <MenuOpenRoundedIcon />
                    ) : (
                      <MenuRoundedIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </AppBar>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <AppBar
          color="secondary"
          className={clsx('app-header', {})}
          position={headerFixed ? 'fixed' : 'absolute'}
          elevation={headerShadow ? 11 : 3}>
          {!props.isCollapsedLayout && <HeaderLogo />}
          <Box className="app-header-toolbar">
            <Hidden mdDown>
              <Box className="d-flex align-items-center"> </Box>
            </Hidden>
            <Box className="d-flex align-items-center">
              {isPricingView ?
                <Link to="/apiConfig">
                <Button className="m-2" variant="contained" color="default">
                  {' '}
                  Admin{' '}
                </Button>
                </Link>
                : 
                <Link to="/pricingView">
                <Button className="m-2" variant="contained" color="default">
                  {' '}
                  Pricing Screen{' '}
                </Button>
                </Link>
              }
              <HeaderUserbox />
              <Box className="toggle-sidebar-btn-mobile">
                <Tooltip title="Toggle Sidebar" placement="right">
                  <IconButton
                    color="inherit"
                    onClick={toggleSidebarMobile}
                    size="medium">
                    {sidebarToggleMobile ? (
                      <MenuOpenRoundedIcon />
                    ) : (
                      <MenuRoundedIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </AppBar>
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
