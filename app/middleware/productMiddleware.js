import { createLogger } from "logger";
// import { userDbController } from "../../core/database/Controller/userDbController.js";
// import * as Error from "../../core/errors/ErrorConstant.js";
// import cheerio from "cheerio";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";


export class productMiddleware { }

//products
productMiddleware.Product = {
    fetchFilterProduct: async ({ body, token }) => {

        body.customerId = token || null;
        if (body.priceRange != null) {
            var fetched = await userDbController.Shop.getFilters(body);

            var sortedArray = [];

            if (fetched != null && fetched != undefined && fetched.length != 0) {

                var master = [];
                for (let index = 0; index < fetched.length; index++) {

                    fetched[index].productVariants.actualPrice = JSON.parse(fetched[index].productVariants.actualPrice)
                    fetched[index].productVariants.discountPrice = JSON.parse(fetched[index].productVariants.discountPrice)


                    fetched[index].actualPrice = Number(fetched[index].productVariants.actualPrice[0]);
                    fetched[index].discountPrice = Number(fetched[index].productVariants.discountPrice[0]);

                    if (fetched[index].ratings == null || fetched[index].ratings == undefined) {
                        fetched[index].ratings = 0;
                    } else {
                        fetched[index].ratings = Math.round(fetched[index].ratings);
                    }
                    if (fetched[index].productVariants == undefined || fetched[index].productVariants == null || fetched[index].productVariants.discountPrice == null) {
                        fetched.splice(index); //remove index
                    }
                    if (fetched[index].productVariants.discountPrice != 0 && fetched[index].productVariants.discountPrice != null && fetched[index].productVariants.discountPrice != undefined) {
                        sortedArray.push(fetched[index]);
                    }
                }

                // return fetched
                //filter inputs
                // var categories = body.categories;
                // var ratings = body.ratings;
                var price = body.priceRange;

                // var slaveArray = [];
                function search(myArray) {
                    for (var i = 0; i < myArray.length; i++) {
                        if (myArray[i].discountPrice >= price[0] && myArray[i].discountPrice <= price[1]) {
                            master.push(myArray[i]);
                            // master[j].variantName = master[j].productVariants.variantName;
                            // delete master[i].productVariants;
                        }
                    }
                    for (var j = 0; j < master.length; j++) {
                        master[j].variantName = master[j].productVariants.variantName;
                        delete master[j].productVariants;
                    }

                }

                search(sortedArray); //function call
                // var fetched = [...new Set(master)];//only unique
                //remove dupicate arrayObjects

                var keys = ['id'];
                var fetched = master.filter((s => o => (k => !s.has(k) && s.add(k))
                    (keys.map(k => o[k]).join('|')))
                    (new Set));

                if (fetched.length != 0 && fetched != null && fetched != undefined) {
                    //Array sort
                    switch (body.sort) {
                        case 1:
                            //price Desc 
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
                            if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
                                return fetched.sort((a, b) => (a.discountPrice > b.discountPrice) ? -1 : 1);
                            } else {
                                return "No Products Found";
                            }
                    }
                } else {
                    return "No Products Found..!"
                }
            } else {
                return "No Products Found..!"
            }


        }
        else {
            var fetched = await userDbController.Shop.getFilters(body);
            // var fetched = await userDbController.Shop.getWishlistedProducts(body);

            if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
                var sortedArray = [];
                for (var index = 0; index < fetched.length; index++) {
                    //replace null to 0 for wishlist
                    if (fetched[index].favourites == null) {
                        fetched[index].favourites = 0;
                    }
                    //replace  product variant - price null to 0 
                    if (fetched[index].productVariants.discountPrice == null) {
                        fetched[index].discountPrice = 0;
                    } else {
                        fetched[index].productVariants.discountPrice = JSON.parse(fetched[index].productVariants.discountPrice);
                        fetched[index].discountPrice = Number(fetched[index].productVariants.discountPrice);
                    }
                    if (fetched[index].productVariants.actualPrice == null) {
                        fetched[index].actualPrice = 0;
                    } else {
                        fetched[index].productVariants.actualPrice = JSON.parse(fetched[index].productVariants.actualPrice);
                        fetched[index].actualPrice = Number(fetched[index].productVariants.actualPrice);
                    }
                    if (fetched[index].ratings == null) {
                        fetched[index].ratings = 0;
                    } else {
                        //convert ratings- 2.3000 to 2.3
                        fetched[index].ratings = Math.sign(fetched[index].ratings) * Math.abs(fetched[index].ratings);
                        fetched[index].ratings = Number(fetched[index].ratings.toFixed(1));
                    }
                    fetched[index].variantName = fetched[index].productVariants.variantName;
                    delete fetched[index].productVariants;

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
                    // Array Sort
                    switch (body.sort) {
                        case 1:
                            //price Desc
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
                    return "No Products Found";
                }


            } else {
                return "No Products Found"
            }
        }

    },

    fetchSpecs: async ({ body }) => {
        const fetched = await userDbController.Shop.fetchProductSpecs(body);
        const fetchDetails = await userDbController.Shop.fetchProductDetails(body);
        // body.moreInfo = fetchDetails.moreInfo;
        // body.productDescription = fetchDetails.productDescription;
        // body.categoryName = fetchDetails.categoryName;
        if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
            fetched.productSpecification = JSON.parse(fetched.productSpecification)
            return { specification: fetched, description: fetchDetails };
        } else {
            return "No Specifiations Found"
        }
    },
    fetchRecommended: async ({ body }) => {
        const getRecommended = await userDbController.Shop.getAllRecommended()
        var productIds = [];
        for (let index = 0; index < getRecommended.length; index++) {
            productIds.push(getRecommended[index].productId);
        }
        const fetchProductArray = await userDbController.Shop.fetchProductArray(productIds)
        if (fetchProductArray != null && fetchProductArray != undefined && Object.keys(fetchProductArray).length != 0) {


            const uniqueArray = fetchProductArray.filter((item, index, self) =>
                index === self.findIndex((t) => t.id === item.id)
            );

            return uniqueArray;
        } else {
            return "No Recommended Products Found";
        }
    },
};


//prodct variants
// productMiddleware.Variant = {
//     fetchVariant: async ({ body, token }) => {
//         if (body.productId != null && body.productId != undefined && body.productId != "") {
//             const fetched = await userDbController.Shop.fetchVariants(body, token);
//             if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
//                 for (let index = 0; index < fetched.length; index++) {
//                     if (fetched[index].favourites == null) {
//                         fetched[index].favourites = 0
//                     }
//                 }
//                 return fetched;
//             } else {
//                 return "No Variants Found"
//             }
//         } else {
//             return "No Variants Found"
//         }

//     },

// };


//prodct variants
productMiddleware.Variant = {
    fetchVariant: async ({ body, token }) => {
        if (body.productId != null && body.productId != undefined && body.productId != "") {

            const checkProductExists = await userDbController.Shop.getProductInfo(body);

            if (checkProductExists != null && checkProductExists != undefined && Object.keys(checkProductExists).length != 0 && checkProductExists.status == "active") {
                let fetchedVariants = await userDbController.Shop.fetchVariants(body, token)

                if (fetchedVariants.length !== 0) {
                    for (let index = 0; index < fetchedVariants.length; index++) {
                        if (fetchedVariants[index].favourites === null) {
                            fetchedVariants[index].favourites = 0;
                        }
                        fetchedVariants[index].discountPrice = JSON.parse(JSON.parse(fetchedVariants[index].discountPrice));
                        fetchedVariants[index].actualPrice = JSON.parse(JSON.parse(fetchedVariants[index].actualPrice));
                        fetchedVariants[index].variantColor = JSON.parse(fetchedVariants[index].variantColor);
                        fetchedVariants[index].altTags = checkProductExists.tags.split(",").map(tag => tag.replace(/^"|"$/g, ''));
                        fetchedVariants[index].variantImage = JSON.parse(fetchedVariants[index].variantImage);

                        return fetchedVariants;
                    }

                } else {
                    return "No Product Found";
                }


            } else {
                return "No Product Found";
            }
        }
    }
}



