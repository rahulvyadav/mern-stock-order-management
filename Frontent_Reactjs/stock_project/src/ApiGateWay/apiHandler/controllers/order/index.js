
import { commanResponse } from '../../../apiUtils/models/commonResponse';
import OrderService from '../../services/index';
import { ResponseStatus } from '../../../apiUtils/interfacesAndTypes';
export const orderController = {
    postOrder, getOrder, deleteOrder
};

async function postOrder(object) {
    try {
        let responseOBJ = new commanResponse();
        const response = await OrderService.OrderService.postOrder(object);

        if (response) {
            responseOBJ.Status = response?.status === 200 ? true : false;
            responseOBJ.Result = response?.data ? response?.data : undefined;
            responseOBJ.ResponseStatus = response.status;
        }
        return responseOBJ;
    } catch (error) {
        console.log('error From controller::>', error);
    }
}


async function getOrder() {
    try {
        let responseOBJ = new commanResponse();
        const response = await OrderService.OrderService.GetOrder();

        if (response) {
            responseOBJ.Status = response?.status === 200 ? true : false;
            responseOBJ.Result = response?.data ? response?.data : undefined;
            responseOBJ.ResponseStatus = response.status;
        }

        return responseOBJ;
    } catch (error) {
        console.log('error From controller::>', error);
    }
}

async function deleteOrder(orderId) {

    try {
        let responseOBJ = new commanResponse();
        const response = await OrderService.OrderService.DeleteOrder(orderId);

        if (response) {
            responseOBJ.Status = response?.status === 200 ? true : false;
            responseOBJ.Result = response?.data ? response?.data : undefined;
            responseOBJ.ResponseStatus = response.status;
        }

        return responseOBJ;
    } catch (error) {
        console.log('error From controller::>', error);
    }
}
