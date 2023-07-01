
import express from 'express';

import orderRoutes from './orderRoutes/orderRoutes';
import stockRoutes from './stockRoutes/stockRoutes'

const router = express.Router();

router.use('/stockproject', orderRoutes);

router.use('/stockproject', stockRoutes)

export default router