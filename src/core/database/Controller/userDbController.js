import express from "express";
import { connection } from "../connection.js";
import * as Models from "../models/index.js";
import require from "requirejs";
import * as Error from "../../errors/ErrorConstant.js"
import { categoryId } from "../../schema/schema.js";
const { Op, Sequelize } = require("sequelize");
export class userDbController { }
userDbController.scope = "defaultScope";
userDbController.Models = Models;
userDbController.connection = connection;
userDbController.defaults = {};

//user checkexists
userDbController.Auth = {
  checkemailExists: async (data) => {
    try {
      return await userDbController.Models.customer.findOne({
        where: {
          email: data.email,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  checkUserExists: async (data) => {
    try {
      return await userDbController.Models.customer.findOne({
        where: {
          [Op.or]: {
            email: data.email,
            phone: data.phone,
          },
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  createUid: async (data) => {

    try {
      const updated_data = await userDbController.Models.customer.update(
        { code: data.code, expiry: data.expiry },
        { where: { id: data.id } },
        { plain: true, returning: true }
      );
      if (updated_data[0] == 1) {
        return userDbController.Models.customer.findOne({
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
      return await userDbController.Models.customer.findOne({
        where: { email: data.email, code: data.code },
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  verifyUser: async (data) => {
    try {
      return await userDbController.Models.customer.update({ status: "active", isMailVerified: "yes" }, {
        where: { id: data.id },
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  updatePassword: async (data) => {
    try {
      return await userDbController.Models.customer.update(
        {
          password: data.password,
          code: 0,
          expiry: 0,
          status: "active"
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
    createSession: async (token, device) => {
      try {
        return await userDbController.Models.customerAuthentication.create({
          token: token,
          ipv4: device.ip || device.ipv,
          userAgent: device.userAgent,
        });
      } catch (error) {
        throw Error.InternalError();
      }
    },
    findSession: async (token) => {
      try {
        return await userDbController.Models.customerAuthentication.findOne({
          where: {
            token: token
          }
        })
      } catch (error) {
        return null;
      }
    },
    destroySession: async (token) => {
      try {
        return await userDbController.Models.customerAuthentication.destroy({
          where: {
            token: token
          }
        })
      } catch (error) {
        throw Error.InternalError();
      }
    },
  },
};

userDbController.Customer = {
  createCustomer: async (data) => {
    try {
      return await userDbController.Models.customer.create({
        userName: data.userName,
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        dob: data.dob,
        gender: data.gender,
        status: "inactive",
      });
    } catch (error) {
      console.log(error);
      throw Error.InternalError();
    }
  },
  //get user by id
  checkUserExists: async (data) => {
    try {
      return await userDbController.Models.customer.findOne({
        where: {
          id: data.userId,
        }, raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  checkUser: async (token) => {
    try {
      return await userDbController.Models.customer.findOne({
        where: {
          id: token
        }, raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchCustomer: async (data) => {
    try {
      return await userDbController.Models.customer.findOne({
        where: {
          id: data.customerId,
        }, attributes: ["profilePic", "userName", "password", "fullName", "email", "phone", "dob", "gender"],
        raw: true,
      });
    } catch (error) {
      console.log(error);
      throw Error.InternalError();
    }
  },
  fetchCustomerDetails: async (data) => {
    try {
      return await userDbController.Models.shippingAddress.findOne({
        where: {
          id: data.AddressId || 1,
          id: data.customerId,
        },
        raw: true,
        nest: true,
        include: {
          model: Models.customer,
          attributes: {
            exclude: ["code", "password", "fcmToken", "status", "createdAt", "updatedAt"]
          }, where: {
            status: "active"
          }
        }
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  updateCustomers: async (data, tokenId, image) => {
    try {
      return await userDbController.Models.customer.update(
        {
          profilePic: image,
          userName: data.username,
          alaisName: data.alaisName,
          dob: data.dob,
          gender: data.gender,
        }, {
        where: {
          id: tokenId,
        },
      });
    } catch (error) {
      throw Error.InternalError();
    }
  }
};

userDbController.Address = {
  fetchBillingAddress: async (data) => {
    try {
      return await userDbController.Models.shippingAddress.findOne({
        where: {
          id: data.addressId,
          customerId: data.customerId,
          status: "active"
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchAddress: async (data) => {
    try {
      return await userDbController.Models.shippingAddress.findAll({
        where: {
          customerId: data.customerId,
          status: "active"
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "status", "customerId"]
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchAddressbyId: async (data) => {
    try {
      return await userDbController.Models.shippingAddress.findOne({
        where: {
          id: data.shippingAddress,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  checkAddressExists: async (data) => {
    try {
      return await userDbController.Models.shippingAddress.findOne({
        where: {
          customerId: data.customerId,
          state: data.state,
          city: data.city,
          street: data.street,
          landmark: data.landmark,
          zipcode: data.zipcode,
          addressType: data.addressType,
          status: "active"
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  checkAddressExistsExcept: async (data) => {
    try {
      return await userDbController.Models.shippingAddress.findOne({
        where: {
          id: { [Op.ne]: data.addressId },
          customerId: data.customerId,
          state: data.state,
          city: data.city,
          street: data.street,
          landmark: data.landmark,
          zipcode: data.zipcode,
          primary: data.primary,
          district: data.district,
          addressType: data.addressType,
          status: "active",
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  checkPrimaryAddressExistsExcept: async (data) => {
    try {
      return await userDbController.Models.shippingAddress.findOne({
        where: {
          id: { [Op.ne]: data.addressId },
          customerId: data.customerId,
          primary: "yes",
          status: "active",
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  addAddress: async (data) => {
    try {
      return await userDbController.Models.shippingAddress.create({
        customerId: data.customerId,
        state: data.state,
        district: data.district,
        city: data.city,
        street: data.street,
        landmark: data.landmark || null,
        zipcode: data.zipcode,
        addressType: data.addressType,
        primary: data.primary,
        status: "active"
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  updateAddress: async (data) => {
    try {
      return await userDbController.Models.shippingAddress.update({
        customerId: data.customerId,
        status: "inactive",
      }, {
        where: {
          id: data.addressId
        }
      }
      );
    } catch (error) {
      throw Error.InternalError();
    }
  },
  updateAddressbyId: async (data) => {
    try {
      return await userDbController.Models.shippingAddress.update({
        state: data.state,
        district: data.district,
        city: data.city,
        street: data.street,
        landmark: data.landmark || null,
        zipcode: data.zipcode,
        addressType: data.addressType,
        // primary: data.primary,
      }, {
        where: {
          id: data.addressId,
          customerId: data.customerId,
        }
      }
      );
    } catch (error) {
      throw Error.InternalError();
    }
  },
  changePrimary: async (data, body) => {
    try {
      return await userDbController.Models.shippingAddress.update({
        primary: body.primary,
      }, {
        where: {
          id: data.id,
          customerId: data.customerId
        }
      }
      );
    } catch (error) {
      throw Error.InternalError();
    }
  },
  changeAllPrimary: async (data) => {
    try {
      return await userDbController.Models.shippingAddress.update({
        primary: "no",
      }, {
        where: {
          customerId: data.customerId
        }
      }
      );
    } catch (error) {
      throw Error.InternalError();
    }
  },
};


userDbController.Wishlist = {
  fetchWishlist: async (tokenId) => {
    try {
      return await userDbController.Models.wishlist.findAll({
        where: {
          customerId: tokenId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  checkWishlistExists: async (data, tokenId) => {
    try {
      return await userDbController.Models.wishlist.findOne({
        where: {
          customerId: tokenId,
          productId: data.productId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },


  addWishlist: async (data, tokenId) => {
    try {
      return await userDbController.Models.wishlist.create({
        customerId: tokenId,
        productId: data.productId,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },

  removeWishlist: async (data) => {
    try {
      return await userDbController.Models.wishlist.destroy({
        where: {
          productId: data.productId,
          customerId: data.customerId,
          id: data.id,
        }
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },

};


userDbController.Shop = {
  getWelcomeMessage: async () => {
    try {
      return await userDbController.Models.homePage.findOne({
        raw: true,
        order: [["id", "DESC"]],
        attributes: ["message", 'image']
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getProductInfo: async (data) => {
    try {
      return await userDbController.Models.product.findOne({
        where: {
          id: data.productId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getFaq: async () => {
    try {
      return await userDbController.Models.faq.findAll({
        where: {
          status: "active",
        },
        raw: true,
        attributes: ["title", "answer"]
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },

  getWishlistedProducts: async (data) => {
    try {
      return await userDbController.Models.product.findAll({
        where: {
          status: "active"
        }, attributes: ["id", "categoryId",
          "categoryName",
          "productImage",
          "productName",
          "productDescription",
          "availableLocations",
          [Sequelize.literal("(SELECT IF(wishlist.productId IS NULL,FALSE,TRUE) FROM wishlist as wishlist WHERE wishlist.productId=product.id AND wishlist.customerId= " + data.customerId + "  LIMIT 1)"),
            "favourites"],
          [Sequelize.literal("(SELECT productVariants.discountPrice,productVariants.variantName FROM productVariants as productVariants WHERE productVariants.productId=product.id LIMIT 1)"), "discountPrice", "variantName"],
          [Sequelize.literal("(SELECT AVG(rating) FROM reviews WHERE reviews.productId=product.id LIMIT 1)"), "ratings",]
        ],
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchForyouProducts: async (token) => {
    try {
      return await userDbController.Models.product.findAll({
        where: {
          status: "active"
        }, attributes: ["id", "categoryId",
          "categoryName",
          "productImage",
          "productName",
          "productDescription",
          "availableLocations",
          [Sequelize.literal("(SELECT IF(wishlist.productId IS NULL,FALSE,TRUE) FROM wishlist as wishlist WHERE wishlist.productId=product.id AND wishlist.customerId= " + token + "  LIMIT 1)"),
            "favourites",
          ],
          [Sequelize.literal("(SELECT productVariants.discountPrice FROM productVariants as productVariants WHERE productVariants.productId=product.id LIMIT 1)"),
            "discountPrice",],
          [Sequelize.literal("(SELECT productVariants.actualPrice FROM productVariants as productVariants WHERE productVariants.productId=product.id LIMIT 1)"),
            "actualPrice",],
          [Sequelize.literal("(SELECT AVG(rating) FROM reviews WHERE reviews.productId=product.id LIMIT 1)"), "ratings",]
        ],
        raw: true,
        limit: 4,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getHotDeals: async (token) => {
    try {
      return await userDbController.Models.product.findAll({
        where: {
          status: "active"
        }, attributes: ["id", "categoryId",
          "categoryName",
          "productImage",
          "productName",
          "productDescription",
          "tags",
          "availableLocations",
          [Sequelize.literal("(SELECT IF(wishlist.productId IS NULL,FALSE,TRUE) FROM wishlist as wishlist WHERE wishlist.productId=product.id AND wishlist.customerId= " + token + "  LIMIT 1)"),
            "favourites",
          ],
          [Sequelize.literal("(SELECT productVariants.discountPrice FROM productVariants as productVariants WHERE productVariants.productId=product.id LIMIT 1)"),
            "discountPrice",],
          [Sequelize.literal("(SELECT AVG(rating) FROM reviews WHERE reviews.productId=product.id LIMIT 1)"), "ratings",]
        ],
        raw: true,
        order: [["price", "ASC"]],
        limit: 6,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getWishlistId: async (token) => {
    try {
      return await userDbController.Models.wishlist.findAll({
        where: {
          customerId: token,
        }, raw: true,
      })
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getWishlists: async (productIds) => {
    try {
      return await userDbController.Models.product.findAll({
        include: {
          model: Models.productVariants,
          where: {
            status: "active"
          },
          attributes: ["discountPrice", "id", "variantName", "variantImage"],
          required: false,
        },
        attributes: ["id", "productImage", "productName", "productDescription",
          [Sequelize.literal("(SELECT AVG(rating) FROM reviews WHERE reviews.productId=product.id LIMIT 1)"), "ratings",],],
        raw: true,
        nest: true,
        where: {
          id: { [Op.in]: productIds },
          status: "active",
        }
      },
      );
    } catch (error) {
      throw Error.InternalError();
    }
  },

  getResults: async (data) => {
    try {
      return await userDbController.Models.product.findAll({
        where: {
          status: "active"
        },

        order: [["productName", "ASC"]],
        raw: true,
        attributes: ["id",
          "categoryName",
          "productImage",
          "productName",
          "productDescription",
          "tags",
          "availableLocations",
          [
            Sequelize.literal(
              "(SELECT IF(wishlist.productId IS NULL,FALSE,TRUE) FROM wishlist as wishlist WHERE wishlist.productId=product.id AND wishlist.customerId= " + data.customerId + "  LIMIT 1)"), "favourites",
          ],
          [Sequelize.literal("(SELECT productVariants.discountPrice FROM productVariants as productVariants WHERE productVariants.productId=product.id AND productVariants.status='active' LIMIT 1)"),
            "discountPrice",],
          [Sequelize.literal("(SELECT productVariants.actualPrice FROM productVariants as productVariants WHERE productVariants.productId=product.id AND productVariants.status='active' LIMIT 1)"),
            "actualPrice",],
          [Sequelize.literal("(SELECT AVG(rating) FROM reviews WHERE reviews.productId=product.id LIMIT 1)"), "ratings",]
        ],
        limit: 16,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getFilters: async (data) => {
    try {

      return await userDbController.Models.product.findAll({
        include: {
          model: Models.productVariants, where: {
            status: "active"
          },
          attributes: ["discountPrice", "actualPrice", "variantName", "variantImage"], required: false,
        }, where: {
          status: "active",

        },
        attributes: ["id", "categoryId",
          "categoryName",
          "productImage",
          "productName",
          "productDescription",
          "availableLocations",
          [Sequelize.literal("(SELECT IF(wishlist.productId IS NULL,FALSE,TRUE) FROM wishlist as wishlist WHERE wishlist.productId=product.id AND wishlist.customerId= " + data.customerId + "  LIMIT 1)"),
            "favourites",
          ],
          [Sequelize.literal("(SELECT AVG(rating) FROM reviews LIMIT 1)"), "ratings",]
        ],
        raw: true,
        nest: true
      },
        {
          where: {
            status: "active",
          },
        }
      );
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchProductSpecs: async (data) => {
    if (data.productTitle != null && data.productTitle != undefined) {
      try {
        return await userDbController.Models.productSpecifications.findAll({
          where: {
            productTitle: data.productTitle,
          }
        }, {
          raw: true,
        });
      } catch (error) {

        throw Error.InternalError();
      }
    } else if (data.productId != null && data.productId != undefined) {
      try {
        return await userDbController.Models.productSpecifications.findOne({
          where: {
            productId: data.productId,
          }, attributes: { exclude: ["createdAt", "updatedAt"], }, raw: true
        });
      } catch (error) {
        throw Error.InternalError();
      }
    }
  },
  fetchProductDetails: async (data) => {
    if (data.productId != null && data.productId != undefined) {
      try {
        return await userDbController.Models.product.findOne({
          where: {
            id: data.productId,
          }, attributes: ["moreInfo", "productDescription", "categoryName"], raw: true
        });
      } catch (error) {

        throw Error.InternalError();
      }
    }
  },

  getAllBanners: async () => {
    try {
      return await userDbController.Models.banner.findAll({
        where: {
          status: "active"
        },
        attributes: {
          exclude: ["status", "createdAt", "updatedAt"]
        },
        order: [["bannerType", "DESC"]],
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },

  getAllCategories: async () => {

    try {
      return await userDbController.Models.category.findAll({

        where: {
          status: "active"
        },
        order: [["id", "ASC"]],
        attributes: {
          exclude: ["status", "createdAt", "updatedAt", "taxId", "taxPercentage"]
        },
        raw: true,
      },);
    } catch (error) {
      throw Error.InternalError();

    }
  },

  getHotDeals: async (token) => {
    try {
      return await userDbController.Models.product.findAll({
        where: {
          status: "active"
        }, attributes: ["id", "categoryId",
          "categoryName",
          "productImage",
          "productName",
          "productDescription",
          "availableLocations",
          [Sequelize.literal("(SELECT IF(wishlist.productId IS NULL,FALSE,TRUE) FROM wishlist as wishlist WHERE wishlist.productId=product.id AND wishlist.customerId= " + token + "  LIMIT 1)"),
            "favourites",
          ],
          [Sequelize.literal("(SELECT productVariants.discountPrice FROM productVariants as productVariants WHERE productVariants.productId=product.id AND productVariants.status='active' LIMIT 1)"),
            "discountPrice",],
          [Sequelize.literal("(SELECT productVariants.actualPrice FROM productVariants as productVariants WHERE productVariants.productId=product.id AND productVariants.status='active' LIMIT 1)"),
            "actualPrice",],
          [Sequelize.literal("(SELECT AVG(rating) FROM reviews WHERE reviews.productId=product.id LIMIT 1)"), "ratings",]
        ],
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  checkProductAvailability: async (data) => {
    try {
      return await userDbController.Models.productVariants.findOne({
        where: {
          id: data.variantId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  checkFabricAvailability: async (data) => {
    try {
      return await userDbController.Models.fabrics.findOne({
        where: {
          id: data.fabricId,
          status: "active"
        },
        raw: true,
      });
    } catch (error) {

      throw Error.InternalError();
    }
  },
  checkMeasurements: async (token) => {
    try {
      return await userDbController.Models.size.findOne({
        where: {
          id: token,
          // status: "active"
        },
        raw: true,
      });
    } catch (error) {

      throw Error.InternalError();
    }
  },

  checkCategory: async (data, token) => {
    try {
      return await userDbController.Models.product.findOne({
        where: {
          id: data.productId,
        },
        attributes: ["id", "categoryName"],
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchVariants: async (data, token) => {
    try {
      return await userDbController.Models.productVariants.findAll({
        where: {
          productId: data.productId,
          status: "active"
        },
        order: [["actualPrice", "ASC"]],
        raw: true,
        attributes: ["id",
          "productId",
          "productName",
          "variantName",
          "variantImage",
          "variantColor",
          "isColor",
          "actualPrice",
          "discountPrice",
          "altTags",
          "availableStock",
          [
            Sequelize.literal(
              "(SELECT IF(wishlist.productId IS NULL,FALSE,TRUE) FROM wishlist as wishlist WHERE wishlist.productId=productVariants.productId AND wishlist.customerId= " + token + "  LIMIT 1)"
            ),
            "favourites",
          ],
        ],
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchVariants1: async (data, token) => {
    try {
      return await userDbController.Models.productVariants.findOne({
        where: {
          productId: data.productId,
          status: "active"
        },
        order: [["actualPrice", "ASC"]],
        raw: true,
        attributes: ["id",
          "productId",
          "productName",
          "variantName",
          "variantImage",
          "variantColor",
          "isColor",
          "actualPrice",
          "discountPrice",
          "altTags",
          "availableStock",
          [
            Sequelize.literal(
              "(SELECT IF(wishlist.productId IS NULL,FALSE,TRUE) FROM wishlist as wishlist WHERE wishlist.productId=productVariants.productId AND wishlist.customerId= " + token + "  LIMIT 1)"
            ),
            "favourites",
          ],
        ],
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getCartStock: async (data) => {
    try {
      return await userDbController.Models.productVariants.findAll({
        where: {
          id: {
            [Op.in]: data
          },
          status: "active"
        },
        raw: true,
        attributes: ["availableStock"]
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getCategoryProduct: async (data) => {
    try {
      return await userDbController.Models.product.findAll({
        where: {
          categoryId: data.categoryId,
          status: "active",
        },
        include: {
          model: Models.productVariants, where: {
            status: "active"
          },
          attributes: ["discountPrice", "variantName", "actualPrice", "variantImage"], required: false,
          include: {
            model: Models.reviews,
            where: {
              rating: {
                [Op.in]: data.ratings || [1, 2, 3, 4, 5],
              }
            },
            attributes: ["rating",],
            required: false
          },
        },
        attributes: ["id", "categoryId",
          "categoryName",
          "productImage",
          "productName",
          "productDescription",
          "availableLocations",
        ],

        raw: true,
        nest: true
      },
      );
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getAllRecommended: async (data) => {
    try {
      return await userDbController.Models.recommendedProducts.findAll()
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchProductArray: async (productIds) => {
    try {
      return await userDbController.Models.product.findAll({
        where: {
          id: {
            [Op.in]: productIds,
          },
          status: "active",
        },
        raw: true,
        attributes: [
          "id",
          "productName",
          "productImage",
          "categoryName",
          [
            Sequelize.literal(`productVariants.id`),
            "productVariantId",
          ],
        ],
        include: {
          model: Models.productVariants,
          attributes: ["id"],
          where: {
            productId: productIds,
          },
        },
      });
    } catch (error) {
      console.error("Error in fetchProductArray:", error);
      throw Error.InternalError();
    }
  },

  createBulkOrders: async (data) => {
    try {
      return await userDbController.Models.bulkOrder.create({
        companyName: data.companyName,
        companyEmail: data.companyEmail,
        companyContact: data.companyContact,
        message: data.message
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  listFabircs: async (data) => {
    try {
      return await userDbController.Models.fabrics.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "expiry"]
        },
        raw: true,
      });
    } catch (error) {

      throw Error.InternalError();
    }
  },
  contactPage: async (data) => {
    try {
      return await userDbController.Models.contact.create({
        name: data.name,
        email: data.email,
        message: data.message
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },

};


userDbController.Review = {
  getProductReview: async (data) => {
    try {
      return await userDbController.Models.reviews.findAll({
        where: {
          productId: data.productId,
          status: "active"
        },
        attributes: ["id", "customerName", "customerImage", "rating", "review", "createdAt"],
        order: [["id", "DESC"]],
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchMyReviews: async (token) => {
    try {
      return await userDbController.Models.productVariants.findAll({
        include: {
          model: Models.reviews,
          attributes: ["id", "rating", "review", "createdAt"],
          where: {
            customerId: token,
          },
        },
        attributes: ["productId", "productName", "variantImage", "actualPrice", "discountPrice"],
        raw: true,
        nest: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getProductRatings: async (data) => {
    try {
      return await userDbController.Models.reviews.findOne({
        where: {
          productId: data.productId,
          status: "active"
        },
        attributes: [
          [Sequelize.literal("(SELECT COUNT(rating) FROM reviews WHERE reviews.productId = " + data.productId + " AND reviews.rating=5)"), 'excellent'],
          [Sequelize.literal("(SELECT COUNT(rating) FROM reviews WHERE reviews.productId = " + data.productId + " AND reviews.rating=4)"), 'best'],
          [Sequelize.literal("(SELECT COUNT(rating) FROM reviews WHERE reviews.productId = " + data.productId + " AND reviews.rating=3)"), 'good'],
          [Sequelize.literal("(SELECT COUNT(rating) FROM reviews WHERE reviews.productId = " + data.productId + " AND reviews.rating=2)"), 'poor'],
          [Sequelize.literal("(SELECT COUNT(rating) FROM reviews WHERE reviews.productId = " + data.productId + " AND reviews.rating=1)"), 'verypoor'],
          [Sequelize.literal("(SELECT AVG(rating) FROM reviews WHERE reviews.productId = " + data.productId + ")"), 'overallRatings'],
          [Sequelize.literal("(SELECT COUNT(rating) FROM reviews WHERE reviews.productId = " + data.productId + ")"), 'noOfRatings'],
        ],
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  addProductReview: async (data) => {
    try {
      return await userDbController.Models.reviews.create({
        customerId: data.customerId,
        customerName: data.customerName,
        customerImage: data.customerImage,
        orderId: data.orderId,
        productId: data.productId,
        rating: data.rating,
        review: data.review,
        variantId: data.variantId,
        status: "active"
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  putProductReview: async (data, tokenId) => {
    try {
      return await userDbController.Models.reviews.update({
        customerId: tokenId,
        rating: data.rating,
        review: data.review,
      }, {
        where: {
          id: data.id,
        },
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  updateOrderReview: async (data) => {
    try {
      return await userDbController.Models.orders.update({
        isReviewed: data.isReviewed,
      }, {
        where: {
          orderId: data.orderId,
        },
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  destroyReview: async (data, tokenId) => {
    try {
      return await userDbController.Models.reviews.destroy({
        where: {
          customerId: tokenId,
          id: data.id,
        },
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
};

userDbController.Cart = {
  getCart: async (tokenId) => {
    try {
      return await userDbController.Models.cart.findAll({
        where: {
          customerId: tokenId,
          status: "active"
        },
        include: {
          model: Models.productVariants,
          attributes: ["availableStock", "variantImage"]
        },
        attributes: ["id",
          "productId",
          "productName",
          "productType",
          "productInfo",
          "variantId",
          "variantColor",
          "index",
          "variantImage",
          "units", "tax",
          "singleProductPrice",
          "actualPrice", "inclusiveGST",
          "totalPrice",],
        raw: true,
        nest: true
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getCartforCheckout: async (data) => {
    try {
      return await userDbController.Models.cart.findAll({
        where: {
          customerId: data.customerId,
          status: "active"
        },
        attributes: ["id",
          "totalPrice", "productType",],
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getCount: async (tokenId) => {
    try {
      return await userDbController.Models.cart.count({
        where: {
          customerId: tokenId,
          status: "active"
        }, raw: true,
      });
    } catch (error) {

      throw Error.InternalError();
    }
  },
  getSum: async (tokenId) => {
    try {
      return await userDbController.Models.cart.findAll({
        where: {
          customerId: tokenId,
          status: "active",
        }, raw: true, attributes: [[Sequelize.fn('sum', Sequelize.col('totalPrice')), 'totalPrice'], [Sequelize.fn('sum', Sequelize.col('actualPrice')), 'actualPrice']],
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  checkCartExists: async (data) => {
    try {
      return await userDbController.Models.cart.findOne({
        where: {
          customerId: data.customerId,
          variantId: data.variantId,
          // variantColor: data.variantColor,
          status: "active"
        }, raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  checkCartIdExists: async (data) => {
    try {
      return await userDbController.Models.cart.findOne({
        where: {
          id: data.cartId,
          status: "active"
        }, raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  // fetchCartArray: async (cartIds) => {
  //   try {
  //     return await userDbController.Models.cart.findAll({
  //       where: {
  //         id: {
  //           [Op.in]: cartIds,
  //         },
  //         // status: "inactive"
  //       }, raw: true, attributes: {
  //         exclude: ["status", "index", "actualPrice", "singleProductPrice", "customerId", "updatedAt"]
  //       }
  //     });
  //   } catch (error) {
  // 
  //     throw Error.InternalError();
  //   }
  // },
  fetchCartArray: async (cartIds) => {
    try {
      return await userDbController.Models.cart.findAll({
        where: {
          id: cartIds,
          // status: "inactive"
        }, raw: true, attributes: {
          exclude: ["status", "index", "actualPrice", "singleProductPrice", "customerId", "updatedAt"]
        }
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },

  fetchUserCartArray: async (cartIds, token) => {
    try {
      return await userDbController.Models.cart.findAll({
        where: {
          id: cartIds,
          customerId: token,
          // status: "inactive"
          status: "active"
        },
        raw: true,
        attributes: ["variantImage", "units"]
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  createCart: async (data) => {
    try {

      return await userDbController.Models.cart.create({
        customerId: data.customerId,
        productId: data.productId,
        fabricName: data.fabricName,
        productName: data.productName,
        productType: data.productType,
        productInfo: data.productInfo,
        variantId: data.variantId,
        fabricId: data.fabricId,
        code: data.code,
        variantImage: data.variantImage,
        singleProductPrice: data.singleProductPrice,
        actualPrice: data.actualPrice,
        totalPrice: data.totalPrice,
        inclusiveGST: data.inclusiveGST,
        tax: data.tax,
        units: data.units,
        size: data.size,
        index: data.index,
        status: data.status,
      },
        { raw: true });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  putCart: async (data) => {
    try {
      return await userDbController.Models.cart.update({
        actualPrice: data.actualPrice,
        totalPrice: data.totalPrice,
        withGST: data.withGST,
        units: data.units,
      }, {
        where: {
          id: data.cartId,
        }
      }, { raw: true });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  archiveCart: async (data) => {
    try {
      return await userDbController.Models.cart.update({
        status: "inactive",
      }, {
        where: {
          id: {
            [Op.in]: data.cartIds
          }
        }
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  destroyCart: async (data) => {
    try {
      return await userDbController.Models.cart.destroy({
        where: {
          customerId: data.customerId,
          id: data.cartId,
        }, raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  createMeasurement: async (data) => {
    try {

      return await userDbController.Models.size.create({
        customerId: data.customerId,
        name: data.name,
        upperBodyShape: data.upperBodyShape,
        lowerBodyShape: data.lowerBodyShape,
        height: data.height,
        customSize: data.customSize,
        shoulderType: data.shoulderType,
        preferredFit: data.preferredFit,
        status: "status"
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getAllMeasurements: async (token) => {
    try {
      return await userDbController.Models.size.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        }, raw: true
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getOneMeasurements: async (data) => {
    try {
      return await userDbController.Models.size.findOne({
        where: {
          id: data.id
        }, attributes: {
          exclude: ["createdAt", "updatedAt"],
        }, raw: true
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },

  deleteMeasurements: async (data) => {
    try {
      return await userDbController.Models.size.update({
        status: "inactive",
      }, {
        where: {
          id: data.id
        },
        raw: true
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  updateMeasurements: async (data, token) => {
    try {
      return await userDbController.Models.size.update({
        name: data.name,
        upperBodyShape: data.upperBodyShape,
        lowerBodyShape: data.lowerBodyShape,
        height: data.height,
        customSize: data.customSize,
        shoulderType: data.shoulderType,
        preferredFit: data.preferredFit
      }, {
        where: {
          id: data.id,
        }
      });
    } catch (error) {
      throw Error.InternalError();// Corrected the error instantiation
    }
  }



};

userDbController.Order = {
  fetchCCAvenue: async (data) => {
    try {
      return await userDbController.Models.ccavenue.findOne({
        where: {
          order_id: data.orderId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchOrders: async (tokenId) => {
    try {
      return await userDbController.Models.orders.findAll({
        where: {
          customerId: tokenId,
          // orderStatus: "accepted"
          orderStatus: {
            [Op.ne]: "pending"
          }
        },
        attributes: ["cartId", "orderId", "paidAmount", "orderStatus", "createdAt",],
        raw: true,
        order: [["id", "DESC"]]
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchOrderbyId: async (data) => {
    try {
      return await userDbController.Models.orders.findAll({
        where: {
          customerId: data.customerId,
          orderId: data.orderId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchbyOrderId: async (data) => {
    try {
      return await userDbController.Models.orders.findOne({
        where: {
          orderId: data.orderId,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  fetchOrderbyIntent: async (data) => {
    try {
      return await userDbController.Models.orders.findOne({
        where: {
          customerId: data.customerId,
          paymentIntent: data.paymentIntent,
        },
        raw: true,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  getOrderDetails: async (data) => {
    try {
      return await userDbController.Models.orders.findOne({
        where: {
          orderId: data.orderId,
          customerId: data.customerId,
          orderStatus: {
            [Op.ne]: "pending"
          }
        },
        raw: true, attributes: ["cartId", "isReviewed", "deliveryType", "orderStatus", "trackingInfo", "createdAt", "updatedAt", "orderId"]
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  createOrder: async (data) => {
    try {
      return await userDbController.Models.orders.create({
        customerId: data.customerId,
        cartId: data.cartId,
        orderId: data.orderId,
        orderType: data.orderType,
        shippingAddress: data.addressId,
        totalAmount: data.amount,
        txnToken: data.txnToken,
        isReviewed: data.isReviewed,
      });
    } catch (error) {
      throw Error.InternalError();
    }
  },
  updatePaynowOrder: async (data) => {
    try {
      return await userDbController.Models.orders.update({
        shippingAddress: data.addressId,
        txnStatus: data.txnStatus,
        trackingInfo: "none,none",
        orderStatus: data.orderStatus,
        paymentStatus: data.paymentStatus,
        paymentMethod: data.paymentMethod,
      }, {
        where: {
          customerId: data.customerId,
          orderId: data.orderId,
        }
      }
      );
    } catch (error) {
      throw Error.InternalError();
    }
  },
  // updatePaynowOrder: async (data) => {
  //   try {
  //     return await userDbController.Models.orders.update({
  //       paymentMode: data.paymentMode + "," + data.bankName + "," + data.gatewayName,
  //       shippingAddress: data.addressId,
  //       paidAmount: data.txnAmount,
  //       txnStatus: data.txnStatus,
  //       paytmTransactionId: data.txnId,
  //       bankTransactionId: data.bankTxnId,
  //       txnTimeStamp: data.txnDate,
  //       checksumHash: data.checksum,
  //       deliveryType: data.deliveryType,
  //       orderStatus: "accepted",
  //       paymentStatus: "success"
  //     }, {
  //       where: {
  //         customerId: data.customerId,
  //         orderId: data.orderId,
  //       }
  //     }
  //     );
  //   } catch (error) {
  //     throw Error.InternalError();
  //   }
  // },
  updateCODOrder: async (data) => {
    try {
      return await userDbController.Models.orders.update({
        shippingAddress: data.addressId,
        paidAmount: data.txnAmount,
        deliveryType: data.deliveryType,
        orderStatus: "accepted",
        paymentStatus: "pending"
      }, {
        where: {
          customerId: data.customerId,
          orderId: data.orderId,
        }
      }
      );
    } catch (error) {
      throw Error.InternalError();
    }
  },
};
