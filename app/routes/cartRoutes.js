import { Router } from "express";
// import { Resizer } from "../../core/utils/imageResizer.js";
import { UserAuthenticate } from "../controllers/authController.js";
import { CartController } from "../controllers/cartController.js";



const cartRouter = Router();



//normal & custom cart

cartRouter.get("/", UserAuthenticate, CartController.Cart.getCart);
cartRouter.get("/count", UserAuthenticate, CartController.Cart.getCartCount);
cartRouter.post("/addCart", UserAuthenticate, CartController.Cart.addCart);
// cartRouter.post("/addCustomCart", UserAuthenticate, Resizer, CartController.Cart.addCustomCart);
cartRouter.post("/buy", UserAuthenticate, CartController.Cart.addCart);
cartRouter.post("/updateCart", UserAuthenticate, CartController.Cart.updateCart);
cartRouter.post("/removeCart", UserAuthenticate, CartController.Cart.removeCart);

//measurements
cartRouter.get("/getAllMeasurements", UserAuthenticate, CartController.Cart.getAllMeasurements);
cartRouter.post("/getOneMeasurements", UserAuthenticate, CartController.Cart.getOneMeasurements);
cartRouter.post("/updateMeasurements", UserAuthenticate, CartController.Cart.updateMeasurements);
cartRouter.post("/deleteMeasurements", UserAuthenticate, CartController.Cart.deleteMeasurements)

export { cartRouter };