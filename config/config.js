import dotenv from "dotenv";
dotenv.config();

export const mode = process.env.NODE_ENV;

export const development = {
  database: {
    appName: process.env.APP_NAME,
    db_name: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
  },
  server: {
    port: process.env.DEV_PORT,
    mode: process.env.NODE_ENV,
  },
};

export const production = {
  database: {
    appName: process.env.APP_NAME,
    db_name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  server: {
    port: process.env.PORT,
  },
};



export const defaultdata = {
  configuration: {
    baseUrl: "",
    hostEmail: "",
    placeholder: "/images/placeholder.jpg",
    shippingFee: 70,
    messagingId: "null",
    messagingKey: "null",
    paymentEnvironment: "",
    paymentGatewayId: "",
    paymentGatewaySecret: "",
    // paymentCallback: "https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=",
    passwordSecret: "srI50Y5zc5FXJWDNimYk/Yt0c0yWAARQqtUpFlI2lgMlx?kvC3HX!8T0sn?KfVs2",
    jwtClientSecret: "r;^WF~Upxuk1Vl9XZoNtzL]OFPpOlqqTrLJb4=$T(#LGOaUxxSodWncjUnt}(sH]",
    jwtAdminSecret: "INbMdG=Su7cSk8PxsGCkIlspYYc8Icrz==WAjTgVmp}3iYwAUo(Wl4fOQLCYniHn",
    jwtEmailSecret: ",QD}h'zFW4ZTzfF'P%tr['Go1heq~p(RS#&HaEvHenZuDdYdIHy$vrFZ-wGzKXXl",

    status: "active",
  },
}


// console.log(defaultdata.configuration.passwordSecret);