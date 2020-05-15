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
     


    //   {
    //     test:/\.html$/, // html loader
    //     use:[
    //         {
    //             loader:'html-loader',
    //             options:{minimize:false}
    //         }
    //     ]
    //   },
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
    ]
    }, // 기존파일에 적용할 모듈 
    
    plugins:[
        new HtmlWebPackPlugin({
            template:'./src/views/common/parent.html',
            filename:'./views/common/parent.html',
            inject:false,            
            showErrors:true
        }),
        new HtmlWebPackPlugin({
            template:'./src/views/index.html',
            filename:'./views/index.html',
            // favicon:'./src/views/favicon.ico',
            showErrors:true,
            inject:true,
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
            // {
            //     from:'./src/views/favicon.ico',
            //     to:'./'
            // },
        ])
    ],
    optimization:{},
    output:{
       publicPath:'',
       path:path.join(__dirname,'./dist/public'),
       filename: '[name].js'
    }, // 결과 파일
  }