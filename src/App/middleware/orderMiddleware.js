import { userDbController } from "../../core/database/Controller/userDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
import require from "requirejs"
import moment from "moment";
import dotenv from "dotenv";
import Razorpay from "razorpay";
dotenv.config();

export class orderMiddleware { }

//products
orderMiddleware.Order = {
  fetchOrders: async ({ token }) => {
    if (token == false) {
      throw Error.AuthenticationFailed();
    }
    var fetched = await userDbController.Order.fetchOrders(token);
    var fetchedLength = fetched.length;
    var cartIds = [];
    var image = [];
    for (let index = 0; index < fetchedLength; index++) {
      // fetched[index].cartId = JSON.parse(fetched[index].cartId);
      // var slave = fetched[index].cartId.length;
      // for (let cartIndex = 0; cartIndex < slave; cartIndex++) {
      //   cartIds.push(fetched[index].cartId[cartIndex]);
      // }
      cartIds.push(fetched[index].cartId);

      var fetchCart = await userDbController.Cart.fetchUserCartArray(cartIds, token);

      for (let temp = 0; temp < fetchCart.length; temp++) {
        image.push(fetchCart[temp].variantImage);
      }
      // fetched[index].variantImages = fetchCart.variantImage;
      fetched[index].variantImages = image;
      fetched[index].units = cartIds.length;
      fetched[index].timestamp = moment(fetched[index].createdAt).format("MMM Do, Y");
      delete fetched[index].cartId;
      delete fetched[index].createdAt;
      var cartIds = [];
      var image = [];
    }
    return fetched;
  },
  fetchOrderDetails: async ({ body, token }) => {
    if (token === false) {
      throw Error.AuthenticationFailed();
    }
    body.customerId = token;
    var orderInfo = await userDbController.Order.getOrderDetails(body);

    if (orderInfo != null && orderInfo != undefined && Object.keys(orderInfo).length != 0) {
      // var cartIds = JSON.parse(orderInfo.cartId);
      var cartIds = orderInfo.cartId;
      var isReviewed = JSON.parse(orderInfo.isReviewed);
      const productInfo = await userDbController.Cart.fetchCartArray(cartIds);
      for (let index = 0; index < isReviewed.length; index++) {
        productInfo[index].isReviewed = isReviewed[index];
        productInfo[index].createdAt = moment(productInfo[index].createdAt).fromNow();
        // orderInfo[index].isReviewed = isReviewed[index];
        // orderInfo[index].createdAt = moment(orderInfo[index].createdAt).fromNow();
      }
      orderInfo.isReviewed = isReviewed
      orderInfo.createdAt = moment(orderInfo.createdAt).format("MMM D ddd Y");
      orderInfo.updatedAt = moment(orderInfo.updatedAt).format("MMM D ddd Y");
      // delete orderInfo.isReviewed;
      delete orderInfo.cartId
      return { orderInfo, productInfo };
    } else {
      return "Orders Summary Not Found";
    }
  },
};
orderMiddleware.Checkout = {
  checkOutAll: async ({ token, body }) => {
    if (token == false) {
      throw Error.AuthenticationFailed();
    }

    body.customerId = token;

    if (token != false && token != undefined && token != null) {
      const fetchCart = await userDbController.Cart.getCartforCheckout(body);
      if (fetchCart.length != 0) {
        const userFetched = await userDbController.Customer.fetchCustomer(body);

        if (userFetched.status == "inactive" || userFetched.status == "terminated") {
          throw Error.SomethingWentWrong("Account Inactive..Contact Admin!")
        } else if (userFetched.length != 0) {

          const fetchAddress = await userDbController.Address.fetchBillingAddress(body);
          var orders = [];

          for (let index = 0; index < fetchCart.length; index++) {
            var master = fetchCart[index].id;
            var isReviewed = 0;
            var sum = Number(fetchCart[index].totalPrice);

            if (sum == null || sum == undefined || sum == 0) {
              throw Error.SomethingWentWrong("Amount is invalid");
            }

            var timestamp = JSON.stringify(Date.now());
            var order = "ORD" + timestamp;

            //payment block
            try {
              body.orderId = order;
              var shippingFee = 0 || 40;

              body.orderType = fetchCart[index].productType
              body.amount = sum;
              var instance = new Razorpay({ key_id: process.env.RZ_PAY_ID, key_secret: process.env.RZ_PAY_KEY, });
              var options = { amount: body.amount * 100, currency: "INR", };

              try {
                const createOrderID = await instance.orders.create(options);
                body.txnToken = createOrderID.id;
                body.cartId = JSON.stringify(master);
                if (createOrderID != null && createOrderID != undefined) {
                  await userDbController.Order.createOrder(body);
                  createOrderID.shippingprice = shippingFee;
                  return createOrderID;
                } else {
                  return "Failed to create an order";
                }
              } catch (error) {
                throw Error.SomethingWentWrong("Unable to Create Order");
              }
            } catch (error) {
              throw Error.SomethingWentWrong("Unable to Checkout");
            }

          }

          return orders;
        }
      } else {
        throw Error.SomethingWentWrong("Ooops..Cart Empty !");
      }

    } else {
      throw Error.AuthenticationFailed();
    }
  }
};

orderMiddleware.Payment = {
  makePayment: async ({ body, token }) => {
    if (token == false) {
      throw Error.AuthenticationFailed();
    }
    body.customerId = token;
    var fetched = await userDbController.Order.fetchOrderbyId(body);
    if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
      var fetchedcartId = [];
      for (let index = 0; index < fetched.length; index++) {
        fetched[index].cartId = JSON.parse(fetched[index].cartId);
        var fetchedLength = fetched[index].cartId.length;

        for (let temp = 0; temp < fetchedLength; temp++) {
          fetchedcartId.push(fetched[index].cartId[temp]);
        }
        body.cartIds = fetchedcartId;
        var fetchedcartId = [];
      }
    } else {
      throw Error.SomethingWentWrong("No Orders found");
    }


    var instance = new Razorpay({ key_id: process.env.RZ_PAY_ID, key_secret: process.env.RZ_PAY_KEY, });
    const paymentResponse = await instance.orders.fetch(body.orderId);
    if (paymentResponse.status === "paid") {
      body.txnStatus = paymentResponse.status;
      body.paymentStatus = "success";
      body.orderStatus = "accepted";
      body.paymentMethod = "web";
      body.paidAmount = Number(paymentResponse.amount_paid) / 100;
      let updateOrder = await userDbController.Order.updatePaynowOrder(body);
      if (updateOrder[0] != 0) {
        const cartArchieved = await userDbController.Cart.archiveCart(body);
        if (cartArchieved != null && cartArchieved != undefined) {
          return "Order Placed Successfully";
        } else {
          return "Unable to Update Order";
        }
      } else {
        return "Unable to Update Order";
      }
    } else {
      body.txnStatus = paymentResponse.status;
      body.paymentStatus = "failed";
      body.orderStatus = "declined";
      body.paymentMethod = "web";
      body.paidAmount = 0;
      await userDbController.Order.updatePaynowOrder(body);
      return "Unable to Update Order";
    }

  },
}
