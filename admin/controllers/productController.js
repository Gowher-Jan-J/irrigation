// import {
// ApplicationResponse
// } from '../../core/inc/response/ApplicationResponse.js'
// import {
// ApplicationResult
// } from '../../core/result.js'
import { productMiddleware } from '../middleware/productMiddleware.js';

export class ProductController { }


ProductController.Category = {

    /**
    * @name Get All Category
    * @param {*} token
    */

    getCategory: async (req, res) => {
        productMiddleware.Category.fetchCategory(req)
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
    * @name Create Category
    * @param {*} body
    */

    addCategory: async (req, res) => {
        productMiddleware.Category.createCategory(req)
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
  * @name Create Category
  * @param {*} body 
  */


    updateCategory: async (req, res) => {
        productMiddleware.Category.putCategory(req)
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

ProductController.Product = {
    getProduct: async (req, res) => {

        /**
        * @name get All Product
        * @param {*} token 
        */

        productMiddleware.Product.fetchProduct(req)
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
    * @name Create Product
    * @param {*} body 
    */

    addProduct: async (req, res) => {
        productMiddleware.Product.createProduct(req)
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
    * @name Update Product
    * @param {*} body 
    */

    updateProduct: async (req, res) => {
        productMiddleware.Product.putProduct(req)
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
    * @name Delete Product
    * @param {*} body 
    */

    deleteProduct: async (req, res) => {
        productMiddleware.Product.removeProduct(req)
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
    * @name Recommend Product
    * @param {*} body 
    */

    addRecommendProduct: async (req, res) => {
        productMiddleware.Product.addRecommend(req)
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
    * @name Recommend Product
    * @param {*} body 
    */

    getRecommendProduct: async (req, res) => {
        productMiddleware.Product.getRecommended(req)
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
    * @name Recommend Product
    * @param {*} body 
    */

    deleteRecommendProduct: async (req, res) => {
        productMiddleware.Product.removeRecommend(req)
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



ProductController.Variant = {
    getVariant: async (req, res) => {
        /**
        * @name get All Variant on sinle product
        * @param {*} token 
        */

        productMiddleware.Variant.fetchVariant(req)
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
    * @name Create Variant
    * @param {*} body 
    */

    addVariant: async (req, res) => {
        productMiddleware.Variant.createVariant(req)
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
    * @name Update Variant
    * @param {*} body 
    */

    updateVariant: async (req, res) => {
        productMiddleware.Variant.putVariant(req)
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



ProductController.Stock = {

    /**
    * @name Get All Stock
    * @param {*} token
    */

    getStock: async (req, res) => {
        productMiddleware.Stock.fetchStock(req)
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
  * @name Update Stock
  * @param {*} body 
  */


    updateStock: async (req, res) => {
        productMiddleware.Stock.putStock(req)
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

ProductController.Blog = {

    /**
    * @name Get All Blog
    * @param {*} token
    */

    getBlog: async (req, res) => {
        productMiddleware.Blog.fetchBlog(req)
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
    * @name Create Blog
    * @param {*} body
    */

    addBlog: async (req, res) => {
        productMiddleware.Blog.createBlog(req)
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
  * @name Create Blog
  * @param {*} body 
  */


    updateBlog: async (req, res) => {
        productMiddleware.Blog.putBlog(req)
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

ProductController.Specifications = {

    /**
    * @name Get All Product Titles
    * @param {*} token
    */

    getTitle: async (req, res) => {
        productMiddleware.Specifications.fetchTitles(req)
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
    * @name Create Product Title
    * @param {*} token
    */

    addTitle: async (req, res) => {
        productMiddleware.Specifications.createTitle(req)
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
    * @name Delete product Titles
    * @param {*} body
    */

    deleteTitle: async (req, res) => {
        productMiddleware.Specifications.removeTitle(req)
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
    * @name get single products specifications
    * @param {*} body
    */

    getSpecification: async (req, res) => {
        productMiddleware.Specifications.fetchSpecifications(req)
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
    * @name delete specifications
    * @param {*} body
    */

    //  addSpecification: async (req, res) => {
    //     productMiddleware.Specifications.createSpecification(req)
    //         .then((data) => {
    //             const response = ApplicationResult.forCreated();
    //             var statuscode = 0;
    //             ApplicationResponse.success(
    //                 response,
    //                 null,
    //                 (response) => (statuscode = response.status)
    //             );
    //             res.json({ status: statuscode, data: data });
    //         })
    //         .catch((error) => {
    //             ApplicationResponse.error(error, null, (response) => {
    //                 res.status(response.status).json(response);
    //             });
    //         });
    // },

    /**
    * @name get Product specifications
    * @param {*} body
    */

    deleteSpecification: async (req, res) => {
        productMiddleware.Specifications.removeSpecification(req)
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
