/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    webpack: (config) => {
        config.resolve.alias['@base'] = path.join(__dirname, 'src/app');
        config.resolve.alias['@public'] = path.join(__dirname, 'public');
        return config;
    },
    images: {
        unoptimized: true,
        remotePatterns: [
          {hostname: "localhost"},
          {hostname: "127.0.0.1"},
          {hostname: "api.eonix.ai"},
          {hostname: "igamingbosses.com"},
          {hostname: "www.igamingbosses.com"},
        ],
    },
}

module.exports = nextConfig
