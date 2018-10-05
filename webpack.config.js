const webpack       = require('webpack');
const uglifyJSWPlugin   = require('uglifyjs-webpack-plugin');

const config = {
	output: {
		filename: 'common.js'
	},
	plugins: [
		new uglifyJSWPlugin ({
			sourceMap: true
		})
	]
}

module.exports = config;
