/**
 * webpack for mvvm.min config
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
	'plugins': [
		new webpack.optimize.UglifyJsPlugin({
			'compress': {
				'warnings': false
			}
		}),
		new webpack.BannerPlugin(banner, {
			'raw'      : false,
			'entryOnly': false
		})
	]
}