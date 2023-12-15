/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const path = require('path')
const loadEnvConfig = require('@next/env').loadEnvConfig

const nextConfig = {
  reactStrictMode: false,
  i18n,
  compiler: {
    styledComponents: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `nsb-stg-gnr.s3.ap-southeast-1.amazonaws.com`
      },
      {
        protocol: 'https',
        hostname: `nsb-stg-gnr.s3.ap-northeast-1.amazonaws.com`
      },
      {
        protocol: 'https',
        hostname: `nsb-dev-gnr.s3.ap-southeast-1.amazonaws.com`
      },
      {
        protocol: 'https',
        hostname: `nsb-dev-gnr.s3.ap-northeast-1.amazonaws.com`
      }
    ],
    domains: ['s3.ap-southeast-1.amazonaws.com', 's3.ap-northeast-1.amazonaws.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [300, 400, 600, 900, 1200, 1500, 1800]
  },
  webpack: (config, { webpack }) => {
    const projectDir = process.cwd()
    const configs = loadEnvConfig(projectDir).loadedEnvFiles[0]?.contents

    config.plugins.push(
      new webpack.DefinePlugin({
        'window._CONFIG': JSON.stringify(configs)
      })
    )
    return config
  }
}

module.exports = nextConfig
