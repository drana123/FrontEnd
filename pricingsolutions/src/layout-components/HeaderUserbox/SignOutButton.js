import React from "react";
import {useMsal } from "@azure/msal-react";
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

export const handleLogout = (instance, storage) => {
    
    storage.clear();
    instance.logoutRedirect({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/"
    });

}

  const SignOutButton = (props) => {
    const { instance } = useMsal();

    return (
      <Button  data-testid = "SignOutButtonTest" 
        onClick={()=>{props.handleLogout(instance, localStorage)}}   
        color="default" className="text-twitter">
                  <span className="btn-wrapper--icon">
                    Sign Out
                  </span>
                  </Button>
    );
};

export default SignOutButton;