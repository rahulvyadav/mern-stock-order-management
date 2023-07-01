import { Router } from 'express';
import ordercontroller from '../../controller/index';


const router = Router();

router.get('/getorder', ordercontroller.ordercontroller.getorderDetails);

router.post('/postorder', ordercontroller.ordercontroller.orderDetails);

router.delete('/deleteorder/:id', ordercontroller.ordercontroller.deleteorderdetails);

export default router;