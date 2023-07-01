
import { commanResponse } from '../../../apiUtils/models/commonResponse';

import StockService from '../../services/index';
import { ResponseStatus } from '../../../apiUtils/interfacesAndTypes';
export const stockController = {
    postStock, getStock, deleteStock
};

async function postStock(object) {
    try {

        let responseOBJ = new commanResponse();
        const response = await StockService.StockService.PostStock(object);
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


async function getStock() {
    try {
        let responseOBJ = new commanResponse();
        const response = await StockService.StockService.GetStock();
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


async function deleteStock(stockId) {

    try {
        let responseOBJ = new commanResponse();
        const response = await StockService.StockService.DeleteStock(stockId);

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











