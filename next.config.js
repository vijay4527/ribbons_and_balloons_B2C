/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["images.pexels.com"],
  },
  env: {
    NEXTAUTH_SECRET: "asddgd",
    GOOGLE_CLIENT_ID:
      "354984063009-qnvdallj4ro8aa91tk8ragrk9bqlj16k.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    FACEBOOK_CLIENT_ID: "230771886171126",
    FACEBOOK_CLIENT_SECRET: "1bee2330b2482066af92f6b2c5adee71",
    INSTAGRAM_KEY:
      "IGQWRNc252NHVWbzR3WnYwcmRrUHd2T0toT2MzeWlfMExFVGZAKU2ZADM3o5Tkw2RXNlcGFQdHp5b1ZAzdUxfN3pLTlBqUExob0RpZA1RxX3pHSGNKZA3o2SDYzRmg5RzhuQXlqRDFfMUdQaUU2ajFLQy1ydU9PV3BucXMZD",
    API_KEY: "AIzaSyBN4nK5weONPZ_TGutn6d-M_c5IT6nrAPg",
    GOOGLE_MAP_API_KEY: "AIza SyBpti7QuC_QXwWE90MT0RkfMPlET1KbhS4",
    ACCESS_CODE: "AVGE05LE72AU32EGUA",
    form_Action_Url:
      "https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction",
    API_URL: "https://localhost:7189/api",
    //API_URL: "https://rnbapi.alphadigitall.com/api/",
  },
};

module.exports = nextConfig;
