import jwt from "jsonwebtoken";
import * as Error from "../errors/ErrorConstant.js";
import { defaultdata } from "../../../config/config.js";

// console.log(defaultdata);

export const authentications = {
    generateUserJWT: async (token) => {
        try {
            // console.log("🚀 ~ generateUserJWT: ~ configs.jwtClientSecret:", defaultdata.configuration.jwtClientSecret)
            return jwt.sign(token, defaultdata.configuration.jwtClientSecret, {
                algorithm: "HS256",
            });

        } catch (error) {
            throw Error.SomethingWentWrong();
        }
    },
    verifyUserJWT: async (header) => {
        try {
            return jwt.verify(header, defaultdata.configuration.jwtClientSecret);
        } catch (error) {
            throw Error.SomethingWentWrong();
        }
    },
    generateEmailToken: async (token) => {
        try {
            return jwt.sign(token, defaultdata.configuration.jwtEmailSecret, {
                algorithm: "HS256",
                expiresIn: "10m"
            });
        } catch (error) {
            throw Error.SomethingWentWrong();
        }
    },
    verifyEmailToken: async (token) => {
        try {
            return jwt.verify(token, defaultdata.configuration.jwtEmailSecret);
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

            return jwt.verify(header, defaultdata.configuration.jwtAdminSecret);
        } catch (error) {
            return null;
        }
    },
}
