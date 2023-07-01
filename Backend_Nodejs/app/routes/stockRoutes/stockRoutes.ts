import { Router } from 'express';
import stockcontroller from '../../controller/index';


const router = Router();

router.get('/getstock', stockcontroller.stockcontroller.getStockDetails);

router.post('/poststock', stockcontroller.stockcontroller.stockDetail);

router.delete('/deletestock/:id', stockcontroller.stockcontroller.deletestockdetails);


export default router;