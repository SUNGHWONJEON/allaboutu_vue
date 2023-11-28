const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  outputDir: "../allaboutu_springboot/src/main/resources/static",
  devServer: {
    proxy: {
      '/': {
        target: "http://localhost:2222",
        changeOrigin: true,
      }
    }
  }   
})
