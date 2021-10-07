import axios from "axios";
import { loginRequest } from "../../authConfig";
import { baseURL } from "../../constants/apiEndPoints";
import { callMsGraph } from "../../../src/api/graph";


export default async function loginApiCall (endPoint, instance, history,  storage,)  {
  instance
    .loginPopup(loginRequest)
    
    .then( async (arg) =>{
     
    //  console.log(localStorage.getItem("mitoken"),"mitoken") ;
      await axios.get(baseURL + endPoint+arg.account.username, {
        headers : {
          "Ocp-Apim-Trace": "true",
          "Authorization" : `Bearer ${arg.idToken}`
      }
      })
      .then((res) => {
       //  localStorage.setItem("mitoken",arg.idToken);
        console.log(res); 
         callMsGraph(arg.idToken);
        
        if (res.data.userRole != null) {
          let ourUser = arg.account.name;
          ourUser = ourUser===undefined ? "Guest" : ourUser;
          storage.setItem("Name" , ourUser);
          storage.setItem("Email",arg.account.username);
          storage.setItem("token",res.data.jwtToken)
          if(res.data.userRole=="Admin")
            storage.setItem("userRole","admin");
          else
            storage.setItem("userRole", res.data.userRole);
          history.push("/pricingView");
        } 
        else {
            console.log(res.data.message);
            instance.logoutRedirect({
            postLogoutRedirectUri: "/notfound",
            mainWindowRedirectUri: "/notfound",
          });
          history.push("/notfound");

        }
      }).catch((e) => {
        console.log(e);
      }
      
    )
  })
  .catch(e=>{
    console.log(e);
  });
}