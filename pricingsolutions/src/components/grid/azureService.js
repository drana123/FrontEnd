import azure from "../../api/azure"
import {POST,GET, PUT, DELETE} from "../../constants/apiMethods";

export default async (type, url, params)=>{
    if(type ===GET)
        return await azure.get(url, {headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }}).catch((e)=>{return e})
    if(type === POST)
        return await azure.post(url, params, {headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }}).catch((e)=>{return e})
    if(type === PUT)
        return await azure.put(url, params, {headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }}).catch((e)=>{return e})
    if(type == DELETE)
        return await azure.delete(url, {headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }}).catch((e)=>{return e});
}