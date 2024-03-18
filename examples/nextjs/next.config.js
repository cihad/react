const MillionCompiler = require('@million/lint')

const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
}

module.exports = MillionCompiler.next({})(nextConfig)
