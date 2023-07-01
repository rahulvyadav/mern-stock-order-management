import { Request, Response } from "express";
import { responseModel } from "../../../interface";
import { ordermodel } from "../../model/orderInterface";
import orderRepository from '../../repository/index'

let response = new responseModel;
class ordercontroller {

    async orderDetails(req: Request, res: Response) {
        try {
            const orderdata: ordermodel = {
                customer_name: req.body.customer_name,
                order_qty: parseInt(req.body.order_qty),
                stockId: req.body.stockId
            }
            const orderresponse = await orderRepository.orderRepository.postOrderDetails(orderdata);
            response.status = 200
            response.message = " Order  data Added success "
            response.data = orderresponse
            response.token = null
        } catch (error) {
            console.log("resqw", error);
            response.status = 400
            response.message = error as string
            response.data = null
            response.token = null
        }
        res.send(response);
    }


    async getorderDetails(req: Request, res: Response) {

        try {

            const orderresponse = await orderRepository.orderRepository.getOrderDetails();
            response.status = 200
            response.message = " Order  data Get success "
            response.data = orderresponse
            response.token = null
        } catch (error) {
            console.log("resqw", error);
            response.status = 400
            response.message = error as string
            response.data = null
            response.token = null
        }
        res.send(response);
    }

    async deleteorderdetails(req: Request, res: Response) {
        try {
            const orderid = req.params.id;
            const orderresponse = await orderRepository.orderRepository.deleteorder(orderid);
            response.status = 200
            response.message = " Order  data Deleted success "
            response.data = orderresponse

        } catch (error) {
            console.log(error);
            response.status = 400
            response.message = error as string
            response.data = null
        }

        res.send(response);

    }










}

export default new ordercontroller();