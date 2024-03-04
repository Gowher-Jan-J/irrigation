import { Router } from "express";
import { UserAuthenticate } from "../controllers/authController.js";
import { OrderController } from "../controllers/orderController.js";



const orderRouter = Router();



//orders
orderRouter.get("/", UserAuthenticate, OrderController.Orders.getOrders);
orderRouter.post("/getOrder", UserAuthenticate, OrderController.Orders.getsingleOrders);

//purchase
// orderRouter.post("/buy", UserAuthenticate, OrderController.Orders.buyNow);

orderRouter.post("/checkout", UserAuthenticate, OrderController.Orders.checkout);
orderRouter.post("/payment", UserAuthenticate, OrderController.Orders.makePayment);

export { orderRouter }