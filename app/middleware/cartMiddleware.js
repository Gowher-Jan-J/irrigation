// import { userDbController } from "../../core/database/Controller/userDbController.js";
// import * as Error from "../../core/errors/ErrorConstant.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";
// import ProductComponents from "../../../config/components.json" assert{ type: "json" };

export class cartMiddleware { }

//products
cartMiddleware.Cart = {
    fetchCart: async ({ token }) => {
        const cart = await userDbController.Cart.getCart(token);
        if (cart != null && cart != undefined && Object.keys(cart).length != 0) {
            var subtotal = 0;
            var totalPrice = 0;
            var price = 0;
            var gst = 0;
            for (let index = 0; index < cart.length; index++) {
                //type conversion
                cart[index].units = Number(cart[index].units);
                var stockPosition = Number(cart[index].index);

                //parse stock
                cart[index].productVariant.availableStock = JSON.parse(cart[index].productVariant.availableStock);
                cart[index].productInfo = JSON.parse(cart[index].productInfo);

                //compare stock and units
                //if unit - greaterthan stock --- assign current stock as units

                // if (cart[index].productVariant.availableStock[stockPosition] < cart[index].units) {
                if (cart[index].productVariant.availableStock < cart[index].units) {
                    cart[index].units = 0;
                }
                delete cart[index].productVariant
                price = Number(price) + Number(cart[index].actualPrice)
                subtotal = (Number(subtotal) + Number(cart[index].singleProductPrice)) * (cart[index].units);
                totalPrice = Number(totalPrice) + Number(cart[index].totalPrice)
                gst = Number(gst) + Number((cart[index].inclusiveGST) * cart[index].units);
            }
            var discount = price - totalPrice;
            var gst = gst;
            return { cart, price, discount, subtotal, gst, totalPrice };
        } else {
            return "No Products Found on Cart";
        }
    },

    fetchCount: async ({ token }) => {
        var fetched = await userDbController.Cart.getCount(token);
        if (fetched != null && fetched != undefined && fetched != 0) {
            return {
                count: fetched
            };
        } else {
            return 0;
        }
    },

    createCart: async ({ body, token }) => {
        if (token == false) {
            throw Error.AuthenticationFailed();
        }
        body.customerId = token;
        const userFetched = await userDbController.Customer.fetchCustomer(body);
        if (userFetched.isMailVerified == "no") {
            throw Error.SomethingWentWrong("Email not Verified..!");
        }
        const cartFound = await userDbController.Cart.checkCartExists(body);
        if (cartFound != null && cartFound != undefined && Object.keys(cartFound).length != 0) {
            // throw Error.SomethingWentWrong("Already Added to Cart");
            return "Already Added to Cart"
        }
        else {
            const productFound = await userDbController.Shop.checkProductAvailability(body);
            if (productFound != null && productFound != undefined && Object.keys(productFound).length != 0) {
                if (productFound.availableStock == 0 || productFound.availableStock == null || productFound.availableStock == undefined) {
                    return "Out of Stock";
                } else {
                    // productFound.variantColor = JSON.parse(productFound.variantColor);
                    productFound.availableStock = JSON.parse(productFound.availableStock);
                    // var colorLength = productFound.variantColor.length;
                    // for (let index = 0; index < colorLength; index++) {
                    // if (productFound.variantColor[index] === body.variantColor) {
                    // var pricePosition = 0;
                    // }
                    // }

                    //Message for Limited stocks
                    if (Number(productFound.availableStock) < Number(body.units)) {
                        const stock = productFound.availableStock;
                        if (stock == 1) {
                            throw Error.SomethingWentWrong("Only " + stock + " Product " + "Available")
                        } else {
                            throw Error.SomethingWentWrong("Only " + stock + " Products " + "Available")
                        }
                    }
                    //parse string
                    productFound.discountPrice = JSON.parse(productFound.discountPrice);
                    productFound.variantImage = JSON.parse(productFound.variantImage);
                    productFound.actualPrice = JSON.parse(productFound.actualPrice);


                    const singleProductPrice = Number(productFound.discountPrice);//price
                    const actualPrice = Number(productFound.actualPrice);//price
                    const variantImage = productFound.variantImage[0];//image
                    const noOfProducts = Number(body.units);//quantity
                    const variant = productFound.id;//variant
                    const totalPrice = singleProductPrice * noOfProducts;

                    //rewrite objects
                    body.customerId = token;
                    body.variantId = variant;
                    body.variantImage = variantImage;
                    body.productId = productFound.productId;
                    body.productName = productFound.productName;

                    // body.productId = productFound.productId;
                    // body.singleProductPrice = singleProductPrice;
                    body.actualPrice = actualPrice * noOfProducts;
                    body.totalPrice = totalPrice;
                    // body.variantColor = body.variantColor;
                    body.units = noOfProducts;
                    body.tax = Number(productFound.tax);
                    body.index = 0;
                    body.status = "active";

                    // var insp =  body.totalPrice* 100/(100 + (Number(productFound.tax)));

                    body.inclusiveGST = Math.round((totalPrice) - (totalPrice * 100 / (100 + (Number(productFound.tax)))));
                    body.singleProductPrice = Math.round((totalPrice * 100 / (100 + (Number(productFound.tax)))));
                    // body.withGST = totalPrice + (totalPrice * (Number(productFound.tax) / 100));
                    const created = await userDbController.Cart.createCart(body);
                    if (created != null && created != undefined && Object.keys(created).length != 0) {
                        return "Added to Cart"
                    } else {
                        throw Error.SomethingWentWrong("Failed to Add Cart");
                    }
                }
            }
            else {
                throw Error.SomethingWentWrong("Product Not found");
            }
        }
    },

    updateCart: async ({ body, token }) => {
        if (token == null || token == undefined) {
            throw Error.AuthenticationFailed();
        }
        const cartExists = await userDbController.Cart.checkCartIdExists(body);
        if (cartExists != null && cartExists != undefined && Object.keys(cartExists).length != 0) {
            if (cartExists.productType == "customized") {
                var singleProductPrice = Number(cartExists.singleProductPrice);//price
                //custom cart functions here
                if (body.units === "add") {
                    var noOfProducts = Number(cartExists.units) + Number(1);//quantity
                } else if (body.units === "sub") {
                    var noOfProducts = Number(cartExists.units) - Number(1);//quantity
                }

                const totalPrice = singleProductPrice * 1.05 * noOfProducts;
                var actualPrice = singleProductPrice * 1.25 * noOfProducts;

                body.totalPrice = totalPrice;
                body.actualPrice = actualPrice;
                body.units = noOfProducts;
                body.withGST = totalPrice + (totalPrice * (Number(cartExists.tax) / 100));

                if (noOfProducts > 0) {
                    var updated = await userDbController.Cart.putCart(body);
                    if (updated[0] != 0) {
                        return true;
                    }
                    else {
                        throw Error.SomethingWentWrong("Cart Update Failed");
                    }
                } else {
                    throw Error.SomethingWentWrong("Minimum Quantity should be 1")

                }
            }
            else {
                const productFound = await userDbController.Shop.checkProductAvailability(cartExists);
                if (productFound != null && productFound != undefined && Object.keys(productFound).length != 0) {
                    if (productFound.availableStock == 0 || productFound.availableStock == null || productFound.availableStock == undefined) {
                        throw Error.SomethingWentWrong("Out of Stock")
                    } else {
                        var colorLength = JSON.parse(productFound.variantColor);
                        var discountPrice = JSON.parse(productFound.discountPrice);
                        var actualPrice = JSON.parse(productFound.actualPrice);
                        var singleProductPrice = Number(discountPrice);//price
                        var actualPrice = Number(actualPrice);//price
                        var availableStock = Number(productFound.availableStock);//stock

                        if (body.units === "add") {
                            var noOfProducts = Number(cartExists.units) + Number(1);//quantity
                        } else if (body.units === "sub") {
                            var noOfProducts = Number(cartExists.units) - Number(1);//quantity
                        }

                        const totalPrice = singleProductPrice * noOfProducts;
                        var actualPrice = actualPrice * noOfProducts;

                        body.totalPrice = totalPrice;
                        body.actualPrice = actualPrice;
                        body.units = noOfProducts;
                        body.withGST = totalPrice + (totalPrice * (Number(productFound.tax) / 100));

                        if (noOfProducts === 0) {
                            throw Error.SomethingWentWrong("Minimum Quantity should be 1")
                        }

                        if (availableStock >= noOfProducts) {
                            var updated = await userDbController.Cart.putCart(body);
                            if (updated[0] != 0) {
                                return true;
                            }
                            else {
                                throw Error.SomethingWentWrong("Cart Update Failed");
                            }
                        } else {
                            throw Error.SomethingWentWrong("Only " + Number(availableStock) + " Product " + "Available")

                        }
                    }
                } else {
                    throw Error.SomethingWentWrong("Product Not found");
                }

            }
        }
    },

    removeCart: async ({ body, token }) => {
        body.customerId = token;
        var destroyed = await userDbController.Cart.destroyCart(body);
        if (destroyed[0] != 0) {
            return "Removed From Cart";
        }
    },

    createCustomCart: async ({ body, token, image }) => {
        if (!token) {
            throw Error.AuthenticationFailed();
        }

        body.customerId = token;
        const userFetched = await userDbController.Customer.fetchCustomer(body);

        if (userFetched.isMailVerified === "no") {
            throw Error.SomethingWentWrong("Email not Verified..!");
        }
        const fabricFound = await userDbController.Shop.checkFabricAvailability(body);
        if (fabricFound === null || fabricFound === undefined || Object.keys(fabricFound).length == 0) {
            throw Error.SomethingWentWrong("Fabric not found");
        } else {

            var fetchedCustomer = await userDbController.Customer.checkUser(token)
            if (fetchedCustomer != null) {
                body.customerId = fetchedCustomer.id;
                const fetched = await userDbController.Cart.createMeasurement(body);
                if (fetched != null && fetched != undefined && fetched != 0) {
                    body.size = fetched.customSize
                }
            }

            body.code = fabricFound.code
            var productInfoString = body.productInfo;

            var customizationCost = 0;
            const priceCalculatedProductInfo = productInfoString?.map(({ component, type, isSelected }) => {
                let selectedComponentList = ProductComponents[component];
                let item = selectedComponentList.find(component => component?.type === type);
                let price = item?.price;
                if (isSelected === 1) {
                    customizationCost = Number(customizationCost) + Number(price);
                    return { component, type, isSelected, price };
                }
                else {
                    customizationCost = 0;
                    return { component, type, isSelected, price: 0 };
                }
            });

            var basePrice = 1300; //shirt price
            var shirtPrice = basePrice + customizationCost;

            body.customerId = token;
            body.singleProductPrice = shirtPrice;
            body.fabricName = fabricFound.name;
            body.productName = fabricFound.name + " shirt";
            body.variantImage = image;
            body.tax = 5;
            body.actualPrice = (shirtPrice * Number(body.units)) * 1.25;
            body.totalPrice = (shirtPrice * Number(body.units)) * 1.05;
            body.inclusiveGST = (shirtPrice * Number(body.units)) * 0.05;
            body.index = 0;
            body.status = "active";
            body.productType = "customized";
            body.productInfo = JSON.stringify(priceCalculatedProductInfo);
            const created = await userDbController.Cart.createCart(body);
            if (created != null && created != undefined && Object.keys(created).length !== 0) {
                return "Added to Cart";
            }
            else {
                throw Error.SomethingWentWrong("Failed to Add Cart");

            }
        }
    },

    getAllMeasurements: async ({ body }) => {
        var fetched = await userDbController.Cart.getAllMeasurements(body);
        if (fetched != null && fetched != undefined && fetched != 0) {
            return fetched
        } else {
            return "Unable To Get All Size"
        }
    },

    updateMeasurements: async ({ body }) => {
        var fetched = await userDbController.Cart.updateMeasurements(body);
        if (fetched != null && fetched != undefined && fetched != 0) {
            return "CustomSize Measurements updated successfully";
        } else {
            return "unable to update";
        }
    },

    getOneMeasurements: async ({ body }) => {
        var fetched = await userDbController.Cart.getOneMeasurements(body);
        if (fetched != null && fetched != undefined && fetched != 0) {
            return fetched
        } else {
            return "unable to get custom size";
        }
    },


    deleteMeasurements: async ({ body }) => {
        var fetched = await userDbController.Cart.deleteMeasurements(body);
        if (fetched != null && fetched != undefined && fetched != 0) {
            if (body.action === "delete") {
                return "custom size measurements deleted successfully"
            } else {
                return "unabel to delete"
            }

        } else {
            return "unable to delete custom size measurements";
        }
    },


};