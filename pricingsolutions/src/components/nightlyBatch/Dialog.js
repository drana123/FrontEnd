import React, { Children } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Tooltip } from '@mui/material';

const styles = (theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    },
  });


const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography  variant="h6"><div>{children}</div></Typography>
      {onClose ? (
        <div>

        <IconButton  aria-label="close" className={classes.closeButton} onClick={onClose}>
          
          <CloseIcon sx={{padding:100}} />
        </IconButton>
        </div>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({children,title}) {

  const splitString= (stringToSplit)=>{
    if(stringToSplit === null){
      return 0;
    }
    else {

      return stringToSplit.split(',').map(item => item.trim()).join("\n")
    }

  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChildrenSplit = (children) =>{
    if(children === null){
      return 0;
    }
    else{
      return children.split(',').length;
    }
  }

  return (
    <div>
     <Tooltip title="Click to see list"><Button variant="outlined" color="primary" onClick={handleClickOpen}>
      {handleChildrenSplit(children)}
      </Button></Tooltip>
     
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle text-align="left" id="customized-dialog-title" onClose={handleClose}>
        {title}
        </DialogTitle>
        <DialogContent dividers>
          {splitString(children)}
        </DialogContent>
       
      </Dialog>
    </div>
  );
}