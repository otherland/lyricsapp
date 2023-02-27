const isProd = process.env.NODE_ENV === 'production'

module.exports = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,

	// assetPrefix: isProd ? '/lyricsapp/' : '',
	images: {
	unoptimized: true,
	},
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.node = {
        fs: 'empty'
      }
      return config
    },
  }
}

