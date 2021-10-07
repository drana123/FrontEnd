import React, { Fragment } from 'react';
import Input from '../../../components/Input'
import { useForm } from '../../../components/useForm';
import Button from '../../../components/Button';
import { Form } from '../../../components/Form';
import callApi from '../../../components/callApi';
import { useState, useEffect } from 'react';

import {
  Grid,
  Card,
} from '@material-ui/core';

import { TextField } from '@material-ui/core';
import { SuccessNotification } from '../../../example-pages/RegularTables1/pricingScreen/GridViewComponents/Notification';


const modelObject = {
  apiEndpointId: '',
  apiEndpointUrl: '',
  region: '',
  symbols: '',
  apiHost: '',
  apiKey: '',
  frequency: 'Daily'

};
const modelObjectRef = {
  apiEndpointId: '',
  apiEndpointUrl: '',
  region: '',
  symbols: '',
  apiHost: '',
  apiKey: '',
  frequency: ''

};

export default function LivePreviewExample() {
  const [currency, setCurrency] = React.useState('EUR');
  const {
    values,
    setValues,
    handleInputChange,
    resetForm
  } = useForm(modelObject);

  const handleSubmit = e => {
    e.preventDefault();
    if (responseObject.apiEndpointId === "") {
      callApi("POST", values, setValues, setResponseObject);
    }
    else {
      callApi("PUT", values, setValues, setResponseObject);
      SuccessNotification("API Configuration updated")
    }

  }



  const [responseObject, setResponseObject] = useState(modelObjectRef)
  useEffect(() => {
    callApi("GET", values, setValues, setResponseObject);

  }, [])




  const handleChange = event => {
    setCurrency(event.target.value);
  };

  const [value2, setValue2] = React.useState('Controlled');

  const handleChange2 = event => {
    setValue2(event.target.value);
  };

  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false
  });

  const handleChange3 = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;

  const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item >
          <Card className="p-4 mb-4">
            {/* <div className="font-size-lg font-weight-bold">Controls types</div> */}
            {/* <Divider className="my-4" /> */}
            {/* <Grid container spacing={4}> */}
            <Form onSubmit={handleSubmit}>
              <Grid class container data-testid="unique">
                <Grid item justifyContent="center" xs={12}>
                  {/* <Input datatestid="endpointInput" name="apiEndpointId" label ="API Endpoint Id" value={values.apiEndpointId} onChange={handleInputChange} /> */}
                  <Input name="apiEndpointUrl" label="Endpoint URL" value={values.apiEndpointUrl} onChange={handleInputChange} />
                  <Input name="region" label="Region" value={values.region} onChange={handleInputChange} />
                  {/* <Input name="symbols" label="Symbols *Enter comma separated symbols" value={values.symbols} onChange={handleInputChange} /> */}
                  
                    <TextField
                      id="standard-multiline"
                      name = "symbols"
                      label="Symbols *Enter comma separated symbols"
                      multiline
                      rows={3}
                      value={values.symbols}
                      onChange = {handleInputChange}
                      variant="outlined"
                    />
                
                  <Input name="apiHost" label="API Host" value={values.apiHost} onChange={handleInputChange} />
                  <Input name="apiKey" label="Nightly Batch Frequency" value={values.frequency} onChange={handleInputChange} /><br />
                  <Input name="apiKey" label="API Key" type="password" value={values.apiKey} onChange={handleInputChange} /><br />
                  {/* <SimpleMenu menuNameValue={values.frequency} handleClick = {handleClick} /> */}
                  <Button type="submit" text="Submit" onClick={handleSubmit} />
                </Grid>
              </Grid>
            </Form>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}
