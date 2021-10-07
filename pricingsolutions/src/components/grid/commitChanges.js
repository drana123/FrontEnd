import 'regenerator-runtime/runtime' 
import {POST,GET, PUT, DELETE} from "../../constants/apiMethods";

export const commitChanges = async ({ added, changed, deleted }, rows, azureService, addEndPoint, updateEndPoint, deleteEndpoint) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].emailId : "";
  
      const params = {
        emailId: added[0].emailId,
        username: added[0].username,
        userRoleName: added[0].userRoleName,
      };
      const response = await azureService(POST,addEndPoint, params)
      if (response.data.status == null) {
        changedRows = [
          ...rows,
          ...added.map((row, index) => ({
            emailId: startingAddedId + index,
            ...row,
          })),
        ];
      }
    }
    if (changed) {
      const email = Object.keys(changed)[0];
      if(changed[email]== null || changed[email]===undefined)
        return rows;
      const selectedRow = rows.filter((row) => row.emailId === email);
      const userRole = changed[email].userRoleName;
      const username = changed[email].username;
      const params = {
        emailId: email,
        userRoleName: userRole ? userRole : selectedRow[0].userRoleName,
        username: username ? username : selectedRow[0].username,
      };
      
        const response = await azureService(PUT,
            updateEndPoint,
            params
        );

        if (response.data.emailId) {
        changedRows = rows.map((row) =>
          changed[row.emailId] ? { ...row, ...changed[row.emailId] } : row
        );
      }
    }
  
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter((row) => !deletedSet.has(row.emailId));
      const email = deleted[0];
      const response = await azureService(DELETE,
        deleteEndpoint + email
      );
    }
    return changedRows;
  };
  