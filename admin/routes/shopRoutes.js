import { Router } from 'express'
import { adminAuthenticate } from '../controllers/authController.js';
import { AdminController } from '../controllers/adminController.js';
// import { bannerResizer } from '../../core/utils/imageResizer.js';
// import { Resizer } from '../../core/utils/imageResizer.js';
// import { Img } from '../../core/utils/imageResizer.js';

const shopRouter = Router()




//dashboard
shopRouter.get("/dashboard", adminAuthenticate, AdminController.Customer.getAnalytics);

//Web HomePage
// shopRouter.post("/home", adminAuthenticate, bannerResizer, AdminController.Customer.addHome);

//customers
shopRouter.get("/customer", adminAuthenticate, AdminController.Customer.getCustomers);
shopRouter.post("/singleCustomer", adminAuthenticate, AdminController.Customer.getSingleCustomer);
shopRouter.post("/updateCustomer", adminAuthenticate, AdminController.Customer.updateCustomer);

//vendors
// shopRouter.post("/create", adminAuthenticate, Resizer, AdminController.Customer.createVendor);
shopRouter.get("/vendor", adminAuthenticate, AdminController.Customer.getVendors);
shopRouter.post("/singleVendor", adminAuthenticate, AdminController.Customer.getSingleVendors);
// shopRouter.post("/updateVendor", adminAuthenticate, Resizer, AdminController.Customer.updateVendors);

//uploadfabrics
// shopRouter.post("/uploadFabrics", adminAuthenticate, Img, AdminController.Customer.uploadFabrics);
shopRouter.get("/getAllFabrics", adminAuthenticate, AdminController.Customer.getAllFabrics);
shopRouter.post("/getOneFabrics", adminAuthenticate, AdminController.Customer.getOneFabrics);
// shopRouter.post("/updateFabrics", adminAuthenticate, Img, AdminController.Customer.updateFabrics);
shopRouter.get("/ordersFabrics", adminAuthenticate, AdminController.Customer.orderFabrics);
shopRouter.post("/getOneOrder", adminAuthenticate, AdminController.Customer.getOneOrder);

//banners
// shopRouter.get("/", adminAuthenticate, AdminController.Banners.getBanners);
// shopRouter.post("/addBanners", adminAuthenticate, bannerResizer, AdminController.Banners.addBanners);
shopRouter.post("/updateBanners", adminAuthenticate, AdminController.Banners.updateBanners);



//tax
shopRouter.post("/tax", adminAuthenticate, AdminController.Shop.getTax);
shopRouter.post("/addTax", adminAuthenticate, AdminController.Shop.addTax);
shopRouter.post("/removeTax", adminAuthenticate, AdminController.Shop.removeTax);

//faq
shopRouter.get("/faq", adminAuthenticate, AdminController.Shop.getFaq);
shopRouter.post("/addFAQ", adminAuthenticate, AdminController.Shop.addFaq);
shopRouter.post("/removeFAQ", adminAuthenticate, AdminController.Shop.removeFaq);


//bulkOrders
shopRouter.get("/bulkOrders", adminAuthenticate, AdminController.Customer.getBulkOrders);



//contactPage
shopRouter.get("/contactPage", adminAuthenticate, AdminController.Customer.contactPage);



export {
    shopRouter
}