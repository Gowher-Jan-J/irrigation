// import * as Error from "../../core/errors/ErrorConstant.js";
// import { userDbController } from "../../core/database/Controller/userDbController.js";
// import { PayloadCompiler } from "../../core/inc/access/PayloadCompiler.js";
// import { fabrics } from "../../core/database/models/vendorModel.js";

export class shopMiddleware { }

//shop
shopMiddleware.shop = {
    welcomeMessage: async () => {
        const fetched = await userDbController.Shop.getWelcomeMessage();
        if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
            return fetched;
        } else {
            return "No data Found";
        }
    },

    fetchfaq: async () => {
        const fetched = await userDbController.Shop.getFaq();
        if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
            return fetched;
        } else {
            throw Error.SomethingWentWrong("No FAQ's Found!");
        }
    },
    fetchBanners: async () => {
        const fetched = await userDbController.Shop.getAllBanners();
        if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
            return fetched;
        } else {
            return "No Banners Found";
        }
    },

    fetchCategory: async () => {
        const fetched = await userDbController.Shop.getAllCategories();
        if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
            return fetched;
        } else {
            return "No Categories Found";
        }
    },


    fetchForyou: async ({ token }) => {
        if (token == false || token == null || token == undefined) {
            throw Error.AuthenticationFailed();
        }
        var fetched = await userDbController.Shop.fetchForyouProducts(token);
        var sortedArray = [];
        if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
            for (var index = 0; index < fetched.length; index++) {
                //replace null to 0 for wishlist
                if (fetched[index].favourites == null) {
                    fetched[index].favourites = 0;
                }
                //replace  product variant - price null to 0 
                if (fetched[index].discountPrice == null) {
                    fetched[index].discountPrice = 0;
                } else {
                    fetched[index].discountPrice = JSON.parse(fetched[index].discountPrice);
                    fetched[index].discountPrice = Number(fetched[index].discountPrice[0]);
                }
                if (fetched[index].actualPrice == null) {
                    fetched[index].actualPrice = 0;
                } else {
                    fetched[index].actualPrice = JSON.parse(fetched[index].actualPrice);
                    fetched[index].actualPrice = Number(fetched[index].actualPrice[0]);
                }
                if (fetched[index].ratings == null) {
                    fetched[index].ratings = 0;
                } else {
                    //convert ratings- 2.3000 to 2.3
                    var rate = fetched[index].ratings;
                    fetched[index].ratings = Math.sign(rate) * Math.abs(rate);
                    fetched[index].ratings = Number(fetched[index].ratings.toFixed(1));
                }
                if (fetched[index].discountPrice != 0 && fetched[index].discountPrice != null && fetched[index].discountPrice != undefined) {
                    sortedArray.push(fetched[index]);
                }
            }
            if (sortedArray != null && sortedArray != undefined && Object.keys(sortedArray).length != 0) {
                return sortedArray;
            } else {
                return "No Products Found";
            }
        } else {
            return "No Products Found";
        }

    },
    fetchHotdeals: async ({ token }) => {
        var token = token || null
        var fetched = await userDbController.Shop.getHotDeals(token);
        var sortedArray = [];
        if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
            for (var index = 0; index < fetched.length; index++) {
                //replace null to 0 for wishlist
                if (fetched[index].favourites == null) {
                    fetched[index].favourites = 0;
                }
                fetched[index].discountPrice = JSON.parse(fetched[index].discountPrice);
                fetched[index].actualPrice = JSON.parse(fetched[index].actualPrice);
                //replace  product variant - price null to 0 
                if (fetched[index].discountPrice == null) {
                    fetched[index].discountPrice = 0;
                } else {
                    fetched[index].discountPrice = Number(fetched[index].discountPrice[0]);
                }
                if (fetched[index].actualPrice == null) {
                    fetched[index].actualPrice = 0;
                } else {
                    fetched[index].actualPrice = Number(fetched[index].actualPrice[0]);
                }
                if (fetched[index].ratings == null) {
                    fetched[index].ratings = 0;
                } else {
                    //convert ratings- 2.3000 to 2.3
                    var rate = fetched[index].ratings;
                    fetched[index].ratings = Math.sign(rate) * Math.abs(rate);
                    fetched[index].ratings = Number(fetched[index].ratings.toFixed(1));
                }

                if (fetched[index].discountPrice != 0 && fetched[index].discountPrice != null && fetched[index].discountPrice != undefined) {
                    sortedArray.push(fetched[index]);
                }
            }
            if (sortedArray != null && sortedArray != undefined && Object.keys(sortedArray).length != 0) {
                return sortedArray;
            } else {
                return "No Products Found";
            }
        } else {
            return "No Products Found"
        }
    },

    fetchCategoryProducts: async ({ body }) => {
        const validated = await PayloadCompiler.compile(body, "categoryId");
        var fetched = await userDbController.Shop.getCategoryProduct(validated.data);

        if (fetched != null && fetched != undefined && fetched.length != 0) {
            var sortedArray = [];

            //rewrite nested objects
            for (var index = 0; index < fetched.length; index++) {
                // fetched[index].productVariants.variantImage = JSON.parse(fetched[index].productVariants.variantImage);
                // fetched[index].productImage = fetched[index].productVariants.variantImage[0];
                //append Product Name & Variant Name
                fetched[index].variantName = fetched[index].productVariants.variantName;
                if (fetched[index].productVariants.discountPrice == null) {
                    fetched[index].discountPrice = 0
                } else {
                    fetched[index].discountPrice = JSON.parse(fetched[index].productVariants.discountPrice);
                    fetched[index].discountPrice = Number(fetched[index].discountPrice[0]);
                }
                if (fetched[index].productVariants.actualPrice == null) {
                    fetched[index].actualPrice = 0
                } else {
                    fetched[index].actualPrice = JSON.parse(fetched[index].productVariants.actualPrice);
                    fetched[index].actualPrice = Number(fetched[index].actualPrice[0]);
                }
                if (fetched[index].productVariants.reviews.rating == null || fetched[index].productVariants.reviews.rating == undefined) {
                    fetched[index].productVariants.reviews.rating = 0;
                    fetched[index].ratings = fetched[index].productVariants.reviews.rating
                } else {
                    fetched[index].ratings = fetched[index].productVariants.reviews.rating;
                    var rate = fetched[index].ratings;
                    fetched[index].ratings = Math.sign(rate) * Math.abs(rate);
                    fetched[index].ratings = Number(fetched[index].ratings.toFixed(1));
                }
                //destroy duplicate objects
                delete fetched[index].productVariants;
                // slave.push(fetched[index]);

                if (fetched[index].discountPrice != 0 && fetched[index].discountPrice != null && fetched[index].discountPrice != undefined) {
                    sortedArray.push(fetched[index]);
                }
            }

            //remove dupicate arrayObjects
            var keys = ['id'];
            var fetched = sortedArray.filter((s => o => (k => !s.has(k) && s.add(k))
                (keys.map(k => o[k]).join('|')))
                (new Set));

            if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
                //Array sort
                switch (body.sort) {
                    case 1:
                        //price Desc0) {
                        return fetched.sort((a, b) => (a.discountPrice > b.discountPrice) ? -1 : 1);
                    case 2:
                        //price Asc
                        return fetched.sort((a, b) => (a.discountPrice > b.discountPrice) ? 1 : -1);
                    case 3:
                        //productname Asc
                        return fetched.sort((a, b) => (a.productName > b.productName) ? 1 : -1);
                    case 4:
                        //productname Desc
                        return fetched.sort((a, b) => (a.productName > b.productName) ? -1 : 1);
                    default:
                        //price Asc
                        return fetched.sort((a, b) => (a.discountPrice > b.discountPrice) ? -1 : 1);
                }
            } else {
                return [];
            }



        } else {
            return "No Products Found..! Try Other Filters"
        }
    },

    fetchResults: async ({ body, token }) => {
        body.customerId = token;
        if (body.query != null && body.query != undefined && body.query != "") {
            var fetched = await userDbController.Shop.getResults(body);
            for (let index = 0; index < fetched.length; index++) {
                fetched[index].tags = JSON.parse(fetched[index].tags);
            }
            var search = (body.query).toLowerCase();
            //product filter
            var fetched = fetched.filter(data => data.productName.includes(search) || data.tags.includes(search))
            var sortedArray = [];
            if (fetched.length != 0) {
                for (var index = 0; index < fetched.length; index++) {
                    //replace null to 0 for wishlist
                    if (fetched[index].favourites == null) {
                        fetched[index].favourites = 0;
                    }
                    fetched[index].discountPrice = JSON.parse(fetched[index].discountPrice);
                    fetched[index].actualPrice = JSON.parse(fetched[index].actualPrice);
                    //replace null to 0 for price
                    if (fetched[index].discountPrice == null) {
                        fetched[index].discountPrice = 0;
                    } else {
                        fetched[index].discountPrice = Number(fetched[index].discountPrice[0]);
                    }
                    if (fetched[index].actualPrice == null) {
                        fetched[index].actualPrice = 0;
                    } else {
                        fetched[index].actualPrice = Number(fetched[index].actualPrice[0]);
                    }
                    //convert ratings- 2.3000 to 2.3
                    fetched[index].ratings = Math.sign(fetched[index].ratings) * Math.abs(fetched[index].ratings);
                    fetched[index].ratings = Number(fetched[index].ratings.toFixed(1));
                    delete fetched[index].tags

                    if (fetched[index].discountPrice != 0 && fetched[index].discountPrice != null && fetched[index].discountPrice != undefined) {
                        sortedArray.push(fetched[index]);
                    }
                }
                return sortedArray;
            } else {
                return "No Products Found";
            }
        }
        else {
            const fetched = await userDbController.Shop.getResults(body);
            for (var index = 0; index < fetched.length; index++) {
                if (fetched[index].favourites == null) {
                    fetched[index].favourites = 0;
                }
                fetched[index].discountPrice = JSON.parse(fetched[index].discountPrice);
                //replace null to 0 for price
                if (fetched[index].discountPrice == null) {
                    fetched[index].discountPrice = 0;
                } else {
                    fetched[index].discountPrice = Number(fetched[index].discountPrice[0]);
                }
                if (fetched[index].ratings == null) {
                    fetched[index].ratings = 0;
                } else {
                    //convert ratings- 2.3000 to 2.3
                    fetched[index].ratings = Math.sign(fetched[index].ratings) * Math.abs(fetched[index].ratings);
                }
            }
            return fetched;
        }

    },

    createbulkOrders: async ({ body }) => {
        const fetched = await userDbController.Shop.createBulkOrders(body);
        if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
            return "Enquiry Sent Successfully";
        } else {
            return "No data Found";
        }
    },


    listFabrics: async ({ body, token }) => {
        if (!token) {
            throw Error.AuthenticationFailed("Token is missing");
        }
        body.customerId = token;
        const fetchFabrics = await userDbController.Shop.listFabircs({ ...body, status: 'active' });

        if (fetchFabrics && fetchFabrics.length > 0) {
            const uniqueFabricNames = new Set();

            const uniqueFabrics = fetchFabrics.filter(fabric => {
                if (!uniqueFabricNames.has(fabric.code)) {
                    uniqueFabricNames.add(fabric.code);
                    return true;
                }
                return false;
            });
            return uniqueFabrics

        } else {
            return "No Active Fabrics Found";

        }
    },

    contactPage: async ({ body }) => {
        const fetched = await userDbController.Shop.contactPage(body);
        if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
            return "Enquiry Message Sent Successfully";
        } else {
            return "No data Found";
        }
    },
};
