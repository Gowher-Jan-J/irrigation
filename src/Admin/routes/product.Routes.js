import { Router } from 'express'
import { ImageUploader, Resizer } from '../../core/utils/imageResizer.js';
import { adminAuthenticate } from '../controller/auth.Controller.js';
import { ProductController } from '../controller/product.Controller.js';


const productRouter = Router()



//category
productRouter.get("/getCategory", adminAuthenticate, ProductController.Category.getCategory);
productRouter.post("/addCategory", adminAuthenticate, Resizer, ProductController.Category.addCategory);
productRouter.post("/updateCategory", adminAuthenticate, Resizer, ProductController.Category.updateCategory);

//product
productRouter.get("/getProduct/:productId", adminAuthenticate, ProductController.Product.getProduct);
productRouter.post("/addProduct", adminAuthenticate, Resizer, ProductController.Product.addProduct);
productRouter.post("/updateProduct", adminAuthenticate, Resizer, ProductController.Product.updateProduct);
productRouter.post("/deleteProduct", adminAuthenticate, ProductController.Product.deleteProduct);

// //Recommend product
// productRouter.get("/recommendProduct", adminAuthenticate, ProductController.Product.getRecommendProduct);
// productRouter.post("/addRecommendProduct", adminAuthenticate, ProductController.Product.addRecommendProduct);
// productRouter.post("/deleteRecommendProduct", adminAuthenticate, ProductController.Product.deleteRecommendProduct);


// //product variant
// productRouter.post("/getVariant", adminAuthenticate, ProductController.Variant.getVariant);
// productRouter.post("/addVariant", adminAuthenticate, ProductController.Variant.addVariant);
// productRouter.post("/updateVariant", adminAuthenticate, Resizer, ProductController.Variant.updateVariant);
// productRouter.post("/uploadImage", adminAuthenticate, ImageUploader);

//stock management
productRouter.post("/", adminAuthenticate, ProductController.Stock.getStock);
productRouter.post("/updateStock", adminAuthenticate, Resizer, ProductController.Stock.updateStock);


//product blog
productRouter.post("/getBlog", adminAuthenticate, ProductController.Blog.getBlog);
productRouter.post("/addBlog", adminAuthenticate, Resizer, ProductController.Blog.addBlog);
productRouter.post("/updateBlog", adminAuthenticate, Resizer, ProductController.Blog.updateBlog);

//productTitle
productRouter.post("/title", adminAuthenticate, ProductController.Specifications.getTitle);
productRouter.post("/addTitle", adminAuthenticate, ProductController.Specifications.addTitle);
productRouter.post("/deleteTitle", adminAuthenticate, ProductController.Specifications.deleteTitle);

// //productSpecification
// productRouter.post("/specification", adminAuthenticate, ProductController.Specifications.getSpecification);
// // productRouter.post("/addSpecification", adminAuthenticate, ProductController.Specifications.addSpecification);
// productRouter.post("/deleteSpecification", adminAuthenticate, ProductController.Specifications.deleteSpecification);



export {
    productRouter
}