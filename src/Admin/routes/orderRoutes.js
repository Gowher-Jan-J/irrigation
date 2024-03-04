import { Router } from 'express'
import { adminAuthenticate } from '../controller/auth.Controller.js';
import { OrderController } from '../controller/order.Controller.js';


const orderRouter = Router()



//orders
orderRouter.get("/", adminAuthenticate, OrderController.Order.getOrders);
orderRouter.post("/orderDetails", adminAuthenticate, OrderController.Order.getSingleOrder);
orderRouter.post("/orderStatus", adminAuthenticate, OrderController.Order.updateOrderStatus);

orderRouter.post("/trackingInfo", adminAuthenticate, OrderController.Order.trackingInfo);
export { orderRouter }