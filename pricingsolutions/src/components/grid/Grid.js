import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { SearchState } from '@devexpress/dx-react-grid';
import { DataTypeProvider, EditingState } from '@devexpress/dx-react-grid';
import { RowDetailState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  PagingPanel,
  TableEditColumn,
  SearchPanel,
  Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import { Getter } from '@devexpress/dx-react-core';
import {
  PagingState,
  SortingState,
  IntegratedSorting,
  IntegratedPaging,
  IntegratedFiltering
} from '@devexpress/dx-react-grid';
import azure from '../../api/azure';
import { IconButton, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import 'regenerator-runtime/runtime';
import { commitChanges } from './commitChanges';
import azureService from './azureService';
import * as usersManagemnetEndpoint from '../../constants/usersManagmentEndPoints';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { PageTitle } from '../../layout-components';
import { useHistory } from 'react-router-dom';
import { Hidden } from '@material-ui/core';

export const getRowId = row => row.emailId;

const useStyles = makeStyles(theme => ({
  headerCell: {
    fontWeight: 'bold',
    fontSize: '18px',
    backgroundColor: '#4C5782',
    color: '#fff'
  },
  text: {
    fontSize: '15px',
    marginLeft: '5px',
    verticalAlign: 'middle',
    color: 'primary'
  },
  grid: {
    height: '100%'
  }
}));

export const AddButton = ({ onExecute }) => {
  const classes = useStyles();

  return (
    <div style={{ textAlign: 'center' }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={onExecute}
        title="Create new row">
        <AddCircleIcon /> <span className={classes.text}>New</span>
      </Button>
    </div>
  );
};

export const EditButton = ({ onExecute }) => {
  const classes = useStyles();
  return (
    <Button
      style={{ marginRight: '10px' }}
      variant="outlined"
      onClick={onExecute}
      title="Edit row">
      <EditIcon />
      <span className={classes.text}>Edit</span>
    </Button>
  );
};

export const DeleteButton = ({ onExecute }) => {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (window.confirm('Are you sure you want to delete this user?')) {
          onExecute();
        }
      }}
      title="Delete row">
      <DeleteIcon />
      <span className={classes.text}>Delete</span>
    </Button>
  );
};

export const CommitButton = ({ onExecute }) => {
  const classes = useStyles();
  return (
    <Button
      style={{ marginRight: '10px' }}
      variant="outlined"
      onClick={onExecute}
      title="Save changes">
      <SaveIcon />
      <span className={classes.text}>Save</span>
    </Button>
  );
};

export const CancelButton = ({ onExecute }) => {
  const classes = useStyles();
  return (
    <Button
      style={{ marginRight: '10px' }}
      variant="outlined"
      color="secondary"
      onClick={onExecute}
      title="Cancel changes">
      <CancelIcon />
      <span className={classes.text}>Cancel</span>
    </Button>
  );
};

export const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} />;
};

export const customSort = (s1, s2) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  if (s1 === s2) {
    return 0;
  }

  return s1 > s2 ? 1 : -1;
};

const HeaderCell = ({ ...props }) => {
  const classes = useStyles();
  return <TableHeaderRow.Cell {...props} className={classes.headerCell} />;
};

export default () => {
  const classes = useStyles();
  const [columns] = useState([
    { name: 'emailId', title: 'Email Id' },
    { name: 'username', title: 'User Name' },
    { name: 'userRoleName', title: 'User Role' }
  ]);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      let userRoleNames = [];
      const response = await azure.get('/api/userManagement/role-get', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.data;
      for (let i = 0; i < data.length; i++) {
        userRoleNames.push(response.data[i].userRoleName);
      }
      setUserRoles(userRoleNames);
    };
    fetchUserRoles();
  }, []);

  const BooleanFormatter = ({ value }) => <Chip label={value} />;

  const BooleanEditor = ({ value, onValueChange, row }) => {
    return (
      <Select
        input={<Input />}
        value={value}
        onChange={event => {
          onValueChange(event.target.value);
        }}
        style={{ width: '60%' }}>
        {userRoles.map(userRole => {
          return <MenuItem value={userRole}>{userRole}</MenuItem>;
        })}
      </Select>
    );
  };

  const BooleanTypeProvider = props => {
    return (
      <DataTypeProvider
        formatterComponent={BooleanFormatter}
        editorComponent={BooleanEditor}
        {...props}
      />
    );
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      await azure
        .get('/api/userManagement/users-get', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          setRows(response.data);
        });
    };
    fetchUserData();
  }, []);

  const [searchValue, setSearchState] = useState('');

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 15]);
  const [booleanColumns] = useState(['userRoleName']);

  const [filteringColumnExtensions] = useState([
    {
      predicate: (value, filter, row) => {
        if (!filter.value.length) return true;
        return IntegratedFiltering.defaultPredicate(value, filter, row);
      }
    }
  ]);

  const [tableColumnExtensions] = useState([
    {
      columnName: 'emailId',
      align: 'left',
      width: 300,
      wordWrapEnabled: 'true'
    },
    {
      columnName: 'username',
      align: 'left',
      width: 250,
      wordWrapEnabled: 'true'
    },
    {
      columnName: 'userRoleName',
      align: 'left',
      width: 250,
      wordWrapEnabled: 'true'
    }
  ]);

  return (
    <div className="flex-container">
      <Paper>
        <div data-testid="grid" className={classes.grid}>
          <Grid rows={rows} columns={columns} getRowId={getRowId}>
            <RowDetailState defaultExpandedRowIds={[]} />
            <SearchState value={searchValue} onValueChange={setSearchState} />
            <div data-testid="editingState">
              <EditingState
                onCommitChanges={async ({ added, changed, deleted }) => {
                  setRows(
                    await commitChanges(
                      { added, changed, deleted },
                      rows,
                      azureService,
                      usersManagemnetEndpoint.addEndPoint,
                      usersManagemnetEndpoint.updateEndPoint,
                      usersManagemnetEndpoint.deleteEndpoint
                    )
                  );
                }}
              />
            </div>
            <SortingState />

            <div data-testid="pagingState">
              <PagingState
                currentPage={currentPage}
                onCurrentPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
              />
            </div>

            <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
            <IntegratedSorting
            />
            <IntegratedPaging />

            <BooleanTypeProvider for={booleanColumns} />
            <Table columnExtensions={tableColumnExtensions} />
            <TableHeaderRow cellComponent={HeaderCell} />

            <TableEditRow />

            <TableEditColumn
              showAddCommand
              showEditCommand
              showDeleteCommand
              commandComponent={Command}
            />
            <Getter
              name="tableColumns"
              computed={({ tableColumns }) => {
                const result = [
                  ...tableColumns.filter(
                    c => c.type !== TableEditColumn.COLUMN_TYPE
                  ),
                  {
                    key: 'editCommand',
                    type: TableEditColumn.COLUMN_TYPE,
                    width: '15%'
                  }
                ];
                return result;
              }}
            />
            <div data-testid="pagingPanel">
              <PagingPanel pageSizes={pageSizes} />
            </div>
            <Toolbar />
            <SearchPanel />
          </Grid>
        </div>
      </Paper>
    </div>
  );
};
