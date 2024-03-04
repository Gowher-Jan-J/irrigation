
import CryptoJS from "crypto-js";
import { adminDbController } from "../../core/database/Controller/adminDbController.js";
import { userDbController } from "../../core/database/Controller/userDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js"
import { promises as fsPromises } from 'fs';
import { admin } from "../../core/database/models/adminModel.js"
import { isDataInvalid, isDataValid, isUpdated } from "../../core/utils/functions.js";
import Sequelize from "sequelize";





export class adminMiddleware { }

//banners
adminMiddleware.Banners = {
    fetchBanners: async ({ body }) => {
        const fetched = await adminDbController.Shop.fetchbanners(body);
        if (isDataValid(fetched)) {
            return fetched;
        }
    },

    createBanners: async ({ body, image }) => {
        body.bannerImage = image;
        const created = await adminDbController.Shop.createbanners(body);
        if (isDataValid(created)) {
            return "Banner Created Successfully"
        } else {
            return "Failed to Create Banner"

        }
    },
    putBanners: async ({ body }) => {
        const updated = await adminDbController.Shop.putbanners(body);
        if (updated[0] != 0) {
            return "Updated Success"
        } else {
            return "Update Failed"
        }
    },

};

//banners
adminMiddleware.Shop = {
    fetchFaq: async ({ body }) => {
        const fetched = await adminDbController.Shop.getfaq(body);
        if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
            return fetched;
        } else {
            throw Error.SomethingWentWrong()

        }
    },
    fetchTax: async ({ body }) => {
        const fetched = await adminDbController.Shop.fetchTax(body);
        if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
            return fetched;
        } else {
            return "No Taxes found";

        }
    },
    createTax: async ({ body }) => {
        const created = await adminDbController.Shop.addTax(body);
        if (created != null && created != undefined && Object.keys(created).length != 0) {
            return "Tax Created Successfully"
        } else {
            throw Error.SomethingWentWrong("Failed to Create Tax");
        }
    },
    deleteTax: async ({ body }) => {
        const fetched = await adminDbController.Category.fetchCategoryTax(body);
        if (fetched == null || fetched == undefined || Object.keys(fetched).length == 0) {
            const removed = await adminDbController.Shop.removeTax(body);
            if (removed[0] != 0) {
                return "Tax Deleted Successfully"
            }
        } else {
            throw Error.SomethingWentWrong("Category Exists in this Tax");
        }
    },
    createFaq: async ({ body }) => {
        const created = await adminDbController.Shop.addfaq(body);
        if (created != null && created != undefined && Object.keys(created).length != 0) {
            return "FAQ Created Successfully"
        } else {
            throw Error.SomethingWentWrong("Failed to Create FAQ");
        }
    },
    deleteFaq: async ({ body }) => {
        const updated = await adminDbController.Shop.removefaq(body);
        if (updated[0] != 0) {
            return "FAQ Upated Successfully"
        } else {
            throw Error.SomethingWentWrong("Failed to Update FAQ");
        }
    },

};

//banners
adminMiddleware.Customer = {

    fetchAnalytics: async ({ }) => {
        const fetchCustomers = await adminDbController.Customer.fetchCustomers();
        const fetchCategory = await adminDbController.Category.fetchCategoryCount();
        const fetchProduct = await adminDbController.Product.fetchProductCount();
        const fetchOrders = await adminDbController.Orders.fetchOrderCount();
        const fetchFabrics = await adminDbController.Vendor.fetchFabricsCount();
        const fetchFabricsInActive = await adminDbController.Vendor.fetchFabricsInActive();
        const fetchvendorsInActive = await adminDbController.Vendor.fetchvendorsInActive();
        const fetchvendors = await adminDbController.Vendor.fetchvendorsCount();

        if (fetchCustomers != null && fetchCustomers != undefined && fetchCustomers.length != 0) {

            var active = 0;
            var inactive = 0;
            var terminated = 0;

            for (let index = 0; index < fetchCustomers.length; index++) {

                if (fetchCustomers[index].status == "active") {
                    active = active + 1;
                }
                if (fetchCustomers[index].status == "inactive") {
                    inactive = inactive + 1;
                }
                if (fetchCustomers[index].status == "terminated") {
                    terminated = terminated + 1;
                }
            }
        }
        let analytics;
        return analytics = {
            activeCustomer: active,
            inactiveCustomer: inactive,
            terminatedCustomer: terminated,
            category: fetchCategory,
            product: fetchProduct,
            orders: fetchOrders,
            vendors: fetchvendors,
            inactiveVendors: fetchvendorsInActive,
            fabrics: fetchFabrics,
            inactiveFabrics: fetchFabricsInActive
        }
    },
    getallCustomer: async () => {
        const fetchCustomers = await adminDbController.Customer.fetchCustomers();
        if (fetchCustomers != null && fetchCustomers != undefined && fetchCustomers.length != 0) {
            return fetchCustomers;
        } else {
            return "No Users Found"
        }
    },

    fetchSingleCustomer: async ({ body }) => {
        var fetched = await adminDbController.Customer.getSingleCustomer(body);
        var fetchedAddress = await userDbController.Address.fetchAddress(body);
        if (isDataInvalid(fetched)) {
            fetchedAddress = "No User Found"
        }
        if (isDataInvalid(fetchedAddress)) {
            fetchedAddress = "No Address Found"
        }
        return { fetched, fetchedAddress };
    },
    updateSingleCustomer: async ({ body }) => {

        if (body.action === "edit") {
            const edited = await adminDbController.Customer.updateCustomerDetails(body);
            if (isUpdated(edited)) {
                return "edited Success"
            }
        }
        if (body.action === "update") {
            const updated = await adminDbController.Customer.updateCustomerStatus(body);
            if (isUpdated(updated)) {
                return "Updated Success"
            }
        }
    },






    fetchBulkOrders: async () => {
        const fetchCustomers = await adminDbController.Customer.fetchBulkOrders();
        if (fetchCustomers != null && fetchCustomers != undefined && fetchCustomers.length != 0) {
            return fetchCustomers;
        } else {
            return "No Enquiries Found"
        }
    },

    contactPage: async () => {
        const fetchCustomers = await adminDbController.Customer.contactPage();
        if (fetchCustomers != null && fetchCustomers != undefined && fetchCustomers.length != 0) {
            return fetchCustomers;
        } else {
            return "No Enquiries Found"
        }
    },
    addMsgPops: async ({ body, image }) => {
        body.image = image || null;
        const created = await adminDbController.Customer.addMsgPop(body);
        if (created != null && created != undefined && created.length != 0 && Object.keys(created).length != 0) {
            return "Message Updated Successfully"
        } else {
            throw Error.SomethingWentWrong("Failed to Create Message");
        }
    },


    uploadFabrics: async ({ body, image }) => {
        body.image = image;
        const createdFound = await adminDbController.Vendor.checkFabricsExists(body);
        if (createdFound && Object.keys(createdFound).length !== 0) {
            return "Fabrics already exists";
        }
        const created = await adminDbController.Vendor.uploadFabric(body, image);
        if (created != null && created != undefined && created.length != 0 && Object.keys(created).length != 0) {
            return "Fabrics uploaded successfully";
        } else {
            throw Error.SomethingWentWrong("Failed to upload fabrics");
        }

    },

    getAllFabrics: async (body) => {
        const fetchFabrics = await adminDbController.Vendor.getAllFabric(body);
        if (fetchFabrics != null && fetchFabrics != undefined && fetchFabrics.length != 0) {
            return fetchFabrics;
        } else {
            return "No Fabrics Found"
        }
    },

    getOneFabrics: async ({ body }) => {
        const fetchFabrics = await adminDbController.Vendor.getOneFabrics(body);

        if (
            fetchFabrics != null &&
            fetchFabrics != undefined &&
            fetchFabrics.length != 0
        ) {
            return fetchFabrics;
        }

        return "No Fabrics Found";
    },


    updateFabrics: async ({ body, image }) => {
        if (body.action === "edit") {
            if (image !== undefined && image !== null && image !== "") {
                body.fabimage = image;
            }

            const updateObject = { ...body };
            if (updateObject.fabimage === "") {
                delete updateObject.fabimage;
            }

            const fetchFabrics = await adminDbController.Vendor.updateFabrics(
                updateObject
            );

            if (
                fetchFabrics !== null &&
                fetchFabrics !== undefined &&
                fetchFabrics.length !== 0
            ) {
                return "Fabrics updated successfully";
            } else {
                return "No Fabrics Found";
            }
        }

        if (body.action === "update") {
            const fetchCustomers =
                await adminDbController.Vendor.updateFabricssStatus(body);
            if (isUpdated(fetchCustomers)) {
                return "Updated Success";
            } else {
                return "Update failed.";
            }
        }

    },


}

