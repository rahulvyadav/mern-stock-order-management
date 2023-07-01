import { requestMethod } from '../../../apiUtils/constants';
import { requestModel } from '../../../apiUtils/models/requestModel';
import { axiosRepository } from '../../repository';
import orderEndPoints from '../../../apiEndPoints/index';

export const OrderService = {
    postOrder: async (body) => {
        const reqestObj = new requestModel();
        try {
            reqestObj.method = requestMethod.POST;
            reqestObj.url = orderEndPoints.orderEndPoints.POST_ORDER;
            reqestObj.data = body;
            return await axiosRepository.request(reqestObj);
        } catch (error) {
            console.log('error from services::>', error);
        }
    },


    GetOrder: async (body) => {
        const reqestObj = new requestModel();
        try {
            reqestObj.method = requestMethod.GET;
            reqestObj.url = orderEndPoints.orderEndPoints.GET_ALL_ORDER;
            reqestObj.data = body;
            return await axiosRepository.request(reqestObj);
        } catch (error) {
            console.log('error from services::>', error);
        }
    },


    DeleteOrder: async (orderId) => {
        const reqestObj = new requestModel();
        try {
            reqestObj.method = requestMethod.DELETE;
            reqestObj.url = orderEndPoints.orderEndPoints.DELETE_ORDER(orderId);
            reqestObj.data = null;
           
            return await axiosRepository.request(reqestObj);
        } catch (error) {
            console.log('error from services::>', error);
        }
    },



};
