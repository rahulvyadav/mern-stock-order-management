
import { combineReducers } from "redux";
import { stockDataReducer } from "./stockDataReducer";
import { orderDataReducer } from "./orderDataReducer";






export const rootReducer = combineReducers({
    stockData: stockDataReducer,
    orderData: orderDataReducer

})
