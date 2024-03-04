import express from "express";
import { connection } from "../connection.js";
import * as Models from "../models/index.js";
import require from "requirejs";
const { Op, Sequelize, where } = require("sequelize");
import * as Error from "../../errors/ErrorConstant.js"


export class vendorDbController { }
vendorDbController.scope = "defaultScope";
vendorDbController.Models = Models;
vendorDbController.connection = connection;
vendorDbController.defaults = {};



vendorDbController.Appconfigs = async () => {
  try {
    return await vendorDbController.Models.vendor.findOne({
      raw: true,
    });
  } catch (error) {
  }
};




vendorDbController.Auth = {
  session: {
    createSession: async (token, device, id) => {
      try {
        return await vendorDbController.Models.vendorAuthentication.create({

          token: token,
          ipv4: device.ip || device.ipv,
          userAgent: device.userAgent,
        });
      } catch (error) {
        throw Error.InternalError("Unable to Create Session");
      }
    },
    findSession: async (token) => {
      try {
        return await vendorDbController.Models.vendorAuthentication.findOne({
          where: {
            token: token,
          }
        })
      } catch (error) {
        return null;
      }
    },
    findMySession: async (data) => {
      try {
        return await vendorDbController.Models.vendorAuthentication.findAll({
          where: {
            id: data.id
            // status: {
            //   // [Op.ne]: "terminate"
            // }
          },
          order: [["s", "DESC"]],
          raw: true,
          attributes: {
            exclude: ["token", "uid", "updatedAt"]
          }
        })
      } catch (error) {
        throw Error.InternalError();
      }
    },
    findSessionId: async (data) => {
      try {
        return await vendorDbController.Models.vendorAuthentication.findOne({
          where: {
            uid: data.id,
          },
          order: [['id', 'DESC'],]
        })

      } catch (error) {
        throw Error.InternalError();
      }
    },
    findSessionById: async (data) => {
      try {
        return await vendorDbController.Models.vendorAuthentication.findOne({
          where: {
            id: data.id,
          },
          order: [['id', 'DESC'],]
        })

      } catch (error) {
        throw Error.InternalError();
      }
    },
    destroySession: async (token) => {
      try {
        return await vendorDbController.Models.vendorAuthentication.destroy({
          where: {
            token: token
          }
        })
      } catch (error) {
        throw Error.InternalError();
      }
    },

    deleteSession: async (data) => {
      try {
        return await vendorDbController.Models.vendorAuthentication.destroy({
          status: "terminate"
        },
          {
            where: {
              id: data.id,
            },
          })
      } catch (error) {
        throw Error.InternalError();
      }
    },
  },
};

vendorDbController.Vendor = {

  checkemailExists: async (data) => {
    try {
      return await vendorDbController.Models.vendor.findOne({
        where: {
          email: data.email,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  checkvendorExistsLogin: async (data) => {
    try {
      return await vendorDbController.Models.vendor.findOne({
        where: {
          email: data.email,
          password: data.password
        },
        raw: true,
      });
    } catch (error) {
      console.error(error);
      throw Error.InternalError();
    }
  },
  checkvendorExistsRegister: async (data) => {
    try {
      return await vendorDbController.Models.vendor.findOne({
        where: {
          email: data.email,
          password: data.password,
        },
        raw: true,
      });
    } catch (error) {

      throw Error.InternalError();
    }
  },
  checkVendorIdExists: async (data) => {
    try {

      return await vendorDbController.Models.vendor.findOne({
        where: {
          id: data
        }
      })
    } catch (error) {
      return null;
    }
  },
  getSingleVendors: async (data) => {
    try {
      return await vendorDbController.Models.vendor.findOne({
        where: {
          id: data,
        },
        attributes: {
          exclude: ["password"]
        },
        raw: true,
      })
    } catch (error) {

      throw Error.InternalError();
    }
  },
  RetailerCheck: async (data, vendorId) => {
    try {
      return await vendorDbController.Models.retailer.findOne({
        where: {
          vendorId: vendorId
        },
        raw: true,
      })
    } catch (error) {

      throw Error.InternalError();
    }
  },
  WholesellerCheck: async (data, vendorId) => {
    try {
      return await vendorDbController.Models.wholeseller.findOne({
        where: {
          vendorId: vendorId
        },
        raw: true,
      })
    } catch (error) {

      throw Error.InternalError();
    }
  },
  GarmentsCheck: async (data, vendorId) => {
    try {
      return await vendorDbController.Models.garments.findOne({
        where: {
          vendorId: vendorId
        },
        raw: true,
      })
    } catch (error) {

      throw Error.InternalError();
    }
  },
  QualitycheckCheck: async (data, vendorId) => {
    try {
      return await vendorDbController.Models.qualityCheck.findOne({
        where: {
          vendorId: vendorId
        },
        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  ManufacturerCheck: async (data, vendorId) => {
    try {
      return await vendorDbController.Models.manufacturer.findOne({
        where: {
          vendorId: vendorId
        },
        raw: true,
      })
    } catch (error) {

      throw Error.InternalError();
    }
  },

  updateVendors: async (data, token) => {
    try {
      return await vendorDbController.Models.vendor.update(
        {
          name: data.name,
          companyName: data.companyName,
          gstNonGst: data.gstNonGst,
          userName: data.userName,
          email: data.email,
          contact: data.contact,
          address: data.address,
          // password: data.password,
          companyType: data.companyType,
          contactPerson: data.contactPerson,
          yourRole: data.yourRole,
          domain: data.domain,
          bankDetails: data.bankDetails,
          companyProfileImage: data.companyProfileImage,
          additionalPerson: data.additionalPerson,
          contact: data.contact,
          department: data.department,
          mail: data.mail,
        },

        {
          where: {
            id: data.id
          },
        })
    } catch (error) {

      throw Error.InternalError();
    }
  },
  updateVendorsStatus: async (data, token) => {
    try {
      return await vendorDbController.Models.vendor.update(
        {
          status: data.status,
        }, {
        where: {
          id: token
        },
      })
    } catch (error) {

      throw Error.InternalError();
    }
  },
  createVendor: async (data) => {
    try {
      return await vendorDbController.Models.vendor.create({
        name: data.name,
        companyName: data.companyName,
        gstNonGst: data.gstNonGst,
        email: data.email,
        contact: data.contact,
        address: data.address,
        password: data.password,
        companyType: data.companyType,
        contactPerson: data.contactPerson,
        yourRole: data.yourRole,
        domain: data.domain,
        bankDetails: data.bankDetails,
        companyProfileImage: data.companyProfileImage,
        additionalPerson: data.additionalPerson,
        contact: data.contact,
        department: data.defaults,
        mail: data.mail,
        status: "inactive",

      }, { raw: true })
    } catch (error) {
      throw Error.InternalError();
    }
  },


  Retailer: async (data, vendorId) => {
    try {
      return await vendorDbController.Models.retailer.create({
        vendorId: vendorId,
        varietyOfFabrics: data.varietyOfFabrics,
        priceRange: data.priceRange,
        modeOfTransport: data.modeOfTransport,
        holdingCapacity: data.holdingCapacity,
        shippingTime: data.shippingTime,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },

  RetailerUpdate: async (data) => {
    try {
      return await vendorDbController.Models.retailer.update({

        varietyOfFabrics: data.varietyOfFabrics,
        priceRange: data.priceRange,
        modeOfTransport: data.modeOfTransport,
        holdingCapacity: data.holdingCapacity,
        shippingTime: data.shippingTime,
      }, {
        where: {
          // id: data.id,
          vendorId: data.vendorId,
        },
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  Wholeseller: async (data, vendorId) => {
    try {
      return await vendorDbController.Models.wholeseller.create({
        vendorId: vendorId,
        varietyOfFabrics: data.varietyOfFabrics,
        priceRange: data.priceRange,
        modeOfTransport: data.modeOfTransport,
        holdingCapacity: data.holdingCapacity,
        shippingTime: data.shippingTime,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  WholesellerUpdate: async (data) => {
    try {
      return await vendorDbController.Models.wholeseller.update({

        varietyOfFabrics: data.varietyOfFabrics,
        priceRange: data.priceRange,
        modeOfTransport: data.modeOfTransport,
        holdingCapacity: data.holdingCapacity,
        shippingTime: data.shippingTime,
      }, {
        where: {
          // id: data.id,
          vendorId: data.vendorId,
        },
      });
    } catch (error) {

      throw Error.InternalError();
    }
  },
  Manufacturer: async (data, vendorId) => {
    try {
      return await vendorDbController.Models.manufacturer.create({
        vendorId: vendorId,
        productionCapacity: data.productionCapacity,
        holdingCapacity: data.holdingCapacity,
        minimumOrderquantity: data.minimumOrderquantity,
        priceRange: data.priceRange,
        shippingTime: data.shippingTime,
        modeOfTransport: data.modeOfTransport,
        productionTime: data.productionTime,
        varietyOfFabrics: data.varietyOfFabrics,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  ManufacturerUpdate: async (data) => {
    try {
      return await vendorDbController.Models.manufacturer.update({

        productionCapacity: data.productionCapacity,
        holdingCapacity: data.holdingCapacity,
        minimumOrderquantity: data.minimumOrderquantity,
        priceRange: data.priceRange,
        shippingTime: data.shippingTime,
        modeOfTransport: data.modeOfTransport,
        productionTime: data.productionTime,
        varietyOfFabrics: data.varietyOfFabrics,
      }, {
        where: {
          // id: data.id,
          vendorId: data.vendorId,
        },
      });
    } catch (error) {

      throw Error.InternalError();
    }
  },

  Garments: async (data, vendorId) => {
    try {
      return await vendorDbController.Models.garments.create({
        vendorId: vendorId,
        machineCapacity: data.machineCapacity,
        typesOfMachines: data.typesOfMachines,
        productionDay: data.productionDay,
        garmentsType: data.garmentsType,
        jobWork: data.jobWork,
        modeOfTransport: data.modeOfTransport,
        priceRange: data.priceRange,
        shippingTime: data.shippingTime,
        questions: data.questions,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  GarmentsUpdate: async (data) => {
    try {
      return await vendorDbController.Models.garments.update({

        machineCapacity: data.machineCapacity,
        typesOfMachines: data.typesOfMachines,
        productionDay: data.productionDay,
        garmentsType: data.garmentsType,
        jobWork: data.jobWork,
        modeOfTransport: data.modeOfTransport,
        priceRange: data.priceRange,
        shippingTime: data.shippingTime,
        questions: data.questions,
      }, {
        where: {
          // id: data.id,
          vendorId: data.vendorId,
        },
      });
    } catch (error) {

      throw Error.InternalError();
    }
  },
  Qualitycheck: async (data, vendorId) => {
    try {
      return await vendorDbController.Models.qualityCheck.create({
        vendorId: vendorId,
        holdingCapacity: data.holdingCapacity,
        minimumOrderquantity: data.minimumOrderquantity,
        priceRange: data.priceRange,
        shippingTime: data.shippingTime,
        modeOfTransport: data.modeOfTransport,
        productionTime: data.productionTime,
        machineOrHand: data.machineOrHand
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  QualitycheckUpdate: async (data) => {
    try {
      return await vendorDbController.Models.qualityCheck.update({

        holdingCapacity: data.holdingCapacity,
        minimumOrderquantity: data.minimumOrderquantity,
        priceRange: data.priceRange,
        shippingTime: data.shippingTime,
        modeOfTransport: data.modeOfTransport,
        productionTime: data.productionTime,
        machineOrHand: data.machineOrHand
      }, {
        where: {
          // id: data.id,
          vendorId: data.vendorId,
        },
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  uploadFabric: async (data) => {
    try {
      return await vendorDbController.Models.fabrics.create({
        name: data.name,
        image: data.image,
        material: data.material,
        average_rating: data.average_rating,
        total_ratings: data.total_ratings,
        price_Meter: data.price_Meter,
        description: data.description,
        yarn: data.yarn,
        composition: data.composition,
        width: data.width,
        gsm: data.gsm,
        code: data.code,
        weave: data.weave,
        pattern: data.pattern,
        color: data.color,
        fabric_weight: data.fabric_weight,
        opacity: data.opacity,
        texture: data.texture,
        shininess: data.shininess,
        ironing: data.ironing,
        status: "active"
      }, {
        raw: true,

      });
    } catch (error) {
      throw Error.InternalError();
    }
  },

  checkFabricsExists: async (data) => {
    try {
      return await vendorDbController.Models.fabrics.findOne({
        where: {
          name: data.name,
          code: data.code,
        },
        raw: true,
      });
    } catch (error) {

      throw Error.InternalError();
    }
  },

  getAllFabric: async (data) => {
    try {
      return await vendorDbController.Models.fabrics.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "expiry"],

        },
        raw: true,
      });
    } catch (error) {

      throw Error.InternalError();
    }
  },

  getOneFabrics: async (data) => {
    try {
      return await vendorDbController.Models.fabrics.findOne({
        where: {
          id: data.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt",]
        }, raw: true,
      })
    } catch (error) {

      throw Error.InternalError();
    }
  },
  updateFabrics: async (data) => {
    try {
      return await vendorDbController.Models.fabrics.update(
        {
          name: data.name,
          image: data.fabimage,
          material: data.material,
          average_rating: data.average_rating,
          total_ratings: data.total_ratings,
          price_Meter: data.price_Meter,
          description: data.description,
          yarn: data.yarn,
          composition: data.composition,
          width: data.width,
          gsm: data.gsm,
          code: data.code,
          weave: data.weave,
          pattern: data.pattern,
          color: data.color,
          fabric_weight: data.fabric_weight,
          opacity: data.opacity,
          texture: data.texture,
          shininess: data.shininess,
          ironing: data.ironing,
        },
        {
          where: { id: data.id },
          raw: true,
        }
      );
    } catch (error) {

      throw Error.InternalError();
    }
  },
  updateFabricssStatus: async (data) => {
    try {
      return await vendorDbController.Models.fabrics.update(
        {
          status: data.status,
        },

        {
          where: {
            id: data.id
          },
        })
    } catch (error) {

      throw Error.InternalError();
    }
  },


  orderFabrics: async (data) => {
    try {
      return await vendorDbController.Models.orders.findAll({
        attributes: ["id", "customerId", "orderId", "orderStatus", "cartId", "orderType", "createdAt", "updatedAt"],
        where: {
          orderType: "customized",
          orderStatus: "accepted"
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getOneOrder: async (data) => {
    try {
      return await vendorDbController.Models.orders.findOne({
        attributes: ["id", "customerId", "orderId", "orderStatus", "cartId", "orderType", "createdAt", "updatedAt"],
        where: {
          // cartId: "data.cartId",
          orderId: data.orderId,
          orderType: "customized"
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },


  orderDetails: async (data) => {
    try {
      return await vendorDbController.Models.cart.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt", "productId", "varientId", "variantColor", "producType", "productInfo", "actualPrice", "totalPrice", "inclusiveGST", "singleProductPrice", "index", "status", "tax"]
        },
        where: {
          productType: "customized",
          id: data.id
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },




  getOneOrderFab: async (data) => {
    try {
      return await vendorDbController.Models.cart.findOne({
        where: {
          id: data.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "varientId", "productId", "variantColor", "producType", "productInfo", "actualPrice", "totalPrice", "inclusiveGST", "singleProductPrice", "index", "status", "tax"]
        }, raw: true,
      })
    } catch (error) {

      throw Error.InternalError();
    }
  },

  orderTracking: async (data) => {
    try {
      return await vendorDbController.Models.vendorOrder.create(
        {
          trackingId: data.trackingId,
          fabricImage: data.fabricImage,
          code: data.code,
          fabricName: data.fabricName,
          courierName: data.courierName,
          receiptImage: data.receiptImage,
        },


      )
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getAllOrderTracking: async (data) => {
    try {
      return await vendorDbController.Models.vendorOrder.findAll({

        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        raw: true,
      })
    } catch (error) {

      throw Error.InternalError();
    }
  },

  getOneTracking: async (data) => {
    try {
      return await vendorDbController.Models.vendorOrder.findOne({
        where: {
          id: data.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchOrders: async (data) => {
    try {
      return await vendorDbController.Models.orders.findAll({
        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },


  fetchDeclinedOrders: async (data) => {
    try {
      return await vendorDbController.Models.orders.findAll({
        where: {
          orderStatus: "declined"
        },
        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },

  getAllBlockOrders: async (data) => {
    try {
      return await vendorDbController.Models.blockOrders.findAll({

        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },


  deleteOrders: async (data) => {
    try {
      return await vendorDbController.Models.orders.destroy({
        where: {
          orderId: data.orderId
        },
        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },

  deleteAllorders: async (data) => {
    try {
      return await vendorDbController.Models.blockOrders.findOne({
        where: {
          orderId: data.orderId
        },
        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  createBlockOrders: async (data) => {
    try {
      return await vendorDbController.Models.blockOrders.create({
        cartId: data.cartId,
        customerId: data.customerId,
        shippingAddress: data.shippingAddress,
        orderId: data.orderId,
        orderType: data.orderType,
        paymentMethod: data.paymentMethod,
        txnToken: data.txnToken,
        txnStatus: data.txnStatus,
        totalAmount: data.totalAmount,
        paidAmount: data.paidAmount,
        deliveryType: data.deliveryType,
        paymentStatus: data.paymentStatus,
        isReviewed: data.isReviewed,
        trackingInfo: data.trackingInfo,
        orderStatus: data.orderStatus

      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchOrderCount: async (data) => {
    try {
      return await vendorDbController.Models.orders.count({
        where: {
          orderStatus: "accepted"
        },
        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchFabricCount: async (data) => {
    try {
      return await vendorDbController.Models.fabrics.count({
        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchFabrics: async (data) => {
    try {
      return await vendorDbController.Models.fabrics.count({
        where: {
          status: "inactive"
        },

        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchBlockOrders: async (data) => {
    try {
      return await vendorDbController.Models.blockOrders.count({
        where: {
          orderType: "customized"
        },

        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
}




