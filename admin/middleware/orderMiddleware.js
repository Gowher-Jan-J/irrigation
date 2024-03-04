
// import capitalize from 'lodash/capitalize.js'
// import { adminDbController } from "../../core/database/Controller/adminDbController.js";
// import { userDbController } from "../../core/database/Controller/userDbController.js";
// import * as Error from "../../core/errors/ErrorConstant.js"
// import { NodeMailerfunction } from "../../core/utils/nodemailer.js";
import moment from 'moment';
// import { PayloadCompiler } from "../access/PayloadCompiler.js";

export class orderMiddleware { }

//category
orderMiddleware.Order = {
    fetchOrders: async () => {
        const fetched = await adminDbController.Orders.fetchOrders();
        if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
            return fetched;
        } else {
            return "No Orders Found"
        }
    },
    fetchSingleOrders: async ({ body }) => {
        const fetchOrder = await adminDbController.Orders.getSingleOrders(body);
        if (fetchOrder != null && fetchOrder != undefined && Object.keys(fetchOrder).length != 0) {
            fetchOrder.cartId = JSON.parse(fetchOrder.cartId);
            fetchOrder.customerId = fetchOrder.customerId;
            fetchOrder.shippingAddress = fetchOrder.shippingAddress;
            fetchOrder.paidAmount = fetchOrder.totalAmount;

            const fetchUser = await adminDbController.Customer.getSingleCustomer(fetchOrder);

            const fetchAddress = await userDbController.Address.fetchAddressbyId(fetchOrder);

            const fetchCart = await userDbController.Cart.fetchCartArray(fetchOrder.cartId);
            if (fetchCart != null) {
                for (let index = 0; index < fetchCart.length; index++) {
                    fetchCart[index].productInfo = JSON.parse(fetchCart[index].productInfo);
                }
            }


            delete fetchOrder.txnToken;
            delete fetchOrder.checksumHash;
            delete fetchOrder.cartId;
            delete fetchOrder.shippingAddress;
            delete fetchOrder.reason;
            delete fetchOrder.customerId;
            delete fetchUser.expiry;
            delete fetchUser.updatedAt;
            delete fetchCart.id;
            delete fetchCart.customerId;
            delete fetchCart.variantId;
            delete fetchCart.status;

            return { fetchOrder, fetchUser, fetchAddress, fetchCart }
        } else {
            return { fetchOrder: [], fetchUser: [], fetchAddress: [], fetchCart: [] }
            // return "No Orders Found";
        }

    },
    changeOrderStatus: async ({ body }) => {
        const fetchOrderbyId = await adminDbController.Orders.getSingleOrders(body);
        const fetchCustomer = await adminDbController.Customer.getSingleCustomer(fetchOrderbyId);
        var isReviewed = [];

        // if (body.orderStatus == "delivered") {
        //     for (let index = 0; index < JSON.parse(fetchOrderbyId.isReturn).length; index++) {
        //         isReturn.push(1);
        //     }
        //     body.isReturn = JSON.stringify(isReturn);
        // } else {
        //     for (let index = 0; index < JSON.parse(fetchOrderbyId.isReturn).length; index++) {
        //         isReturn.push(0);
        //     }
        //     body.isReturn = JSON.stringify(isReturn);

        // }
        if (body.orderStatus == "delivered") {
            for (let index = 0; index < JSON.parse(fetchOrderbyId.isReviewed).length; index++) {
                isReviewed.push(1);
            }
            body.isReviewed = JSON.stringify(isReviewed);
        } else {
            for (let index = 0; index < JSON.parse(fetchOrderbyId.isReviewed).length; index++) {
                isReviewed.push(0);
            }
            body.isReviewed = JSON.stringify(isReviewed);

        }
        body.email = fetchCustomer.email;
        if (body.orderStatus == "delivered") {

            var cartIds = []
            cartIds = JSON.parse(fetchOrderbyId.cartId);
            const orderItems = await userDbController.Cart.fetchCartArray(cartIds);
            const shippingAddress = await userDbController.Address.fetchAddressbyId(fetchOrderbyId);
            var tax = 0;
            var price = 0;
            const formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 })
            for (let index = 0; index < orderItems.length; index++) {
                orderItems[index].productName = capitalize(orderItems[index].productName);
                tax = tax + Number(orderItems[index].inclusiveGST);
                price = price + Number(orderItems[index].totalPrice);
                orderItems[index].totalPrice = formatter.format(orderItems[index].totalPrice);
            }
            price = formatter.format(price);
            tax = formatter.format(tax);
            fetchOrderbyId.totalAmount = formatter.format(Number(fetchOrderbyId.totalAmount));
            fetchCustomer.userName = capitalize(fetchCustomer.userName)
            fetchOrderbyId.updatedAt = moment(fetchOrderbyId.updatedAt).format("MMM Do, Y");

            var orderPlaced = {
                orderId: fetchOrderbyId.orderId,
                orderDate: fetchOrderbyId.updatedAt,
                totalAmount: fetchOrderbyId.totalAmount,
                customerName: fetchCustomer.userName,
                customerContact: fetchCustomer.phone,
                customerEmail: fetchCustomer.email,
                address: shippingAddress,
                products: orderItems,
                taxAmount: tax,
                actualPrice: price,
            };
            // await NodeMailerfunction.Email.writeAReview(body)
            await NodeMailerfunction.Email.orderPlaced(orderPlaced)
        }
        const updated = await adminDbController.Orders.changeOrderStatus(body);
        if (updated[0] != 0) {
            return "Order Updated Successfully"
        } else {
            throw Error.SomethingWentWrong("Unable to Change Status")
        }
    },

    addTrackingInfo: async ({ body }) => {
        const trackingInfo = await adminDbController.Orders.addTrackingInfo(body);
        if (trackingInfo != null && trackingInfo != undefined && Object.keys(trackingInfo).length != 0) {
            return "Tracking Info Added Successfully";
        } else {
            throw Error.SomethingWentWrong("Unable to Add Tracking Info")
        }
    },

    //vendor

    vendorTracking: async ({ body }) => {
        const trackingInfo = await adminDbController.Orders.vendorTracking(body);
        if (trackingInfo != null && trackingInfo != undefined && Object.keys(trackingInfo).length != 0) {
            return trackingInfo;
        } else {
            throw Error.SomethingWentWrong("Unable to Add Tracking Info")
        }
    },
    getOneVendorTracking: async ({ body }) => {
        const fetchedTrackingInfo = await adminDbController.Orders.getOneVendorTracking(body);
        if (fetchedTrackingInfo != null && fetchedTrackingInfo != undefined && Object.keys(fetchedTrackingInfo).length != 0) {
            return fetchedTrackingInfo;
        } else {
            throw Error.SomethingWentWrong("Unable to Add Tracking Info")
        }
    }
}
