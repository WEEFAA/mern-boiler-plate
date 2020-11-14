const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//client enviroment variables
const client_env = {
	// default api endpoint
	API: 'http://localhost:4040/api'
}

module.exports = {
	output:{
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
		publicPath: '/'
	},
	devServer: {
     	historyApiFallback: true
	},
	module: {
		rules: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				use: {
					loader: 'babel-loader',
					options: {
						presets:['@babel/preset-env', '@babel/preset-react']
					}
				} 
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ template: './public/index.html' }),
		new webpack.EnvironmentPlugin(client_env)
	]
}