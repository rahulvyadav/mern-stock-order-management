import { STOCK_GET_DATA } from "../Action/ActionType"

const initialState = {
    stockData: [],
    loading: false,
    error: null
}

export const stockDataReducer = (state = initialState, action) => {

    switch (action.type) {

        case STOCK_GET_DATA.REQ_STOCK_GET_DATA:
            return { ...state, loading: true }

        case STOCK_GET_DATA.SUCCESS_STOCK_GET_DATA:
            return { ...state, stockData: action.payload, loading: false, error: null }

        case STOCK_GET_DATA.FAIL_STOCK_GET_DATA:
            return { ...state, loading: false, error: action.payload }


        default:
            return state;
    }

}
