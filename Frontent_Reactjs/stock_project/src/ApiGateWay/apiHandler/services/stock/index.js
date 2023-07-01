import { requestMethod } from '../../../apiUtils/constants';
import { requestModel } from '../../../apiUtils/models/requestModel';
import { axiosRepository } from '../../repository';
import stockEndPoints from '../../../apiEndPoints/index';

export const StockService = {

    PostStock: async (body) => {
        const reqestObj = new requestModel();
        try {
            reqestObj.method = requestMethod.POST;
            reqestObj.url = stockEndPoints.stockEndPoints.POST_STOCK;
            reqestObj.data = body;
            return await axiosRepository.request(reqestObj);
        } catch (error) {
            console.log('error from services::>', error);
        }
    },


    GetStock: async (body) => {
        const reqestObj = new requestModel();
        try {
            reqestObj.method = requestMethod.GET;
            reqestObj.url = stockEndPoints.stockEndPoints.GET_ALL_STOCK;
            reqestObj.data = body;
            return await axiosRepository.request(reqestObj);
        } catch (error) {
            console.log('error from services::>', error);
        }
    },

    DeleteStock: async (stockId) => {
        const reqestObj = new requestModel();
        try {
            reqestObj.method = requestMethod.DELETE;
            reqestObj.url = stockEndPoints.stockEndPoints.DELETE_STOCK(stockId);
            reqestObj.data = null;
            return await axiosRepository.request(reqestObj);
        } catch (error) {
            console.log('error from services::>', error);
        }
    },














};
