import React, { Fragment } from 'react';
import { useMsal } from "@azure/msal-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  Avatar,
  Box,
  Menu,
  Button,
  List,
  ListItem,
  Tooltip,
  Divider
} from '@material-ui/core';
import SignOutButton, { handleLogout }  from './SignOutButton';
export default function HeaderUserbox() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };
  function capitalizeFirstLetter(string) {
    if (string ===null ||  string.length===0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  console.log(localStorage.getItem("dp"));
  
  return (
    <Fragment>
      <Button
        color="inherit"
        onClick={handleClick}
        className="text-capitalize px-3 text-left btn-inverse d-flex align-items-center">
        <Box>
        <AccountCircleIcon/>
        </Box>
        <div className="d-none d-xl-block pl-3">
          
        </div>
        <span className="pl-1 pl-xl-3">
          <FontAwesomeIcon icon={['fas', 'angle-down']} className="opacity-5" />
        </span>
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        onClose={handleClose}
        className="ml-2">
        <div className="dropdown-menu-right dropdown-menu-lg overflow-hidden p-0">
          <List className="text-left bg-transparent d-flex align-items-center flex-column pt-0">
           <Box>
          <Avatar sizes="44" id="dp" alt="user" src={localStorage.getItem("dp")} />
        </Box>
            <div className="pl-3  pr-3">
              <div className="font-weight-bold text-center pt-2 line-height-1">
              {localStorage.getItem("Name")}
              </div>
              <span className="text-black-50 text-center" >
                {capitalizeFirstLetter(localStorage.getItem("userRole"))}
              </span>
            </div>
            {/* <Divider className="w-100 mt-2" />
            <ListItem button>Sign Out</ListItem>
            {/* <ListItem button>Profile settings</ListItem>
            <ListItem button>Active tasks</ListItem> */}
            <Divider className="w-100" /> 
            <ListItem className="d-block rounded-bottom px-3 pt-3 pb-0 text-center">
              <Tooltip arrow title="Sign Out">
               <SignOutButton handleLogout={handleLogout}/>
              </Tooltip>
            </ListItem>
          </List>
        </div>
      </Menu>
    </Fragment>
  );
}
