import sequelize from "sequelize";
const { Model, DataTypes } = sequelize;
import { connection } from "../connection.js";

class wishlist extends Model { }

wishlist.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    productId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
  },
  { sequelize: connection, freezeTableName: true }
);

class cart extends Model { }

cart.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    productId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    fabricId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: "0",
    },
    fabricName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    productName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    productType: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "normal",
    },
    productInfo: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    variantId: {
      type: DataTypes.STRING(255),
      defaultValue: "0",
      allowNull: true,
    },
    variantColor: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    variantImage: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    singleProductPrice: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    actualPrice: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    totalPrice: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "0"
    },
    inclusiveGST: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    units: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "0",
    },
    size: {
      type: DataTypes.ENUM("XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL", "7XL"),
      allowNull: true,
      defaultValue: "Xs"
    },

    index: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    tax: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "0",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "terminated"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  { sequelize: connection, freezeTableName: true }
);



class orders extends Model { }

orders.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: false,
    },
    shippingAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "notfound",
    },
    cartId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      // defaultValue: "notfound",
    },
    orderId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "notfound",
    },
    orderType: {
      type: DataTypes.ENUM("normal", "customized"),
      allowNull: true,

    },
    paymentMethod: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "notfound",
    },
    txnToken: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    txnStatus: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "notfound",
    },
    totalAmount: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: false,
    },
    paidAmount: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: false,
    },
    // reason: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    //   defaultValue: "notfound",
    // },
    deliveryType: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "notfound",
    },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "success", "failed", "refunded"),
      allowNull: false,
      defaultValue: "pending",
    },
    isReviewed: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "[]",
    },
    trackingInfo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    orderStatus: {
      type: DataTypes.ENUM("declined", "pending", "accepted", "packaging", "dispatched", "delivered"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  { sequelize: connection, freezeTableName: true }
);

class blockOrders extends Model { }

blockOrders.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: false,
    },
    shippingAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "notfound",
    },
    cartId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      // defaultValue: "notfound",
    },
    orderId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "notfound",
    },
    orderType: {
      type: DataTypes.ENUM("normal", "customized"),
      allowNull: true,

    },
    paymentMethod: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "notfound",
    },
    txnToken: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    txnStatus: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "notfound",
    },
    totalAmount: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: false,
    },
    paidAmount: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: false,
    },
    // reason: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    //   defaultValue: "notfound",
    // },
    deliveryType: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "notfound",
    },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "success", "failed", "refunded"),
      allowNull: false,
      defaultValue: "pending",
    },
    isReviewed: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "[]",
    },
    trackingInfo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    orderStatus: {
      type: DataTypes.ENUM("declined", "pending", "accepted", "packaging", "dispatched", "delivered"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  { sequelize: connection, freezeTableName: true }
);

class reviews extends Model { }

reviews.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    customerId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    customerImage: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    productId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    variantId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    rating: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "terminated"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  { sequelize: connection, freezeTableName: true }
);
class faq extends Model { }

faq.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  { sequelize: connection, freezeTableName: true }
);

class bulkOrder extends Model { }

bulkOrder.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    companyContact: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    companyEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  { sequelize: connection, freezeTableName: true }
);


class homePage extends Model { }

homePage.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize: connection, freezeTableName: true }
);


class ccavenue extends Model { }

ccavenue.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    payment_mode: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    amount: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    merchant_param1: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    merchant_param2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    merchant_param3: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    merchant_param4: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    merchant_param5: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    order_status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pg_response: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { sequelize: connection, freezeTableName: true }
);

class contact extends Model { }

contact.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize: connection, freezeTableName: true }
);



export { wishlist, cart, orders, reviews, faq, bulkOrder, homePage, contact, ccavenue, blockOrders };
