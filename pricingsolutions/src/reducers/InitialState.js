import setDefaultpreferences from "./setDefaultpreferences"

const InitialState = {
    data : [],
    rows : [],
    preference : setDefaultpreferences(),
    loadingStatus :  {
       marketPriceLoadingStatus : false,
       userPrefLoadingStatus : false,
       saveUserLoadingStatus : false,
    },
    ErrorStatus : {
      marketPriceErrorStatus : false,
      userPrefErrorStatus : false,
      saveUserErrorStatus : false,
    },
    isHavingPreference : 0,
    fullRangeOfMarketPrice : [0,10000],
    fullRangeOfMarketOpen : [0,10000],
    fullRangeOfMarketHigh : [0,10000],
    fullRangeOfMarketLow : [0,10000]
  }

export default InitialState;

