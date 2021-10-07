import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { Button } from '@material-ui/core'
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ReplayIcon from '@material-ui/icons/Replay';
import DoneIcon from '@material-ui/icons/Done';
import CachedIcon from '@material-ui/icons/Cached';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import CustomizedDialogs from './Dialog'
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import { SuccessNotification } from '../../example-pages/RegularTables1/pricingScreen/GridViewComponents/Notification';
// import { toast } from 'react-toastify';
import { Divider } from 'rsuite';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// export const SuccessNotification = (message) => toast.success(message);
// export const ErrorNotification = (message) => toast.error(message);


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#4C5782',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  }
}));


function Row(props) {

  const { row } = props;
  const { changeState } = props;
  const sampleTime = "2021-09-24T07:45";
  const [open, setOpen] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);

  const onClickFunc = async () => {
    const apiConfig = await axios.get("https://func-price-frontapi-prod-02.azurewebsites.net/api/config-get?code=rDD8blPNckrdRccd29Lyba3wa8/CbzqFW/0e/GKUKEz67y6Zf8Uq8g==&clientId=default");
    // console.log(apiConfig)
    await axios.post('https://prod-130.westus.logic.azure.com:443/workflows/984f34b283d040fcad51473039347a29/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=oU7egZGqtCZtXnWNOCUF1WVUSKkmeJNAdrVxjP12fsw', {
      "ApiEndpointUrl": apiConfig.data.apiEndpointUrl,
      "MethodType": "GET",
      "headers": {
        "x-rapidapi-host": apiConfig.data.apiHost,
        "x-rapidapi-key": apiConfig.data.apiKey
      },
      "parameters": {
        "region": apiConfig.data.region,
        "symbols": row.runs[row.runs.length - 1].notFetchedSymbols
      },
      "QuotationTime": row.quotationTime,
      "SymbolListState": row.symbolListState,

      "offlineFile": "false"
    })
      .then((response) => {
        if (response.status === 202) {
          SuccessNotification("Batch retriggered");
        }
        else
          console.log("Error in batch retrigger");
      }, (error) => {
      });

    // console.log(row.runs)

    setTimeout(() => {
      changeState();
    }, 2000);
  }



  const handleStatus = (buttonIcon) => {
    if (buttonIcon === "progress") {
      return <Tooltip sx={{ color: 'dark-blue' }} title="In Progress"><div><CachedIcon /></div></Tooltip>
    }
    else if (buttonIcon === "success") {
      return <Tooltip sx={{ color: 'green' }} title="Success"><div><DoneIcon /></div></Tooltip>;
    }
    else {
      return <Tooltip sx={{ color: 'red' }} title="Failed"><div><ErrorOutlineIcon /></div></Tooltip>;
    }
  }

  const handleTriggerButton = () => {
    const currentRun = row.runs[0].status;

    // console.log(row.batchId)
    // console.log(row.runs)
    if (currentRun === "fail") {
      // console.log(currentRun)
      return <IconButton
        size="small"
        onClick={() => { onClickFunc(); }}
      >
        <Tooltip title="Retrigger Batch"><ReplayIcon /></Tooltip>
      </IconButton>;
    }
    else {
      return <></>;
    }
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, background: '#e6ede8' }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => { setOpen(!open); }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.batchId}
        </TableCell>
        <TableCell align="left">{row.quotationTime.slice(0, sampleTime.length).replace('T', '\t')}</TableCell>
        <TableCell align="left">  <Tooltip title="Click to see the list"><CustomizedDialogs title="Symbols List">
          {row.symbolListState}
        </CustomizedDialogs></Tooltip></TableCell>
        <TableCell align="left">
          {handleTriggerButton()}
        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Batch {row.batchId} History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow >
                    <TableCell>Run Id</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Fetched Symbols</TableCell>
                    <TableCell>Failed to Fetch</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.runs.map((runsRow) => (
                    <TableRow key={runsRow.runId} >
                      <TableCell component="th" scope="row">
                        {runsRow.runId}
                      </TableCell>
                      <TableCell>{runsRow.startTime.slice(0, sampleTime.length).replace('T', '\t')}</TableCell>
                      <TableCell >{runsRow.endTime.slice(0, sampleTime.length).replace('T', '\t')}</TableCell>
                      <TableCell > <CustomizedDialogs title="Successfully Fetched Symbols List">
                        {runsRow.runFor}
                      </CustomizedDialogs></TableCell>
                      <TableCell >{runsRow.notFetchedSymbols}</TableCell>
                      <TableCell >{handleStatus(runsRow.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    quotationTime: PropTypes.string.isRequired,
    symbolListState: PropTypes.string.isRequired,
    runs: PropTypes.arrayOf(
      PropTypes.shape({
        runId: PropTypes.number.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        runFor: PropTypes.string.isRequired,
        notFetchedSymbols: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
      }),
    ).isRequired,
    batchId: PropTypes.number.isRequired,
  }).isRequired,
};





export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const getBatchReport = async () => {
    // SuccessNotification("New Batch Process Triggered");
    // console.log("Triggered")
    await axios.get("https://func-price-frontapi-prod-06.azurewebsites.net/api/batchprocess-get?code=qglBYHSJJZYMryUjirQXYR56IwMUNXSPdp/6uffnrignuJUCjWgRsg==&clientId=default").then((response) => {
      var array = response.data;
      setRows(array);
      setLoading(false);

    });
  };


  useEffect(() => {

    getBatchReport();

  }, [loading]);


  const changeState = () => {
    setLoading(true);
  }
  const styles = theme => ({
    modalStyle1: {
      position: 'absolute',
      top: '10%',
      left: '10%',
      overflow: 'scroll',
      height: '100%',
      display: 'block'
    }
  });

  const classes = styles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const Buttonstyles = theme => ({
    centerBox: {
      justifyContent: "flex-end",
      alignItems: "flex-end"
    }
  });

  const Buttonclasses = Buttonstyles();


  const handleNewTrigger = async () => {
    const apiConfig = await axios.get("https://func-price-frontapi-prod-02.azurewebsites.net/api/config-get?code=rDD8blPNckrdRccd29Lyba3wa8/CbzqFW/0e/GKUKEz67y6Zf8Uq8g==&clientId=default");
    var currentDate = new Date();
    // var sample =  Date.
    var newQuotationTime = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate()) + "T" + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds() + ":" + currentDate.getMilliseconds();
    newQuotationTime = currentDate.toISOString();

    // console.log(newQuotationTime)
    // console.log((newQuotationTime))
    await axios.post('https://prod-130.westus.logic.azure.com:443/workflows/984f34b283d040fcad51473039347a29/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=oU7egZGqtCZtXnWNOCUF1WVUSKkmeJNAdrVxjP12fsw', {
      "ApiEndpointUrl": apiConfig.data.apiEndpointUrl,
      "MethodType": "GET",
      "headers": {
        "x-rapidapi-host": apiConfig.data.apiHost,
        "x-rapidapi-key": apiConfig.data.apiKey
      },
      "parameters": {
        "region": apiConfig.data.region,
        "symbols": apiConfig.data.symbols
      },
      "QuotationTime": newQuotationTime.toString(),
      "SymbolListState": apiConfig.data.symbols,

      "offlineFile": "false"
    })
      .then((response) => {
        if (response.status === 202) {
          // console.log("New Batch Triggered");
          SuccessNotification("New Batch Triggered")
          
        }
        else
          console.log("Error in batch retrigger");
      }, (error) => {
      });



    setTimeout(() => {
      changeState();
    }, 2000);
  }


  setTimeout(() => {
    changeState();
  }, 2000);

  return (

    <Paper className={classes.modalStyle1} sx={{ width: '100%' }}>
      {/* <ToastContainer /> */}


    <TableCell>

      <Button onClick={() => { handleNewTrigger() }} className={Buttonclasses.centerBox} variant="outlined" color="secondary">

        Trigger New Batch

      {"\n"}
      </Button>
      </TableCell>



      <TableContainer sx={{ maxHeigth: 440 }} component={Paper}>
        <Table aria-label="collapsible table">



          {/* <TableCell align="left">Carbs&nbsp;(g)</TableCell>
            <TableCell align="left">Protein&nbsp;(g)</TableCell> */}


          <TableHead>
            <TableRow >
              <StyledTableCell />
              <StyledTableCell >Batch Id</StyledTableCell>
              <StyledTableCell >Quotation Time</StyledTableCell>
              <StyledTableCell >Batch Symbols
              </StyledTableCell>
              <StyledTableCell />
              {/* <TableCell align="left">Carbs&nbsp;(g)</TableCell>
            <TableCell align="left">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>

            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <Row changeState={changeState} key={row.batchId} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
