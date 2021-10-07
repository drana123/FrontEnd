
export function difference(date1, date2) {
    if(date1>date2) return 0;
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    return Difference_In_Days;
}

export function getStringDate(startDate , endDate){
    var end_dd = String(endDate.getDate()).padStart(2, '0');
    var end_mm = String(endDate.getMonth() + 1).padStart(2, '0'); 
    var end_yyyy = endDate.getFullYear();

    var start_dd = String(startDate.getDate()).padStart(2, '0');
    var start_mm = String(startDate.getMonth() + 1).padStart(2, '0'); 
    var start_yyyy = startDate.getFullYear();

    startDate = start_dd + '/' + start_mm + '/' + start_yyyy;
    endDate = end_dd + '/' + end_mm + '/' + end_yyyy;

    return [startDate , endDate];
}