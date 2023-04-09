module.exports = {
  APP_ORIGIN: 'http://22.6.98.101:8090', // 代理后台地址
  VISIT_PORT: '8899', // 启动端口
  PROXY_TIMEOUT: 1000 * 30, // 代理超时时间
  ZIP_NAME: 'dev', // 打包名称
  ENV: {
    PACK_ENV: '"dev"', // 当前环境
    MOCK_OPEN: true, // 是否开启mock
    REMOTE_ADDRESS: '""' //远程地址
  }
}
