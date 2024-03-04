import { Router } from "express";
import { UserAuthenticate } from "../controllers/authController.js";
import { ShopController } from "../controllers/shopController.js";



const shopRouter = Router();

//welcome Message
shopRouter.get("/welcomeMessage", ShopController.shop.getWelcomeMessage);

//banners - Alphabetical Order
shopRouter.get("/banners", ShopController.shop.getBanners);

//category - Alphabetical Order
shopRouter.get("/category", ShopController.shop.getCategory);


//product -Alphabetical Order
shopRouter.post("/categoryProducts", ShopController.shop.getCategoryProducts);

//foryou
shopRouter.get("/forYou", UserAuthenticate, ShopController.shop.getForyou);

//hotdeals
shopRouter.get("/hotDeals", UserAuthenticate, ShopController.shop.hotDeals);

//faq
shopRouter.get("/faq", ShopController.shop.listFaq);

//bulkOrders
shopRouter.post("/bulkOrders", ShopController.shop.bulkOrders);


//fabricslist
shopRouter.get("/listFabrics", UserAuthenticate, ShopController.shop.listFabircs);

//contact page
shopRouter.post("/contactPage", UserAuthenticate, ShopController.shop.contactPage);

export { shopRouter };