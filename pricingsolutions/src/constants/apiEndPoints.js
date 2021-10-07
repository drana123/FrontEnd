import { map } from "async";

export const loginApiEndPoint = `/api/userManagement/user-authorization-get?email=`


const URLMap = new Map();

URLMap.set('https://ase-price-frontend-devl-01.azurewebsites.net', "https://apim-price-prod-02.azure-api.net");
URLMap.set('https://ase-price-frontend-intg-01.azurewebsites.net', "https://apim-price-intg-02.azure-api.net");
URLMap.set('https://ase-price-frontend-prod-01.azurewebsites.net', "https://apim-price-prod-02.azure-api.net");
URLMap.set('http://localhost:3000', "https://apim-price-devl-02.azure-api.net");

export const baseURL = URLMap.get(window.location.origin);

