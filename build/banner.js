/**
 * banner description
 */
var pkg = require('../package.json');
var version = pkg.version;
var released = 'released under the MIT license.';
var repository = pkg.repository.url;
var author = '(c) ' + (new Date()).getFullYear() + ' HcySunYang';

module.exports = {
	'jsonob': [
		'jsonob.js v' + version,
		author,
		repository,
		released
	].join('\n')
}