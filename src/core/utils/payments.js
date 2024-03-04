import require from "requirejs";
const jwt = require("jsonwebtoken");

export class CCAvenue {
  /**
   * CCAvenue payment gateway
   * @param {object} data
   * @param {string} data.currency - Mandatory field
   * @param {string} data.orderId - Mandatory field
   * @param {string} data.amount - Mandatory field
   * @param {string} data.redirectUrl - Mandatory field
   * @param {string} data.cancelUrl - Mandatory field
   * @param {string} data.billingName - Optional field
   * @param {string} data.billingAddress - Optional field
   * @param {string} data.billingCity - Optional field
   * @param {string} data.billingState - Optional field
   * @param {string} data.billingZip - Optional field
   * @param {string} data.billingCountry - Optional field
   * @param {string} data.billingTelephone - Optional field
   * @param {string} data.billingEmail - Optional field
   * @param {string} data.merchantParam1 - Optional field
   * @param {string} data.merchantParam2 - Optional field
   * @param {string} data.merchantParam3 - Optional field
   * @param {string} data.merchantParam4 - Optional field
   * @param {string} data.merchantParam5 - Optional field
   */
  constructor({
    orderId,
    currency,
    amount,
    redirectUrl,
    cancelUrl,
    billingName = "",
    billingAddress = "",
    billingCity = "",
    billingState = "",
    billingZip = "",
    billingCountry = "",
    billingTelephone = "",
    billingEmail = "",
    merchantParam1 = "",
    merchantParam2 = "",
    merchantParam3 = "",
    merchantParam4 = "",
    merchantParam5 = "",
  }) {
    this.orderId = orderId;
    this.currency = currency;
    this.amount = amount;
    this.redirectUrl = redirectUrl;
    this.cancelUrl = cancelUrl;
    this.billingName = billingName;
    this.billingAddress = billingAddress;
    this.billingCity = billingCity;
    this.billingState = billingState;
    this.billingZip = billingZip;
    this.billingCountry = billingCountry;
    this.billingTelephone = billingTelephone;
    this.billingEmail = billingEmail;
    this.merchantParam1 = merchantParam1;
    this.merchantParam2 = merchantParam2;
    this.merchantParam3 = merchantParam3;
    this.merchantParam4 = merchantParam4;
    this.merchantParam5 = merchantParam5;
  }

  generateToken() {

    var mid = configs.paymentGatewayId;
    var key = configs.paymentGatewaySecret;

    let paymentOrderId = {
      merchant_id: mid,
      order_id: this.orderId,
      currency: this.currency,
      // currency: "INR",
      amount: this.amount,
      redirect_url: this.redirectUrl,
      cancel_url: this.cancelUrl,
      language: "EN",
      billing_name: this.billingName,
      billing_address: this.billingAddress,
      billing_city: this.billingCity,
      billing_state: this.billingState,
      billing_zip: this.billingZip,
      billing_country: this.billingCountry,
      billing_tel: this.billingTelephone,
      billing_email: this.billingEmail,
      delivery_name: "",
      delivery_address: "",
      delivery_city: "",
      delivery_state: "",
      delivery_zip: "",
      delivery_country: "",
      delivery_tel: "",
      merchant_param1: this.merchantParam1,
      merchant_param2: this.merchantParam2,
      merchant_param3: this.merchantParam3,
      merchant_param4: this.merchantParam4,
      merchant_param5: this.merchantParam5,
      promo_code: "",
      customer_identifier: "",
    };

    var key = configs.paymentGatewaySecret;
    let orderToken = jwt.sign({ ...paymentOrderId }, key, {
      expiresIn: 60 * 60,
    });

    return orderToken;
  }
}
