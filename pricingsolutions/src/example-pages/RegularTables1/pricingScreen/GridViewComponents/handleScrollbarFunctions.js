export const allFilters = (r1,r2,r3,r4 , data) =>{
    if (data===undefined|| r1===undefined || r2 ===undefined || r3===undefined || r4===undefined) return data;
    const newRows = data.filter((row) => { return (row.regularMarketPrice >= r1[0] && row.regularMarketPrice <= r1[1]) &&
        (row.regularMarketDayHigh >= r3[0] && row.regularMarketDayHigh <= r3[1]) &&
        (row.regularMarketOpen >= r2[0] && row.regularMarketOpen <= r2[1]) &&
        (row.regularMarketDayLow >= r4[0] && row.regularMarketDayLow <= r4[1]) });
    return newRows;
}

