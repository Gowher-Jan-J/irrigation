import express from "express";
import { connection } from "../connection.js";
import * as Models from "../models/index.js";
import require from "requirejs";
const { Op, Sequelize, where } = require("sequelize");
import * as Error from "../../errors/ErrorConstant.js"

export class adminDbController { }
adminDbController.scope = "defaultScope";
adminDbController.Models = Models;
adminDbController.connection = connection;
adminDbController.defaults = {};



adminDbController.Appconfigs = async () => {
  try {
    return await adminDbController.Models.config.findOne({
      raw: true,
    });
  } catch (error) {
  }
};


adminDbController.Auth = {
  checkemailExists: async (data) => {
    try {
      return await adminDbController.Models.admin.findOne({
        where: {
          email: data.email,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  checkAdminExistsLogin: async (data) => {
    try {
      return await adminDbController.Models.admin.findOne({
        where: {
          [Op.or]: {
            email: data.email ,
            phone: data.phone 
          },
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  checkAdminExistsRegister: async (data) => {
    try {
      return await adminDbController.Models.admin.findOne({
        where: {
          [Op.or]: {
            email: data.email || null,
            phone: data.phone || null,
          },
        },
        raw: true,
      });
    } catch (error) {
      console.log(error);
      throw Error.InternalError();
    }
  },
  checkUserIdExists: async (data) => {
    try {
      return await adminDbController.Models.admin.findOne({
        where: {
          id: data.userId,
          type: "ROOT",
          status: "active"
        },
        attributes: ["id", "username"],
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  createUid: async (data) => {
    const code = Math.floor(100000 + Math.random() * 900000);
    try {
      const updated_data = await adminDbController.Models.customer.update(
        { code: code },
        { where: { id: data.id } },
        { plain: true, returning: true }
      );
      if (updated_data[0] == 1) {
        return adminDbController.Models.customer.findOne({
          where: { email: data.email },
          attributes: ["userName", "email", "code"],
          raw: true,
        });
      } else {
        return null;
      }
    } catch (error) {
      throw Error.InternalError();
    }
  },
  verifyOtp: async (data) => {
    try {
      return await adminDbController.Models.customer.findOne({
        where: { email: data.email, code: data.code },
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  updatePassword: async (data) => {
    try {
      return await adminDbController.Models.customer.update(
        {
          password: data.password,
          code: 0,
        },
        {
          where: { email: data.email },
        }
      );
    } catch (error) {
      throw Error.InternalError();
    }
  },
  session: {
    createSession: async (token, device, id) => {
      try {
        return await adminDbController.Models.adminAuthentication.create({
          uid: id,
          token: token,
          latLong: device.latLong,
          ipv4: device.ip || device.ipv,
          userAgent: device.userAgent,
        });
      } catch (error) {
        throw Error.InternalError("Unable to Create Session");
      }
    },
    findSession: async (token) => {
      try {
        return await adminDbController.Models.adminAuthentication.findOne({
          where: {
            token: token,
          }, raw: true
        })
      } catch (error) {
        throw Error.InternalError();
      }
    },
    findMySession: async (data) => {
      try {
        return await adminDbController.Models.adminAuthentication.findAll({
          where: {
            uid: data.id,
            status: {
              [Op.ne]: "terminate"
            }
          },
          order: [["id", "DESC"]],
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
        return await adminDbController.Models.adminAuthentication.findOne({
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
        return await adminDbController.Models.adminAuthentication.findOne({
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
        return await adminDbController.Models.adminAuthentication.update({
          status: "inactive"
        },
          {
            where: {
              token: token,
            },
          })
      } catch (error) {
        throw Error.InternalError();
      }
    },
    deleteSession: async (data) => {
      try {
        return await adminDbController.Models.adminAuthentication.update({
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

adminDbController.Admin = {
  createAdmin: async (data) => {
    console.log(data);
    try {
      return await adminDbController.Models.admin.create({
        email: data.email,
        phone: data.phone,
        password: data.password,
        username:data.username,
        status: "inactive",
        type: "USER",
      }, { raw: true })
    } catch (error) {
      console.log(error);
      throw Error.InternalError();
    }
  }
}

//shop
adminDbController.Shop = {
  fetchbanners: async () => {
    try {
      return await adminDbController.Models.banner.findAll({
        order: [["bannerType", "ASC"]], raw: true, attributes: ["id",
          "bannerImage",
          "bannerType", "status"]
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  createbanners: async (data) => {
    try {
      return await adminDbController.Models.banner.create({
        bannerImage: data.bannerImage,
        // bannerText: data.bannerText,
        bannerType: data.bannerType,
        // bannerFor: data.bannerFor,
        // productOrCategoryId: data.productOrCategoryId,
        status: "active"
      }, { raw: true })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getfaq: async (data) => {
    try {
      return await adminDbController.Models.faq.findAll({
        where: {
          status: "active"
        }, raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  addfaq: async (data) => {
    try {
      return await adminDbController.Models.faq.create({
        title: data.faqTitle,
        answer: data.faqAnswer,
        status: "active"
      }, { raw: true })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  removefaq: async (data) => {
    try {
      return await adminDbController.Models.faq.update({
        status: data.status,
      }, {
        where: {
          id: data.id,
        }
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  putbanners: async (data) => {
    try {
      return await adminDbController.Models.banner.update({
        status: data.status,
      }, {
        where: {
          id: data.bannerId,
        }
      }
      )
    } catch (error) {
      throw Error.InternalError();
    }
  },

  fetchTax: async (data) => {
    if (data.taxId != null && data.taxId != undefined) {
      try {
        return await adminDbController.Models.taxRates.findOne({
          where: {
            id: data.taxId,
            status: "status",
          }
        })
      } catch (error) {
        throw Error.InternalError();
      }
    } else {
      try {
        return await adminDbController.Models.taxRates.findAll({
          where: {
            status: "active",
          }
        })
      } catch (error) {
        throw Error.InternalError();
      }
    }
  },
  addTax: async (data) => {
    try {
      return await adminDbController.Models.taxRates.create({
        taxName: data.taxName,
        taxPercentage: data.taxPercentage,
        status: "active",
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  removeTax: async (data) => {
    try {
      return await adminDbController.Models.taxRates.destroy({
        where: {
          id: data.taxId
        }
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
}

//customers
adminDbController.Customer = {
  fetchCustomers: async () => {
    // const limit = Number(16);
    try {
      return await adminDbController.Models.customer.findAll({
        attributes: {
          exclude: ["alaisName", "dob", "code", "password", "fcmToken", "createdAt", "updatedAt", "expiry"]
        },
        order: [["userName", "ASC"]],
        raw: true,
        // limit: 16,
        // offset: 0 + (Number(data.pagination) - 1) * limit
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  // fetchCustomerCount: async () => {
  //   try {
  //     return await adminDbController.Models.customer.count({
  //       raw: true,
  //     })
  //   } catch (error) {
  //     throw Error.InternalError();
  //   }
  // },

  getSingleCustomer: async (data) => {
    try {
      return await adminDbController.Models.customer.findOne({
        where: {
          id: data.customerId
        },
        attributes: {
          exclude: ["code", "password", "fcmToken", "expiry", "updatedAt"]
        },
        // include: { model: [Models.shippingAddress] },
        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  updateCustomerDetails: async (data) => {
    try {
      return await adminDbController.Models.customer.update(
        {
          userName: data.userName,
          email: data.email,
          phone: data.phone,
          gender: data.gender,
          isMailVerified: data.isMailVerified,
          isPhoneVerified: data.isPhoneVerified,
          acceptTerms: data.acceptTerms
        },

        {
          where: {
            id: data.customerId
          },
        })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  updateCustomerStatus: async (data) => {
    try {
      return await adminDbController.Models.customer.update(
        {
          status: data.status,
        },

        {
          where: {
            id: data.customerId
          },
        })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchBulkOrders: async () => {
    try {
      return await adminDbController.Models.bulkOrder.findAll({
        order: [["id", "DESC"]],
        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  contactPage: async () => {
    try {
      return await adminDbController.Models.contact.findAll({
        order: [["id", "DESC"]],
        raw: true,

      })
    } catch (error) {
      throw Error.InternalError();
    }
  },

  addMsgPop: async (data) => {
    try {
      return await adminDbController.Models.homePage.update({
        message: data.message,
        image: data.image,
      }, { where: { id: 1 } })
    } catch (error) {
      throw Error.InternalError();
    }
  },

},
  adminDbController.Vendor = {
    createVendor: async (data) => {
      try {
        return await adminDbController.Models.vendor.create({
          name: data.name,
          companyName: data.companyName,
          gstNonGst: data.gstNonGst,
          userName: data.userName,
          email: data.email,
          contact: data.contact,
          address: data.address,
          password: data.password,
          companyType: data.companyType,
          contactPerson: data.contactPerson,
          yourRole: data.yourRole,
          domain: data.domain,
          bankDetails: data.bankDetails,
          companyProfileImage: data.image,
          additionalPerson: data.additionalPerson,
          contactPerson1: data.contactPerson1,
          department: data.defaults,
          mail: data.mail,
          status: "inactive",
        }, { raw: true })
      } catch (error) {
        throw Error.InternalError();
      }
    },

    checkvendorExistsRegister: async (data) => {
      try {
        return await adminDbController.Models.vendor.findOne({
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

    fetchVendors: async () => {

      try {
        return await adminDbController.Models.vendor.findAll({
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"]
          },
          order: [["name", "ASC"]],
          raw: true,

        })
      } catch (error) {

        throw Error.InternalError();
      }
    },
    getSingleVendors: async (data) => {
      try {
        return await adminDbController.Models.vendor.findOne({
          where: {
            id: data.id
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
        return await adminDbController.Models.retailer.findOne({
          where: {
            id: vendorId
          },
          raw: true,
        })
      } catch (error) {

        throw Error.InternalError();
      }
    },
    WholesellerCheck: async (data, vendorId) => {
      try {
        return await adminDbController.Models.wholeseller.findOne({
          where: {
            id: vendorId
          },
          raw: true,
        })
      } catch (error) {

        throw Error.InternalError();
      }
    },
    GarmentsCheck: async (data, vendorId) => {
      try {
        return await adminDbController.Models.garments.findOne({
          where: {
            id: vendorId
          },
          raw: true,
        })
      } catch (error) {

        throw Error.InternalError();
      }
    },
    QualitycheckCheck: async (data, vendorId) => {
      try {
        return await adminDbController.Models.qualityCheck.findOne({
          where: {
            id: vendorId
          },
          raw: true,
        })
      } catch (error) {
        throw Error.InternalError();
      }
    },
    ManufacturerCheck: async (data, vendorId) => {
      try {
        return await adminDbController.Models.manufacturer.findOne({
          where: {
            id: vendorId
          },
          raw: true,
        })
      } catch (error) {
        throw Error.InternalError();
      }
    },

    updateVendors: async (data) => {
      try {
        return await adminDbController.Models.vendor.update(
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
            companyProfileImage: data.image,
            additionalPerson: data.additionalPerson,
            contactPerson1: data.contactPerson1,
            department: data.department,
            mail: data.mail,
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
    updateVendorsStatus: async (data) => {
      try {
        return await adminDbController.Models.vendor.update(
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
    getProfile: async (data) => {
      try {

        return await adminDbController.Models.vendor.findOne({
          where: {
            id: data.id
          },
          attributes: {
            exclude: ["password"]
          },
          raw: true,
        });
      } catch (error) {
        throw Error.InternalError();
      }
    },


    Retailer: async (data, vendorId) => {
      try {
        return await adminDbController.Models.retailer.create({
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
        return await adminDbController.Models.retailer.update({

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
    Wholeseller: async (data, vendorId,) => {
      try {
        return await adminDbController.Models.wholeseller.create({
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
        return await adminDbController.Models.wholeseller.update({

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
        return await adminDbController.Models.manufacturer.create({
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
        return await adminDbController.Models.manufacturer.update({

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
        return await adminDbController.Models.garments.create({
          vendorId: vendorId,
          machineCapacity: data.machineCapacity,
          typesOfMachines: data.typesOfMachines,
          productionDay: data.productionDay,
          garmentsType: data.garmentsType,
          jobWork: data.jobWork,
          modeOfTransport: data.modeOfTransport,
          priceRange: data.priceRange,
          shippingTime: data.shippingTime,
          questions: data.questions

        });
      } catch (error) {

        throw Error.InternalError();
      }
    },
    GarmentsUpdate: async (data) => {
      try {
        return await adminDbController.Models.garments.update({

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
        return await adminDbController.Models.qualityCheck.create({
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
        return await adminDbController.Models.qualityCheck.update({

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
        return await adminDbController.Models.fabrics.create({
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
        return await adminDbController.Models.fabrics.findOne({
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
    fetchFabricsCount: async (data) => {
      try {
        return await adminDbController.Models.fabrics.count({
          raw: true,
        });
      } catch (error) {
        throw Error.InternalError();
      }
    },
    fetchFabricsInActive: async (data) => {
      try {
        return await adminDbController.Models.fabrics.count({
          where: {
            status: "inactive"
          }, raw: true,
        });
      } catch (error) {
        throw Error.InternalError();
      }
    },
    checkvendorExistsRegister: async (data) => {
      try {
        return await adminDbController.Models.vendor.findOne({
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
    fetchvendorsCount: async (data) => {
      try {
        return await adminDbController.Models.vendor.count({
          raw: true,
        });
      } catch (error) {

        throw Error.InternalError();
      }
    },

    fetchvendorsInActive: async (data) => {
      try {
        return await adminDbController.Models.vendor.count({
          where: {
            status: "inactive"
          }, raw: true,
        });
      } catch (error) {

        throw Error.InternalError();
      }
    },
    getAllFabric: async (data) => {
      try {
        return await adminDbController.Models.fabrics.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt", "expiry"]
          },
          raw: true,
        });
      } catch (error) {

        throw Error.InternalError();
      }
    },
    getOneFabrics: async (data) => {
      try {
        return await adminDbController.Models.fabrics.findOne({
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
        return await adminDbController.Models.fabrics.update(
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
        return await adminDbController.Models.vendor.update(
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
        return await adminDbController.Models.orders.findAll({
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
        return await adminDbController.Models.orders.findOne({
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
    getOneOrderFab: async (data) => {
      try {
        return await adminDbController.Models.cart.findOne({
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

  },

  //category
  adminDbController.Category = {
    checkCategoryExists: async (data) => {
      try {
        return await adminDbController.Models.category.findOne({
          where: {
            categoryName: data.categoryName,
            status: "active",
          }, raw: true
        })
      } catch (error) {
        throw Error.InternalError();
      }
    },
    fetchCategoryCount: async () => {
      try {
        return await adminDbController.Models.category.count({
          raw: true,
        })
      } catch (error) {
        throw Error.InternalError();
      }
    },
    fetchCategoryTax: async (data) => {
      try {
        return await adminDbController.Models.category.findOne({
          where: {
            taxId: data.taxId,
            status: "active",
          }, raw: true
        })
      } catch (error) {
        throw Error.InternalError();
      }
    },
    //check product table 
    checkProductExistsInCategory: async (data) => {
      try {
        return await adminDbController.Models.product.findOne({
          where: {
            categoryId: data.categoryId,
            // status: "active",
          }, raw: true
        })
      } catch (error) {
        throw Error.InternalError();
      }
    },
    createCategory: async (data) => {
      try {
        return await adminDbController.Models.category.create({
          categoryName: data.categoryName.toLowerCase(),
          categoryImage: data.categoryImage,
          taxId: data.taxId,
          taxPercentage: data.taxPercentage,
          status: "active",
        }, { raw: true })
      } catch (error) {

        throw Error.InternalError();
      }
    },
    getCategory: async (data) => {
      if (data.categoryId != null && data.categoryId != undefined) {
        try {
          return await adminDbController.Models.category.findOne({
            where: {
              id: data.categoryId,
              status: "active",
            }
          })

        } catch (error) {
          throw Error.InternalError();
        }
      } else {
        try {
          return await adminDbController.Models.category.findAll({
            raw: true
          })
        } catch (error) {
          throw Error.InternalError();

        }
      }
    },
    putCategory: async (data) => {
      try {
        return await adminDbController.Models.category.update({
          categoryName: data.categoryName.toLowerCase(),
          categoryImage: data.categoryImage,
          taxPercentage: data.taxPercentage,
          taxName: data.taxName,
        }, {
          where: {
            id: data.categoryId
          }
        })
      } catch (error) {
        throw Error.InternalError();
      }
    },
    destroyCategory: async (data) => {
      try {
        return await adminDbController.Models.category.update({
          status: data.status,
        }, {
          where: {
            id: data.categoryId
          }
        })
      } catch (error) {

        throw Error.InternalError();
      }
    },
  };

//Product
adminDbController.Product = {
  checkProductExists: async (data) => {
    try {
      return await adminDbController.Models.product.findOne({
        where: {
          categoryId: data?.categoryId,
          categoryName: data?.categoryName,
          productName: data?.productName.toLowerCase(),
          // status: "active",
        }, raw: true
      })
    } catch (error) {

      throw Error.InternalError();
    }
  },
  fetchProductCount: async () => {
    try {
      return await adminDbController.Models.product.count({
        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getAllProducts: async (data) => {
    if (data.productId?.trim() && data.productId?.trim() != 'null') {
      try {

        return await adminDbController.Models.product.findOne({
          where: {
            id: data.productId
          },
          raw: true
        })
      } catch (error) {
        throw Error.InternalError();
      }
    } else {
      try {

        return await adminDbController.Models.product.findAll({
          raw: true
        })
      } catch (error) {

        throw Error.InternalError();
      }
    }
  },
  //check productvariant table 
  checkVariantExistsInProduct: async (data) => {
    try {
      return await adminDbController.Models.productVariants.findOne({
        where: {
          productId: data.productId,
          // productName: data.productName,
          // status: "active",
        }, raw: true
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  createProduct: async (data) => {
    try {
      return await adminDbController.Models.product.create({
        categoryId: data?.categoryId,
        categoryName: data?.categoryName.toLowerCase(),
        tax: data?.tax,
        productImage: data?.image,
        productName: data?.productName.toLowerCase(),
        productDescription: data?.productDescription,
        moreInfo: data?.moreInfo || "No Info Available",
        tags: data?.tags,
        availableLocations: data?.availableLocations || "asdas",
        status: "active",
      })
    } catch (error) {

      throw Error.InternalError();
    }
  },
  putProduct: async (data) => {
    try {
      return await adminDbController.Models.product.update({
        productImage: data?.productImage,
        productName: data?.productName.toLowerCase(),
        productDescription: data?.productDescription,
        moreInfo: data?.moreInfo,
        tags: data?.tags,
        availableLocations: data?.availableLocations,
        status: data?.status,
      }, {
        where: {
          id: data.productId
        }
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  inactivateProducts: async (data) => {
    try {
      return await adminDbController.Models.product.update({
        status: data?.status,
      }, {
        where: {
          categoryId: data.categoryId
        }
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  findProductById: async (productId) => {
    try {
      return await adminDbController.Models.product.findOne({
        where: {
          id: productId,
        },
        raw: true
      })
    } catch (error) {

      throw Error.InternalError();
    }
  },
  destroyProduct: async (data) => {
    var productId = Number(data.productId);
    try {
      return await adminDbController.Models.product.update({
        status: data.status,
      }, {
        where: {
          id: productId,
        },
        raw: true
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  addRecommended: async (data) => {
    try {
      return await adminDbController.Models.recommendedProducts.create({
        productId: data.productId
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getAllRecommended: async (data) => {
    try {
      return await adminDbController.Models.recommendedProducts.findAll()
    } catch (error) {
      throw Error.InternalError();
    }
  },
  deleteRecommended: async (data) => {
    try {
      return await adminDbController.Models.recommendedProducts.destroy({
        where: {
          productId: data.productId
        },
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchProductArray: async (productIds) => {
    try {
      return await adminDbController.Models.product.findAll({
        where: {
          id: {
            [Op.in]: productIds,
          },

          status: "active"
        },
        raw: true,
        attributes: ["id", "productName", "productImage", "categoryName"],
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
}



//Product variant
adminDbController.Variant = {
  fetchVariants: async (data) => {
    if (data.productId != null && data.productId != undefined) {
      try {
        return await adminDbController.Models.productVariants.findAll({
          where: {
            productId: data.productId,
          }, raw: true, attributes: ["id", "productName", "productId", "variantName", "status", "createdAt", "updatedAt"]
        })
      } catch (error) {
        throw Error.InternalError();
      }
    } else if (data.variantId != null && data.variantId != undefined) {
      try {
        return await adminDbController.Models.productVariants.findOne({
          where: {
            id: data?.variantId,
          }, raw: true
        })
      } catch (error) {
        throw Error.InternalError();
      }
    }
  },
  checkVariantExists: async (data) => {
    try {
      return await adminDbController.Models.productVariants.findOne({
        where: {
          productId: data.productId,
          variantName: data.variantName,
          // status: "active",
        }, raw: true
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  checkVariantIdExists: async (data) => {
    try {
      return await adminDbController.Models.productVariants.findOne({
        where: {
          id: data?.variantId,
          // status: "active",
        }, raw: true
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  createVariant: async (data) => {
    try {
      return await adminDbController.Models.productVariants.create({
        productId: data?.productId,
        productName: data?.productName?.toLowerCase().trim(),
        variantName: data?.variantName,
        variantImage: data?.variantImage,
        altTags: data?.altTags,
        variantColor: data?.variantColor || null,
        isColor: data?.isColor || false,
        actualPrice: data?.actualPrice,
        discountPrice: data?.discountPrice,
        tax: data?.tax,
        status: "active",

      }, { raw: true })
    } catch (error) {

      throw Error.InternalError();
    }
  },
  putVariant: async (data) => {
    try {
      return await adminDbController.Models.productVariants.update({
        productName: data?.productName.toLowerCase(),
        variantName: data?.variantName.toLowerCase(),
        variantImage: data?.variantImage,
        altTags: data?.tags || null,
        variantColor: data?.variantColor || "[]",
        isColor: data?.isColor,
        actualPrice: data?.actualPrice,
        discountPrice: data?.discountPrice,
      }, {
        where: {
          id: data.variantId
        }
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  destroyVariant: async (data) => {
    try {
      return await adminDbController.Models.productVariants.update({
        status: data?.status,
      }, {
        where: {
          id: data?.variantId
        }
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  Stock: {
    fetchStock: async (data) => {
      if (data.productId != null && data.productId != undefined) {
        try {
          return await adminDbController.Models.productVariants.findAll({
            where: {
              productId: data.productId,
            }, attributes: ["id",
              "productId",
              "productName",
              "variantName", "variantImage",
              "variantColor",
              "tax",
              "availableStock",
              "alternateStock",], raw: true
          })
        } catch (error) {
          throw Error.InternalError();
        }
      } else if (data.variantId != null && data.variantId != undefined) {
        try {
          return await adminDbController.Models.productVariants.findAll({
            where: {
              id: data.variantId,
            }, attributes: ["id",
              "productId",
              "productName",
              "variantName", "variantImage",
              "variantColor",
              "tax",
              "availableStock",
              "alternateStock",], raw: true
          })
        } catch (error) {
          throw Error.InternalError();
        }
      }
    },
    putStock: async (data) => {
      try {
        return await adminDbController.Models.productVariants.update({
          availableStock: data?.availableStock,
          alternateStock: data?.alternateStock,
        }, {
          where: {
            id: data.variantId
          }
        })
      } catch (error) {

        throw Error.InternalError();
      }
    },
  },
};

//Product Blog
adminDbController.Blog = {
  checkBlogLimit: async (data) => {
    try {
      return await adminDbController.Models.product.findOne({
        where: {
          id: data.productId,
        },
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getBlog: async (data) => {
    if (data.productId != null && data.productId != undefined) {
      try {
        return await adminDbController.Models.productBlog.findAll({
          where: {
            productId: data.productId,
          },
          raw: true,
          attributes: {
            exclude:
              ["createdAt", "updatedAt"]
          }
        })
      } catch (error) {
        throw Error.InternalError();
      }
    } else {
      try {
        return await adminDbController.Models.productBlog.findAll({
          raw: true,
          attributes: {
            exclude:
              ["createdAt", "updatedAt"]
          }
        })
      } catch (error) {
        throw Error.InternalError();
      }
    }
  },
  createBlog: async (data) => {
    try {
      return await adminDbController.Models.productBlog.create({
        productId: data.productId,
        sectionImage: data.sectionImage,
        status: "active",
      })

    } catch (error) {
      throw Error.InternalError();
    }
  },
  putBlog: async (data) => {
    try {
      return await adminDbController.Models.productBlog.update({
        status: data.status,
      }, {
        where: {
          id: data.blogId
        }
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  updateBlog: async (data) => {
    try {
      return await adminDbController.Models.product.update({
        blogLimit: data.blogLimit,
      }, {
        where: {
          id: data.productId
        }
      })
    } catch (error) {
      throw Error.InternalError();
    }
  }
};

//Product Blog
adminDbController.Specifications = {
  getProductTitles: async (data) => {
    try {
      return await adminDbController.Models.productTitle.findAll({
        where: {
          categoryId: data.categoryId
        }, raw: true
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  checkTitleExists: async (data) => {
    try {
      return await adminDbController.Models.productTitle.findOne({
        where: {
          categoryId: data.categoryId,
        }
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  createProductTitle: async (data) => {
    try {
      return await adminDbController.Models.productTitle.create({
        categoryId: data.categoryId,
        productTitle: data.productTitle,
      }, {
        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  updateProductTitle: async (data) => {
    try {
      return await adminDbController.Models.productTitle.update({
        productTitle: data.productTitle,
      }, {
        where: {
          categoryId: data.categoryId,
        }
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  deleteTitle: async (data) => {
    try {
      return await adminDbController.Models.productTitle.destroy({
        where: {
          id: data.titleId,
        }
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },

  //product Specifications
  checkSpecExists: async (data) => {
    try {
      return await adminDbController.Models.productSpecifications.findOne({
        where: {
          productId: data.productId,
        }
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },

  createProductSpecs: async (data) => {
    try {
      return await adminDbController.Models.productSpecifications.create({
        productId: data.productId,
        productSpecification: data.productSpecification,
      }, {
        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },


  updateSpecification: async (data) => {
    try {
      return await adminDbController.Models.productSpecifications.update({
        productSpecification: data.productSpecification,
      }, {
        where: {
          productId: data.productId,
        }
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },

  deleteSpecification: async (data) => {
    try {
      return await adminDbController.Models.productSpecifications.destroy({
        where: {
          id: data.specificationId,
        }
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },


}

//Orders
adminDbController.Orders = {
  fetchOrders: async () => {
    try {
      return await adminDbController.Models.orders.findAll({
        where: {
          // customerId: tokenId,
          orderStatus: {
            [Op.ne]: ["pending"]
          },
        },
        order: [["id", "DESC"]],
        raw: true,
        attributes: {
          exclude: ["txnToken", "customerId", "shippingAddress", "cartId", "isReviewed"]
        }
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchOrderCount: async () => {
    try {
      return await adminDbController.Models.orders.count({
        raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getSingleOrders: async (data) => {
    try {
      return await adminDbController.Models.orders.findOne({
        where: {
          orderId: data.orderId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  changeOrderStatus: async (data) => {
    try {
      return await adminDbController.Models.orders.update({
        orderStatus: data.orderStatus,
        isReviewed: data.isReviewed,
      }, {
        where: {
          orderId: data.orderId,
        }
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  addTrackingInfo: async (data) => {
    try {
      return await adminDbController.Models.orders.update({
        trackingInfo: data.trackingInfo,
      }, {
        where: {
          orderId: data.orderId,
        }
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  vendorTracking: async (data) => {
    try {
      return await adminDbController.Models.vendorOrder.findAll({
        // where: {
        //   trackingId: data.trackingId,
        // }
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },

  getOneVendorTracking: async (data) => {
    try {
      return await adminDbController.Models.vendorOrder.findOne({
        where: {
          trackingId: data.trackingId,
        }, attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },

}