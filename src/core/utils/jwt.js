import jwt from "jsonwebtoken";
import * as Error from "../errors/ErrorConstant.js";
import { defaultdata } from "../../../config/config.js";

// console.log(defaultdata);

export const authentications = {
    generateUserJWT: async (token) => {
        try {
            return jwt.sign(token, configs.jwtClientSecret, {
                algorithm: "HS256",
            });
        } catch (error) {
            throw Error.SomethingWentWrong();
        }
    },
    verifyUserJWT: async (header) => {
        try {
            return jwt.verify(header, configs.jwtClientSecret);
        } catch (error) {
            throw Error.SomethingWentWrong();
        }
    },
    generateEmailToken: async (token) => {
        try {
            return jwt.sign(token, configs.jwtEmailSecret, {
                algorithm: "HS256",
                expiresIn: "10m"
            });
        } catch (error) {
            throw Error.SomethingWentWrong();
        }
    },
    verifyEmailToken: async (token) => {
        try {
            return jwt.verify(token, configs.jwtEmailSecret);
        } catch (error) {
            return null;
        }
    },

    generateAdminJWT: async (token) => {
        // console.log(defaultdata.configuration.jwtAdminSecret);
        try {
            return jwt.sign(token, defaultdata.configuration.jwtAdminSecret, {
                algorithm: "HS256",
                expiresIn: "160m" //Eg: 60, "2 days", "10h", "7d","10m"
            });
        } catch (error) {
            throw Error.SomethingWentWrong("Unable to Generate Token");
        }
    },
    verifyAdminJWT: async (header) => {
        try {

            return jwt.verify(header, configs.jwtAdminSecret);
        } catch (error) {
            return null;
        }
    },



    generateVendorJWT: async (token) => {
        try {
            return jwt.sign(token, configs.jwtVendorSecret, {
                algorithm: "HS256"
            });
        } catch (error) {
            throw Error.SomethingWentWrong("Unable to Generate Token");
        }
    },
    verifyVendorJWT: async (header) => {
        try {
            return jwt.verify(header, configs.jwtVendorSecret);
        } catch (error) {

            return null;
        }
    },


};