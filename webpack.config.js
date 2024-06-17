const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        app: "./src/index.tsx",
    }, // Entry point of your application
    output: {
        filename: "bundle.js", // Output bundle file name
        path: path.resolve(__dirname, "dist"), // Output directory
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [{
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-typescript'],
                        },
                    },
                    {
                        loader: "ts-loader",
                    }
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,  // Enable CSS modules
                            // other options as needed
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", '.tsx', '.ts'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        historyApiFallback: {
            index: '/index.html',  // or the path to your main entry point
        },
        port: 9000, // Port for the development server
    },
};
