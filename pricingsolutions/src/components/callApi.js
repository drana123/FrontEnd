import azure from '../api/azure';
import { GET_URL, POST_URL, PUT_URL } from '../constants/apiConfigurationConstants'
export default function callApi(reqType, values, setValues, setResponseObject) {
  if (reqType === "GET") {
    // console.log("GET HIT")
    azure.get(GET_URL, {headers : {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`
  }} )
      .then(response => response.data)
      .then((result) => {
        setValues(result);
        
        // console.log(values);
        setResponseObject(result)
      })
      .catch(function (error) {
        if (error.response) {
        }
      });


  }
  else if (reqType === "PUT") {
    azure.put(PUT_URL, values, {headers : {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`
  }})
      .then((response) => {  })
      .catch(function (error) {
        if (error.response) {
        }
      });
  }
  else {
    azure.post(POST_URL, values, {headers : {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`
  }})
      .then((response) => { })
      .catch(function (error) {
        if (error.response) {
        }
      });
  }
}
