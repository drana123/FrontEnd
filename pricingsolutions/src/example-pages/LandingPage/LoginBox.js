import { Button, Grid, Paper, Typography, Divider } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { useHistory } from "react-router-dom";
import { FEATURE_URL } from "../../constants/apiConfigurationConstants";
import * as React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      justifyContent: "center",
      minHeight: "200px",
      padding: "15px",
      marginTop: theme.spacing(8),
      display: "flex",
      alignItems: "center",
    },
  })
);

export const LoginBox = (props) => {
  
 const { instance,accounts } = useMsal();
  let history = useHistory();


  
  const classes = useStyles();
  return (
    <div>
<Button onClick={() => props.handleLogin(props.endPoint, instance, history, localStorage,accounts)}                  
                      
                          size="large"
                          color="primary"
                          variant="contained"
                          className="m-2 py-3 px-5"
                          title="Go to Pricing View Screen">
                          <span className="btn-wrapper--label">Log in</span>
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                          </span>
                        </Button>
                        </div>
  );
};
export default LoginBox;





