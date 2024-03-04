import { Router } from "express";
import { ProductController } from "../controllers/productController.js";
import { UserAuthenticate } from "../controllers/authController.js";



const productRouter = Router();


//all products
productRouter.post("/", ProductController.Product.getFilters);

//list single product variant
productRouter.post("/variant", UserAuthenticate, ProductController.Variant.getVariant);

//product Specifications
productRouter.post("/specification", UserAuthenticate, ProductController.Product.getSpecs);

//recommended
productRouter.get("/recommended", ProductController.Product.getRecommended);

export { productRouter };