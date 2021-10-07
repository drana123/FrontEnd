
export const modifyData = (data) => {
    var rows = [...data];
    for (var i = 0; i < data.length; i++) {
      if (data[i].tradeable === true) rows[i].tradeable = "Yes";
      else rows[i].tradeable = "No";
      rows[i].createdAt = String(data[i].createdAt.substring(0,10)+" "+data[i].createdAt.substring(11,16));
    }
    return rows;
};
  