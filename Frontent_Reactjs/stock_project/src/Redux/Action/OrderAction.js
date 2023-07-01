
import { orderAPI } from "../../ApiGateWay/apiHandler/controllers";
import { ORDER_POST_DATA, ORDER_GET_DATA, ORDER_DELETE_DATA } from "./ActionType";


export function PostOrder(userdata) {
    return async function (dispatch) {
        dispatch({ type: ORDER_POST_DATA.REQ_ORDER_POST_DATA })
        try {
            const res = await orderAPI.postOrder(userdata);
            if (res.ResponseStatus === 200) {
                dispatch(GetOrder());
            }

            if (res.ResponseStatus === 400) {
                const { error } = res.data;
                dispatch({
                    type: ORDER_POST_DATA.FAIL_ORDER_POST_DATA,
                    payload: { error },
                })
            }
        } catch (error) {
            dispatch({
                type: ORDER_POST_DATA.FAIL_ORDER_POST_DATA,
                payload: { error: 'An error occurred while Adding Data' },
            });
        }
    }

}




export function GetOrder() {

    return async function (dispatch) {
        dispatch({ type: ORDER_GET_DATA.REQ_ORDER_GET_DATA })
        try {
            const res = await orderAPI.getOrder();


            if (res.Result.status === 200) {
                localStorage.setItem("loginToken", JSON.stringify(res.Result.token))
                dispatch({
                    type: ORDER_GET_DATA.SUCCESS_ORDER_GET_DATA,
                    payload: res.Result,
                })

            }

            if (res.Result.status === 400) {
                dispatch({
                    type: ORDER_GET_DATA.FAIL_ORDER_GET_DATA,
                    payload: res.data,
                })
            }
        } catch (error) {
            dispatch({
                type: ORDER_GET_DATA.FAIL_ORDER_GET_DATA,
                payload: { error: 'An error occurred while Adding Data' },
            });
        }
    }

}

export function DeleteOrderData(orderId) {
    return async function (dispatch) {

        dispatch({ type: ORDER_DELETE_DATA.REQ_ORDER_DATA })
        try {
            const res = await orderAPI.deleteOrder(orderId);


            if (res.ResponseStatus === 200) {
                dispatch(GetOrder());
            }

            if (res.ResponseStatus === 400) {
                const { message } = res.data;
                dispatch({
                    type: ORDER_DELETE_DATA.FAIL_ORDER_DELETE_DATA,
                    payload: { message }
                })
            }
        } catch (error) {
            dispatch({
                type: ORDER_DELETE_DATA.FAIL_ORDER_DELETE_DATA,
                payload: { error: 'An error occurred while Getting Data' },
            });
        }

    }
}




