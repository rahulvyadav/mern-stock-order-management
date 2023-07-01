import { ORDER_GET_DATA } from "../Action/ActionType"

const initialState = {
    orderData: [],
    loading: false,
    error: null
}

export const orderDataReducer = (state = initialState, action) => {

    switch (action.type) {

        case ORDER_GET_DATA.REQ_ORDER_GET_DATA:
            return { ...state, loading: true }

        case ORDER_GET_DATA.SUCCESS_ORDER_GET_DATA:
            return { ...state, orderData: action.payload, loading: false, error: null }

        case ORDER_GET_DATA.FAIL_ORDER_GET_DATA:
            return { ...state, loading: false, error: action.payload }

        default:
            return state;
    }

}
