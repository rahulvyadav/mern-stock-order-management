import { Request, Response } from "express";
import { responseModel } from "../../../interface";
import { stockmodel } from "../../model/stockInterface";
import stockRepository from '../../repository/index'




let response = new responseModel;
class stockcontroller {

    async stockDetail(req: Request, res: Response) {

        try {

            const stockdata: stockmodel = {
                stock_name: req.body.stock_name,
                stock_qty: parseInt(req.body.stock_qty),
            }

            const stockresponse = await stockRepository.stockRepository.postStockDetails(stockdata);
            response.status = 200
            response.message = " stock  data Added success "
            response.data = stockresponse
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



    async getStockDetails(req: Request, res: Response) {

        try {
            const stockresponse = await stockRepository.stockRepository.getStockDetails();
            response.status = 200
            response.message = " stock  data Get success "
            response.data = stockresponse
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


    async deletestockdetails(req: Request, res: Response) {
        try {
            const stockid = req.params.id;
            const stockresponse = await stockRepository.stockRepository.deletestock(stockid);
            response.status = 200
            response.message = " stock  data Deleted success "
            response.data = stockresponse

        } catch (error) {
            console.log(error);
            response.status = 400
            response.message = error as string
            response.data = null
        }

        res.send(response);

    }



}

export default new stockcontroller();