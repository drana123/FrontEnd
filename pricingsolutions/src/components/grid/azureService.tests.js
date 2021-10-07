import azureService from "./azureService";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";


describe("azure Service tests", ()=>{
    it("get request test",()=>{
        let mock = new MockAdapter(axios);
        let resp = {};
        mock.onPost("https://apim-price-intg-02.azure-api.net/api/userManagement/user-add").reply(200, resp);
        azureService("POST", "api/userManagement/user-add", null );
        console.log(mock.history);

        expect(mock.history.post.url).toEqual("https://apim-price-intg-02.azure-api.net/api/userManagement/user-delete/");

    })
})