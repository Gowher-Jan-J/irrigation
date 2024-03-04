import { Router } from "express";
// import { Resizer } from "../../core/utils/imageResizer.js";
import { UserAuthenticate } from "../controllers/authController.js";
import { ShopController } from "../controllers/shopController.js";



const searchRouter = Router();


//search products
searchRouter.post("/", UserAuthenticate, ShopController.shop.getSearchResults);




export { searchRouter };