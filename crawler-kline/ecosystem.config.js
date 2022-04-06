module.exports = {
  apps: [
    {
      name: 'crawler-kline',
      script: './index.js',
      watch: false,
      node_args: '-r tsconfig-paths/register', // node的启动模式
      instances: 1, //将应用程序分布在所有CPU核心上,可以是整数或负数
      // instances: 'max',
      // instance_var: 'INSTANCE_ID',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },

      env_prerelease: {
        NODE_ENV: 'prerelease',
        // PORT: 5001,

        // 执行定时任务的 ip
        HOST: '127.0.0.1',
      },
      env_test: {
        NODE_ENV: 'test',
        // PORT: 5001,

        // 执行定时任务的 ip
        HOST: '172.16.128.31',
      },
      env_production: {
        NODE_ENV: 'production',
        // PORT: 5001,

        // 执行定时任务的 ip
        HOST: '172.32.0.223',
      },
    },
  ],
}
