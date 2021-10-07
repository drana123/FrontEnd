import React, { Fragment } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Hidden, Drawer, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import SidebarHeader from '../../../../layout-components/SidebarHeader/index';
import { setSidebarToggleMobile } from '../../../../reducers/ThemeOptions';
import PricingScreenLeftPanel from './PricingScreenLeftPanel';

const SidebarView = props => {
  const {
    setSidebarToggleMobile,
    sidebarToggleMobile,
    sidebarFixed,

    sidebarShadow
  } = props;

  const closeDrawer = () => setSidebarToggleMobile(!sidebarToggleMobile);
  const sidebarMenuContent = (
    <div>
      
      <PricingScreenLeftPanel/>
    </div>
  );
  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={sidebarToggleMobile}
          onClose={closeDrawer}
          variant="temporary"
          elevation={4}
          className="app-sidebar-wrapper-lg">
            <SidebarHeader />
         <PerfectScrollbar>{sidebarMenuContent}</PerfectScrollbar>
        </Drawer>
      </Hidden>

      <Hidden mdDown>
        <Paper
          className={clsx('app-sidebar-wrapper', {
            'app-sidebar-wrapper-fixed': sidebarFixed
          })}
          square
          elevation={sidebarShadow ? 11 : 3}>
          <div
            className={clsx({
              'app-sidebar-menu': sidebarFixed
            })}>
              <SidebarHeader />
            <PerfectScrollbar options={{ wheelPropagation: false }}>
              {sidebarMenuContent}
            </PerfectScrollbar>
          </div>
        </Paper>
      </Hidden>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  sidebarFixed: state.ThemeOptions.sidebarFixed,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarView);
