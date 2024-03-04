// import { ApplicationResponse } from '../../core/inc/response/ApplicationResponse.js'
// import { ApplicationResult } from '../../core/result.js'
import { adminMiddleware } from '../middleware/adminMiddleware.js';

export class AdminController { }


AdminController.Customer = {

    /**
    * @name Get All Counts
    * @param {*} token
    */


    getAnalytics: async (req, res) => {
        adminMiddleware.Customer.fetchAnalytics(req)
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
    * @name Get All Customers
    * @param {*} token
    */


    getCustomers: async (req, res) => {
        adminMiddleware.Customer.getallCustomer(req)
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
    * @name Add Home
    * @param {*} token
    */


    addHome: async (req, res) => {
        adminMiddleware.Customer.addMsgPops(req)
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
  * @name Get Single  Customer's Details
  * @param {*} token
  */

    getSingleCustomer: async (req, res) => {
        adminMiddleware.Customer.fetchSingleCustomer(req)
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
    * @name update Customer
    * @param {*} body
    */


    updateCustomer: async (req, res) => {
        adminMiddleware.Customer.updateSingleCustomer(req)
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
  * @name Post Create Vendor
  * @param {*} token
  */
    createVendor: async (req, res) => {
        adminMiddleware.Customer.createVendor(req)
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
     * @name Get All Vendors
     * @param {*} token
     */


    getVendors: async (req, res) => {
        adminMiddleware.Customer.getallVendors(req)
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
  * @name Get Single  Vendors Details
  * @param {*} token
  */

    getSingleVendors: async (req, res) => {
        adminMiddleware.Customer.fetchSingleVendors(req)
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
    * @name update Vendors
    * @param {*} body
    */


    updateVendors: async (req, res) => {
        adminMiddleware.Customer.updateSingleVendors(req)
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

    uploadFabrics: async (req, res) => {
        adminMiddleware.Customer.uploadFabrics(req)
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
    getAllFabrics: async (req, res) => {
        adminMiddleware.Customer.getAllFabrics(req)
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
    getOneFabrics: async (req, res) => {
        adminMiddleware.Customer.getOneFabrics(req)
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

    updateFabrics: async (req, res) => {
        adminMiddleware.Customer.updateFabrics(req)
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
    orderFabrics: async (req, res) => {
        adminMiddleware.Customer.orderFabrics(req)
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

    getOneOrder: async (req, res) => {
        adminMiddleware.Customer.getOneOrderFab(req)
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
    * @name get BulkOrders
    * @param {*} token
    */


    getBulkOrders: async (req, res) => {
        adminMiddleware.Customer.fetchBulkOrders(req)
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
       * @name get contactPage
       * @param {*} token
       */


    contactPage: async (req, res) => {
        adminMiddleware.Customer.contactPage(req)
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

AdminController.Banners = {
    getBanners: async (req, res) => {
        adminMiddleware.Banners.fetchBanners(req)
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
    addBanners: async (req, res) => {
        adminMiddleware.Banners.createBanners(req)
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
    updateBanners: async (req, res) => {
        adminMiddleware.Banners.putBanners(req)
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

AdminController.Shop = {

    getTax: async (req, res) => {
        adminMiddleware.Shop.fetchTax(req)
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
    addTax: async (req, res) => {
        adminMiddleware.Shop.createTax(req)
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
    removeTax: async (req, res) => {
        adminMiddleware.Shop.deleteTax(req)
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
    getFaq: async (req, res) => {
        adminMiddleware.Shop.fetchFaq(req)
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
    addFaq: async (req, res) => {
        adminMiddleware.Shop.createFaq(req)
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
    removeFaq: async (req, res) => {
        adminMiddleware.Shop.deleteFaq(req)
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

// AdminController.Orders = {
//     getallOrders: async (req, res) => {
//         AdminControl.Orders.fetchallOrders(req)
//             .then((data) => {
//                 const response = ApplicationResult.forCreated();
//                 var statuscode = 0;
//                 ApplicationResponse.success(
//                     response,
//                     null,
//                     (response) => (statuscode = response.status)
//                 );
//                 res.json({ status: statuscode, data: data });
//             })
//             .catch((error) => {
//                 ApplicationResponse.error(error, null, (response) => {
//                     res.status(response.status).json(response);
//                 });
//             });
//     },
//     deliveryLocation: async (req, res) => {
//         AdminControl.Orders.fetchlocation(req)
//             .then((data) => {
//                 const response = ApplicationResult.forCreated();
//                 var statuscode = 0;
//                 ApplicationResponse.success(
//                     response,
//                     null,
//                     (response) => (statuscode = response.status)
//                 );
//                 res.json({ status: statuscode, data: data });
//             })
//             .catch((error) => {
//                 ApplicationResponse.error(error, null, (response) => {
//                     res.status(response.status).json(response);
//                 });
//             });
//     },
//     updateOrders: async (req, res) => {
//         AdminControl.Orders.updateOrderStatus(req)
//             .then((data) => {
//                 const response = ApplicationResult.forCreated();
//                 var statuscode = 0;
//                 ApplicationResponse.success(
//                     response,
//                     null,
//                     (response) => (statuscode = response.status)
//                 );
//                 res.json({ status: statuscode, data: data });
//             })
//             .catch((error) => {
//                 ApplicationResponse.error(error, null, (response) => {
//                     res.status(response.status).json(response);
//                 });
//             });
//     },
// };

