import React , {Fragment}from 'react';
import { withStyles } from '@material-ui/core/styles';
import { modifyData } from "./modifyData";
import {columns} from './constants';
import {onSave} from './onSave';
import useColumnWidth from "./useColumnWidth";
import useTableColumnExtensions from './useTableExtension';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import './gridView.css'
import {
  Grid, Table, TableHeaderRow, PagingPanel, Toolbar, SearchPanel, TableFilterRow,
  ExportPanel, TableGroupRow,
  GroupingPanel,
  DragDropProvider, TableColumnResizing
} from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState, IntegratedSorting, PagingState, SearchState, FilteringState, IntegratedFiltering, DataTypeProvider,
  IntegratedPaging, GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import { useState, useRef, useCallback, useEffect } from 'react';
import configureStore from '../../../../config/configureStore';
import { GridExporter } from '@devexpress/dx-react-grid-export';

import { CurrencyEditorBase } from './CurrencyEditorBase';
import { connect } from 'react-redux';
import  PageTitle  from '../../../../layout-components/PageTitle/index';
import * as ActionCreator from "../../../../Actions/preferenceUpdateAction";
const styles = theme => ({
    root: {
      margin: theme.spacing(0),
    },
    numericInput: {
      fontSize: '14px',
      textAlign: 'left',
      width: '100%',
    },
  });
  
  const store = configureStore();

const CurrencyEditor = withStyles(styles)(CurrencyEditorBase);

function GridView(props) {


    const exporterRef = useRef(null);
    const startExport = useCallback(() => {exporterRef.current.exportGrid();}, [exporterRef]);
    const { columnWidths, setColumnWidths } = useColumnWidth();
    const tableColumnExtensions = useTableColumnExtensions();
    const [rows, setRows] = useState(props.rows);
    const [filters, setFilters] = useState(props.preference.filters);
    const [sorting, setSorting] = useState(props.preference.sorting);
    const [currentPage, setCurrentPage] = useState(props.preference.currentPage);
    const [pageSize, setPageSize] = useState(props.preference.pageSize);
    const [pageSizes] = useState([15, 20, 25,30]);
    const [searchValue, setSearchState] = useState("");
    const [groups, setGroups] = useState(props.preference.groups);
    const [currencyColumns] = useState(["marketQuoteId", "regularMarketPrice", "regularMarketChange", "regularMarketChangePercentage", "regularMarketDayHigh", "regularMarketDayLow", "regularMarketVolume", "regularMarketOpen", "trailingPe", "priceToSales", "forwardPe", "symbolId"]);
    const [currencyFilterOperations] = useState(["equal","notEqual","greaterThan","greaterThanOrEqual","lessThan","lessThanOrEqual",]);
  
    useEffect(() => {
        setRows(modifyData(props.rows));
        setFilters(props.preference.filters);
        setSorting(props.preference.sorting);
        setCurrentPage(props.preference.currentPage);
        setPageSize(props.preference.pageSize);
        setGroups(props.preference.groups); 
    },[props.rows , props.preference]);
    
    var Email = localStorage.getItem("Email");
    const history = useHistory();
    if (Email === null || Email === undefined) {
      
        history.push("/");
        return (<></>);
    }
    else 
    {
        return (
          <Fragment>
            <PageTitle
              titleHeading="Pricing Screen"
            />
            <div className="pricingScreen">
                  <Paper>
                    <Grid rows={rows} columns={columns}>
                      <SearchState
                        value={searchValue}
                        onValueChange={setSearchState}
                      />
                      <DataTypeProvider
                        for={currencyColumns}
                        availableFilterOperations={currencyFilterOperations}
                        editorComponent={CurrencyEditor}
                      />
                      <FilteringState
                        filters={filters}
                        onFiltersChange={(newFilters) => {setFilters(newFilters); props.handleFilterChange(newFilters)}}/>
                      <IntegratedFiltering />

                      <SortingState
                        sorting={sorting}
                        onSortingChange={(newSorting) => {setSorting(newSorting); props.handleSortingChange(newSorting)}}
                      />
                      <IntegratedSorting />
                      <DragDropProvider />
                      <GroupingState
                        grouping={groups}
                        onGroupingChange={(newGroups)=>{setGroups(newGroups); props.handleGroupsChange(newGroups);}}
                        columnExtensions={tableColumnExtensions}
                      />
                      <IntegratedGrouping />
                      <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={(newCurrentPage) => {setCurrentPage(newCurrentPage); props.handleCurrentPageChange(newCurrentPage);}}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => {setPageSize(newPageSize); props.handlePageSizeChange(newPageSize);}}
                      />
                      <IntegratedPaging />
                      <Table columnExtensions={tableColumnExtensions} />
                      <TableColumnResizing
                        columnWidths={columnWidths}
                        onColumnWidthsChange={setColumnWidths}
                        // minColumnWidth={ minColumnWidth } 
                        />
                        <TableHeaderRow showSortingControls />
                        <TableGroupRow />
                        <TableFilterRow
                          showFilterSelector
                        />
                        <PagingPanel pageSizes={pageSizes} />
                        <Toolbar />
                        <SearchPanel />
                        <GroupingPanel showGroupingControls />
                        <ExportPanel startExport={startExport} />

                      </Grid>
                      <GridExporter
                        ref={exporterRef}
                        rows={rows}
                        columns={columns}
                        sorting={sorting}
                        onSave={onSave}
                      />
                    </Paper>
                </div>
            </Fragment>  
        );
    }

}


export const mapStateToProps = (state)=> {
  return {
  rows : state.fetchApiReducer.rows,
  preference : state.fetchApiReducer.preference,
  isHavingPreference : state.fetchApiReducer.isHavingPreference,
  }
};

export const mapDispatchToprops = (dispatch) => {
  return {
    handleFilterChange : (data) => {dispatch(ActionCreator.updateFiltersAction(data))},
    handleSortingChange : (data) => {dispatch(ActionCreator.updateSortingAction(data))},
    handleCurrentPageChange : (data) => {dispatch(ActionCreator.updateCurrentPageAction(data))},
    handleGroupsChange : (data) => {dispatch(ActionCreator.updateGroupsAction(data))},
    handlePageSizeChange : (data) => {dispatch(ActionCreator.updatePageSizeAction(data))}
  }
}
export default connect(mapStateToProps,mapDispatchToprops)(GridView);