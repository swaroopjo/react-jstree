const HtmlWebPackPlugin = require("html-webpack-plugin");
const devMode = true;
module.exports = {
    devtool: 'inline-source-map',
    // devtool: 'cheap-module-eval-source-map', // try this when free.
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [
            { // Tell babel loader to transpile the jsx files
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {   // Tell hteml loader to load the initial html file and add our build scripts to the body.
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: false}
                    }
                ]
            },
        ]
    },
    plugins: [
        // Generate the modified html file so that the webpack can serve it. when run as node project
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};