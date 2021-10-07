import axios from "axios";
import { baseURL } from "../constants/apiEndPoints";


export default axios.create({
    baseURL : baseURL,
    headers : {
        "Ocp-Apim-Trace": "true",
    }
});