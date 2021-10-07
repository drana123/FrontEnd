import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider } from '@material-ui/styles';
import MuiTheme from './theme';
const PresentationLayout = lazy(()=> import('./layout-blueprints/PresentationLayout'));
const LeftSidebar = lazy(()=>import('./layout-blueprints/LeftSidebar'));
const LeftSidebarPS = lazy(()=> import('./layout-blueprints/LeftSidebar/pricingScreenIndex'));

const NightlyBatchTable = lazy(()=> import('./example-pages/NightlyBatchTable'));
const APIConfiguration = lazy(()=> import('./example-pages/APIConfiguration'));
const Grid = lazy(()=> import('./example-pages/UsersManagement/index'));
const WithCustomMiddleware = lazy(()=> import('./example-pages/RegularTables1/pricingScreen/Container'));
const LandingPage = lazy(() => import('./example-pages/LandingPage'));


const Routes = () => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense
          fallback={
            <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
              <div className="w-50 mx-auto">
                Please wait while we load the application
              </div>
            </div>
          }>
          <Switch>
            <Redirect exact from="/" to="/LandingPage" />
            <Route path={['/LandingPage']}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/LandingPage" component={LandingPage} />
                  </motion.div>
                </Switch>
              </PresentationLayout>
            </Route>

            <Route
              path={[
                '/apiConfig',
                '/usersManagement',
                '/nightlyBatchProcess'
              ]}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/nightlyBatchProcess" component={NightlyBatchTable} />
                    <Route path="/apiConfig" component={APIConfiguration} />
                    <Route path="/usersManagement" component={Grid} />
                    
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>



            <Route
              path={[
                "/pricingView"
              ]}>
              <LeftSidebarPS>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/pricingView" component={WithCustomMiddleware} />
                  </motion.div>
                </Switch>
              </LeftSidebarPS>
            </Route>
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
