/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["images.pexels.com", "fama.b-cdn.net"],
  },
  env: {
    NEXTAUTH_SECRET: "asddgd",
    GOOGLE_CLIENT_ID:
      "354984063009-qnvdallj4ro8aa91tk8ragrk9bqlj16k.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    FACEBOOK_CLIENT_ID: "23077188nwq6171126",
    FACEBOOK_CLIENT_SECRET: "1bee2330b2482066af92f6b2c5adee71",
    INSTAGRAM_KEY:
      "IGQWRQS0pDM0phUEhrQ0FybG5FV05RSlNkUG4zZA3NnR2VtUzZAqNGdwMUlVOVVHWTZA3eWFKdFF0VS10Wks3YzFWazJZAZAllRU25YeG9SdEF3b1I0MlJpN2ozQzFELWtBVTB5NmVNQzdiTUs2QzcwVjRkRF9PTFdTOWMZD",
    API_KEY: "AIzaSyBN4nK5weONPZ_TGutn6d-M_c5IT6nrAPg",
    GOOGLE_MAP_API_KEY: "AIza SyBpti7QuC_QXwWE90MT0RkfMPlET1KbhS4",
    ACCESS_CODE: "AVGE05LE72AU32EGUA",
    form_Action_Url:
      "https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction",
    //API_URL: "https://localhost:7189/api/",
    API_URL: "https://rnbapi.alphadigitall.com/api/",
  },
};

module.exports = nextConfig;
