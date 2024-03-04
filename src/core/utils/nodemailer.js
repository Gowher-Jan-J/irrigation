import { mailerHost } from "../database/connection.js";
import ejs from "ejs";
import path from "path";
import * as Error from "../errors/ErrorConstant.js";
import { authentications } from "./jwt.js";
import require from "requirejs"
import { SendMailClient } from "zeptomail";
var CryptoJS = require("crypto-js");

// Zepto Mail Configs
const url = process.env.MailerURL;
const token = process.env.MailerTOKEN;

import dotenv from "dotenv";
dotenv.config();

const __dirname = path.resolve();
export class NodeMailerfunction { }


const mailTemplatefolder = path.join(__dirname, "./src/core/utils/mailTemplate/");

NodeMailerfunction.Email = {
    getStarted: async (data) => {
        const baseURL = configs.baseUrl;
        // const hexCode = data.uid;
        const recieverEmail = data.email;
        const userId = data.id;
        const userName = data.userName;
        const userStatus = data.status;
        //generate jwt
        const verifyToken = await authentications.generateEmailToken({ userId: userId, userName: userName, status: userStatus });

        const verifyurl = baseURL + "/getStarted/" + "?verifyEmail=" + verifyToken;
        if (recieverEmail != null && recieverEmail != undefined && recieverEmail.length != 0) {
            try {
                ejs.renderFile(mailTemplatefolder + "/getStarted.ejs", { username: userName, verify: verifyurl }, function (err, welcome) {
                    if (err) {
                        throw Error.SomethingWentWrong();
                    } else {
                        let client = new SendMailClient({ url, token });
                        client.sendMail({
                            "bounce_address": "noreply@noreply.clotricks.com",
                            "from":
                            {
                                "address": "noreply@clotricks.com",
                                "name": "Clotricks"
                            },
                            "to":
                                [
                                    {
                                        "email_address":
                                        {
                                            "address": recieverEmail,
                                        }
                                    }
                                ],
                            "subject": `Welcome to ${process.env.APP_NAME} 🛍️ `,
                            "htmlbody": welcome,
                        }).then((resp) => console.log("success")).catch((error) => console.log("error", JSON.stringify(error)));
                    }
                });
            } catch (error) {
                throw Error.SomethingWentWrong();
            }

        } else {
            throw Error.SomethingWentWrong();
        }
    },
    codeForForgotpassword: async (data) => {
        const hexCode = data.code;
        const recieverEmail = data.email;
        try {
            ejs.renderFile(mailTemplatefolder + "/resetPassword.ejs", { code: hexCode }, async function (err, resetPassword) {
                if (err) {
                    throw Error.SomethingWentWrong();
                } else {
                    let client = new SendMailClient({ url, token });
                    client.sendMail({
                        "bounce_address": "noreply@noreply.clotricks.com",
                        "from":
                        {
                            "address": "noreply@clotricks.com",
                            "name": "Clotricks"
                        },
                        "to":
                            [
                                {
                                    "email_address":
                                    {
                                        "address": recieverEmail,
                                    }
                                }
                            ],
                        "subject": `Reset Password for ${process.env.APP_NAME} 🔑 🛍️ `,
                        "htmlbody": resetPassword,
                    }).then((resp) => console.log("success")).catch((error) => console.log("error", JSON.stringify(error)));
                }
            });
        } catch (error) {
            throw Error.SomethingWentWrong();
        }
    },
    orderPlaced: async (data) => {
        const recieverEmail = data.customerEmail;
        try {
            ejs.renderFile(mailTemplatefolder + "/delivered.ejs", { orders: data }, async function (err, orderPlaced) {
                if (err) {
                    throw Error.SomethingWentWrong();
                } else {
                    const result = dotenv.config()
                    let client = new SendMailClient({ url, token });
                    client.sendMail({
                        "bounce_address": "noreply@noreply.clotricks.com",
                        "from": { "address": "noreply@clotricks.com", "name": "Clotricks" },
                        "to": [{ "email_address": { "address": recieverEmail, } }],
                        "subject": `Order Placed Successfully 🛍️ `,
                        "htmlbody": orderPlaced,
                    }).then((resp) => console.log("success")).catch((error) => console.log("error", error));
                }
            });
        } catch (error) {
            throw Error.SomethingWentWrong();
        }
    },
};