import { ApplicationResult } from "../../core/result.js";
import { ApplicationResponse } from "../../core/inc/response/ApplicationResponse.js";
import { shopMiddleware } from "../middleware/shopMiddleware.js";

export class ShopController { }



ShopController.shop = {

    /**
 * @name get WelcomeMessage
 * @param {*}
 */

    getWelcomeMessage: async (req, res) => {
        shopMiddleware.shop.welcomeMessage(req)
            .then((data) => {
                const response = ApplicationResult.forCreated();
                var statuscode = 0;
                ApplicationResponse.success(
                    response,
                    null,
                    (response) => (statuscode = response.status)
                );
                res.json({ status: statuscode, data: data });
            })
            .catch((error) => {
                ApplicationResponse.error(error, null, (response) => {
                    res.status(response.status).json(response);
                });
            });
    },
    /**
    * @name get banners
    * @param {*} 
    */

    getBanners: async (req, res) => {
        shopMiddleware.shop.fetchBanners(req)
            .then((data) => {
                const response = ApplicationResult.forCreated();
                var statuscode = 0;
                ApplicationResponse.success(
                    response,
                    null,
                    (response) => (statuscode = response.status)
                );
                res.json({ status: statuscode, data: data });
            })
            .catch((error) => {
                ApplicationResponse.error(error, null, (response) => {
                    res.status(response.status).json(response);
                });
            });
    },

    /**
    * @name get Category
    * @param {*} 
    */

    getCategory: async (req, res) => {
        shopMiddleware.shop.fetchCategory(req)
            .then((data) => {
                const response = ApplicationResult.forCreated();
                var statuscode = 0;
                ApplicationResponse.success(
                    response,
                    null,
                    (response) => (statuscode = response.status)
                );
                res.json({ status: statuscode, data: data });
            })
            .catch((error) => {
                ApplicationResponse.error(error, null, (response) => {
                    res.status(response.status).json(response);
                });
            });
    },

    /**
   * @name get Category Dependent Products
   * @param {*} body
   */

    getCategoryProducts: async (req, res) => {
        shopMiddleware.shop.fetchCategoryProducts(req)
            .then((data) => {
                const response = ApplicationResult.forCreated();
                var statuscode = 0;
                ApplicationResponse.success(
                    response,
                    null,
                    (response) => (statuscode = response.status)
                );
                res.json({ status: statuscode, data: data });
            })
            .catch((error) => {
                ApplicationResponse.error(error, null, (response) => {
                    res.status(response.status).json(response);
                });
            });
    },

    /**
    * @name get All Products
    * @param {*} 
    */

    getForyou: async (req, res) => {
        shopMiddleware.shop.fetchForyou(req)
            .then((data) => {
                const response = ApplicationResult.forCreated();
                var statuscode = 0;
                ApplicationResponse.success(
                    response,
                    null,
                    (response) => (statuscode = response.status)
                );
                res.json({ status: statuscode, data: data });
            })
            .catch((error) => {
                ApplicationResponse.error(error, null, (response) => {
                    res.status(response.status).json(response);
                });
            });
    },

    /**
    * @name get All Products
    * @param {*} 
    */

    hotDeals: async (req, res) => {
        shopMiddleware.shop.fetchHotdeals(req)
            .then((data) => {
                const response = ApplicationResult.forCreated();
                var statuscode = 0;
                ApplicationResponse.success(
                    response,
                    null,
                    (response) => (statuscode = response.status)
                );
                res.json({ status: statuscode, data: data });
            })
            .catch((error) => {
                ApplicationResponse.error(error, null, (response) => {
                    res.status(response.status).json(response);
                });
            });
    },


    /**
    * @name get Search Results
    * @param {*} body
    */

    listFaq: async (req, res) => {
        shopMiddleware.shop.fetchfaq(req)
            .then((data) => {
                const response = ApplicationResult.forCreated();
                var statuscode = 0;
                ApplicationResponse.success(
                    response,
                    null,
                    (response) => (statuscode = response.status)
                );
                res.json({ status: statuscode, data: data });
            })
            .catch((error) => {
                ApplicationResponse.error(error, null, (response) => {
                    res.status(response.status).json(response);
                });
            });
    },

    /**
   * @name get Search Results
   * @param {*} body
   */

    getSearchResults: async (req, res) => {
        shopMiddleware.shop.fetchResults(req)
            .then((data) => {
                const response = ApplicationResult.forCreated();
                var statuscode = 0;
                ApplicationResponse.success(
                    response,
                    null,
                    (response) => (statuscode = response.status)
                );
                res.json({ status: statuscode, data: data });
            })
            .catch((error) => {
                ApplicationResponse.error(error, null, (response) => {
                    res.status(response.status).json(response);
                });
            });
    },

    /**
   * @name bulkOrders
   * @param {*} body
   */

    bulkOrders: async (req, res) => {
        shopMiddleware.shop.createbulkOrders(req)
            .then((data) => {
                const response = ApplicationResult.forCreated();
                var statuscode = 0;
                ApplicationResponse.success(
                    response,
                    null,
                    (response) => (statuscode = response.status)
                );
                res.json({ status: statuscode, data: data });
            })
            .catch((error) => {
                ApplicationResponse.error(error, null, (response) => {
                    res.status(response.status).json(response);
                });
            });
    },


    /**
  * @name listFabrics
  * @param {*} body
  */

    listFabircs: async (req, res) => {
        shopMiddleware.shop.listFabrics(req)
            .then((data) => {
                const response = ApplicationResult.forCreated();
                var statuscode = 0;
                ApplicationResponse.success(
                    response,
                    null,
                    (response) => (statuscode = response.status)
                );
                res.json({ status: statuscode, data: data });
            })
            .catch((error) => {
                ApplicationResponse.error(error, null, (response) => {
                    res.status(response.status).json(response);
                });
            });
    },

/**
  * @name contact page
  * @param {*} body
  */

contactPage: async (req, res) => {
    shopMiddleware.shop.contactPage(req)
        .then((data) => {
            const response = ApplicationResult.forCreated();
            var statuscode = 0;
            ApplicationResponse.success(
                response,
                null,
                (response) => (statuscode = response.status)
            );
            res.json({ status: statuscode, data: data });
        })
        .catch((error) => {
            ApplicationResponse.error(error, null, (response) => {
                res.status(response.status).json(response);
            });
        });
},

};