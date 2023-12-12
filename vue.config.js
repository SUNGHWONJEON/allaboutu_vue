const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // npm run server 개발 진행시 포트가 다르기 때문에 
  // 프록시 설정해줘야 함
  // target : 백엔드 port가 들어감
  // changeOrigin 
  // -> true로 해야 cros 문제 해결할 수 있음

  lintOnSave:false,
  outputDir: "../allaboutu_springboot/src/main/resources/static",
  
  devServer: {
    proxy: {
      '/': {
        target: "http://localhost:2222",
        changeOrigin: true,
        ws: false
      }
    }

  }
  
  
})
