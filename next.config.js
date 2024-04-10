/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.pexels.com"],
  },
  env:{
    API_URL: "https://localhost:7189/api",

  }

};

module.exports = nextConfig;
