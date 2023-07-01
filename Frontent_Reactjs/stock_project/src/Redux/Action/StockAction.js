
import { stockAPI } from "../../ApiGateWay/apiHandler/controllers";
import { STOCK_POST_DATA, STOCK_GET_DATA, STOCK_DELETE_DATA } from "./ActionType";


export function PostStockData(data) {

    return async function (dispatch) {
        dispatch({ type: STOCK_POST_DATA.REQ_STOCK_POST_DATA })
        try {
            const res = await stockAPI.postStock(data);
            if (res.ResponseStatus === 200) {
                dispatch(GetStockData());
            }
            if (res.ResponseStatus === 400) {
                const { message } = res.data;
                dispatch({
                    type: STOCK_POST_DATA.FAIL_STOCK_POST_DATA,
                    payload: { message }
                })
            }
        } catch (error) {
            dispatch({
                type: STOCK_POST_DATA.FAIL_STOCK_POST_DATA,
                payload: { error: 'An error occurred while Getting Data' },
            });
        }

    }
}


export function GetStockData() {
    return async function (dispatch) {
        dispatch({ type: STOCK_GET_DATA.REQ_STOCK_GET_DATA })
        try {
            const res = await stockAPI.getStock();
            if (res.ResponseStatus === 200) {
                const { data } = res.Result;
                dispatch({
                    type: STOCK_GET_DATA.SUCCESS_STOCK_GET_DATA,
                    payload: data
                })
            }
            if (res.ResponseStatus === 400) {
                const { message } = res.data;
                dispatch({
                    type: STOCK_GET_DATA.FAIL_STOCK_GET_DATA,
                    payload: { message }
                })
            }
        } catch (error) {
            dispatch({
                type: STOCK_GET_DATA.FAIL_STOCK_GET_DATA,
                payload: { error: 'An error occurred while Getting Data' },
            });
        }

    }
}


export function DeleteStockData(stockId) {
    return async function (dispatch) {

        dispatch({ type: STOCK_DELETE_DATA.REQ_STOCK_DATA })
        try {
            const res = await stockAPI.deleteStock(stockId);
            if (res.ResponseStatus === 200) {
                dispatch(GetStockData());
            }

            if (res.ResponseStatus === 400) {
                const { message } = res.data;
                dispatch({
                    type: STOCK_DELETE_DATA.FAIL_STOCK_DELETE_DATA,
                    payload: { message }
                })
            }
        } catch (error) {
            dispatch({
                type: STOCK_DELETE_DATA.FAIL_STOCK_DELETE_DATA,
                payload: { error: 'An error occurred while Getting Data' },
            });
        }

    }
}























