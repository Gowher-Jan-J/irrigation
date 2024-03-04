import express from "express";
import { connection } from "../connection.js";
import * as Models from "../models/index.js";
import require from "requirejs";
const { Op, Sequelize } = require("sequelize");
export class devDbController {}
devDbController.scope = "defaultScope";
devDbController.Models = Models;
devDbController.connection = connection;
devDbController.defaults = {};


//default data

devDbController.defaultUsers = {
    configuration: async (data) => {
        try {
            return await devDbController.Models.config.create(data);
        } catch (error) {
            return error;
        }
    },
    user: async(data) => {
        try {
            return await devDbController.Models.customer.create(data);
        } catch (error) {
            return error;
        }
    },
    admin: async(data) => {
        try {
            return await devDbController.Models.admin.create(data);
        } catch (error) {
            return error;
        }
    },
    vendor: async(data) => {
        try {
            return await devDbController.Models.vendor.create(data);
        } catch (error) {
            return error;
        }
    },
};
