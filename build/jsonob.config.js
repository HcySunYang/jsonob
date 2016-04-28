/**
 * webpack for vm config
 */

var webpack = require('webpack');
var banner = require('./banner').jsonob;

module.exports = {
	'entry' : './src/index',
	'output': {
		'path'         : './dist',
		'library'      : 'Jsonob',
		'filename'     : 'Jsonob.js',
		'libraryTarget': 'umd'
	},
	module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?presets=es2015',
                exclude: /node_modules/
            }
        ]
    },
	babel: {
        "presets": ["es2015"],
        "plugins": ["transform-runtime"]
    },
	'plugins': [
		new webpack.BannerPlugin(banner, {
			'raw'      : false,
			'entryOnly': false
		})
	]
}