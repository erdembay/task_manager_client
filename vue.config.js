const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true, // Bağımlılıkları transpile etmek için kullanılır
  publicPath: "./", // Uygulama kök yolu
  pages: {
    index: {
      entry: "src/main.js", // Uygulama giriş dosyası
      template: "public/index.html", // HTML template
      filename: "index.html", // Çıktı HTML dosyası adı
      title: "Task Manager Client", // HTML başlığı
      chunks: ["chunk-vendors", "chunk-common", "index"], // Dahil edilecek parçalar
    },
  },
  devServer: {
    historyApiFallback: true, // Tüm yolları index.html'e yönlendir
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true), // Vue özelliği bayrağı
      }),
    ],
  },
});
