const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // Mobile Test Configurtion 
    target:"node",
    devServer:{
        contentBase:path.resolve(__dirname,'/src'),
        disableHostCheck:true,
        host:'0.0.0.0'
    },
    name:'network',
    mode:'development', // "production" | "development" | "none"
    devtool:'eval',  // source-map   hidden-source-map
    resolve:{
        modules:['node_modules'],
        extensions:['.scss','.css','.js'],
        alias:{
            "@gdlUtils":path.resolve(__dirname,'src/gdlUtils'),
            "@userCSS":path.resolve(__dirname,'src/public/css'),
            "@res":path.resolve(__dirname,'src/public/resource'),
            'public':path.join(__dirname,'public')
        }
    },
    entry:{
        'index':'./src/public/js/index.js'
        // index:['./src/public/js/tqm-test-module.js']
        // 'public/index':[
        //     "./src/public/js/tqm-test-module.js",
        //     "./src/public/css/tqm-test-module.css"
        // ],
        
    }, // 기존파일
    module: {
    rules: [
      // {   ts-loader 는 tsc로 대체 부분 빌드 
      //   test: /\.ts$/,
      //           use: ['ts-loader'],
      //           exclude:["/node_modules"]
      // },
      {
        test:/\.html$/, // html loader
        use:[
            {
                loader:'html-loader',
                options:{minimize:false}
            }
        ]
      },
    //   {
    //     test:/\.scss$/,
    //     use:[
    //         {
    //             loader:MiniCssExtractPlugin.loader,
    //             options:{
    //                 hmr:process.env.NODE_ENV === 'development',
    //                 reloadAll:true,
  
    //             }
    //         },
    //         /* devMode ? 'style-loader' : 
    //         process.env.NODE_ENV !== 'production' ? 'style-loader' :
    //         MiniCssExtractPlugin.loader,
    //         */
    //         MiniCssExtractPlugin.loader,
    //         // 'style-loader',
    //         'css-loader',
    //         'sass-loader',
    //     ]
    //    },
       {
          test:/\.css$/i,
          use:[
              {
                loader:MiniCssExtractPlugin.loader,
              },
            //   'style-loader',
             'css-loader'
          ],
          
       },
      {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          // test:/\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
          use:{
              loader:'url-loader',
              options:{
                  // 2019-06-21 테스트이미지가 안불려서 ../ -> ./로 수정 
                  name:'[path][hash].[ext]',
                  limit:10*1024 // 10kb
              }
          }
      },
      {
        test: /\.ico$/,
        loader: 'file-loader'
     }
            // favicon/icon-line.ico
            // {
            //     // test:/\.(png|svg|jpg|gif|ico)$/,
            //     use:[
            //         {
            //             loader:'file-loader',
            //             options:{
            //             name:'[hash].[ext]', // [path][name].[ext]?[hash] result : path/to/file.png?e43b20c069c4a01867c31e98cbce33c9
            //             outputPath:'res',
            //             publicPath:'res'
            //                 // name:'[hash].[ext]', // [path][name].[ext]?[hash] result : path/to/file.png?e43b20c069c4a01867c31e98cbce33c9
            //                 // outputPath:'res/images',
            //                 // publicPath:'res/images'
            //             }
            //         }
            //     ]
            // },
           
    ]
    }, // 기존파일에 적용할 모듈 
    
    plugins:[
        
        new HtmlWebPackPlugin({
            template:'./src/views/index.html',
            filename:'./views/index.html',
            // favicon:'./src/views/favicon.ico',
            showErrors:true
        }),
        new MiniCssExtractPlugin({
            filename:'[name].css',
            chunkFilename:'[id].css'
        }),
        new CopyWebpackPlugin([
            {
                context:'./src/public/resource/',
                from:'**/*',
                to:'./resource'
            },
            {
                from:'./src/views/favicon.ico',
                to:'./'
            },
        ])
    ],
    optimization:{},
    output:{
       publicPath:'',
       path:path.join(__dirname,'./dist/public'),
       filename: '[name].js'
    }, // 결과 파일
  }