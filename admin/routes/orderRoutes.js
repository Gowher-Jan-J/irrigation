import { Router } from 'express'
import { adminAuthenticate } from '../controllers/authController.js';
import { OrderController } from '../controllers/orderController.js';


const orderRouter = Router()



//orders
orderRouter.get("/", adminAuthenticate, OrderController.Order.getOrders);
orderRouter.post("/orderDetails", adminAuthenticate, OrderController.Order.getSingleOrder);
orderRouter.post("/orderStatus", adminAuthenticate, OrderController.Order.updateOrderStatus);

orderRouter.post("/trackingInfo", adminAuthenticate, OrderController.Order.trackingInfo);

//vendor
orderRouter.get("/vendorTracking", adminAuthenticate, OrderController.Order.vendorTracking);
orderRouter.post("/getOne", adminAuthenticate, OrderController.Order.getOneVendorTracking);

export { orderRouter }