const path = require('path'); //viene da node, non è di webpack
const ExtractTwxtPlugin= require('extract-text-webpack-plugin');
const HtmlWebpaclPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


module.exports = {
	entry: {
		app: './src/index.js',
		about: './src/js/about.js'
	},
	output: {
		filename: '[name].bundle.js', //questo crea file con al posto di [name] la key delle proprietà di 'entry'
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	module: {
		rules: [
			{
				test: /\html-webpack-plugin.css$/,
				use: ExtractTwxtPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader','postcss-loader']
				})
			},
			{
				test: /\.scss$/,
				use: ExtractTwxtPlugin.extract({
					fallback: 'style-loader',
					use: [
						{ loader: 'css-loader', options: { sourceMap: true } },
						{ loader: 'postcss-loader', options: { sourceMap: true } },
						{ loader: 'sass-loader', options: { sourceMap: true } }
					]
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins:[
		new CleanWebpackPlugin(['dist']),
		new ExtractTwxtPlugin('styles.css'),
		new HtmlWebpaclPlugin({
			filename: 'index.html',
			template: 'src/views/index.html',
			chunks: ['app'] //prende da 'entry'
		}),
		new HtmlWebpaclPlugin({
			filename: 'about.html',
			template: 'src/views/about.html',
			chunks: ['about']
		}),
		new BrowserSyncPlugin(
	      // BrowserSync options
	      {
	        // browse to http://localhost:3000/ during development
	        host: 'localhost',
	        port: 8080,
	        // proxy the Webpack Dev Server endpoint
	        // (which should be serving on http://localhost:3100/)
	        // through BrowserSync
	        proxy: 'http://localhost:8081/'
	      },
	      // plugin options
	      {
	        // prevent BrowserSync from reloading the page
	        // and let Webpack Dev Server take care of this
	        reload: false
	      }
	    )
	]
}