# pm2

进程守护，
多进程，
记录日志

## 命令

pm2 start ...
pm2 list
pm2 restart [appName || id]
pm2 stop [appName || id]
pm2 delete [appName || id]
pm2 info [appName || id]
pm2 log [appName || id]
pm2 monit [appname || id]

进程守护，遇到错误自动重启

## 配置

新建 PM2 配置文件，包括进程数量，日志文件目录等(pm2.config.json)
修改 PM2 启动命令，重启
访问 server,检查日志文件等内容（日志记录是否生效）

```js
{
	apps: {
        name: 'blog',
        script: 'app.js', // bin/www
        cwd: './', // 当前工作路径
        watch: true, // 代码更改的时候自动重启服务
        // watch: [
        //     // 监控变化的目录，一旦变化，自动重启
        //     'src',
        //     'build',
        // ],
        ignore_watch: [
            "node_modules",
            "logs"
        ],
        node_args: '--harmony', // node的启动模式
        instances: 4, // 多线程配置，逻辑核数, 值可以是max,"instances": (number|max)
        error_file: 'logs/err.log', // 错误日志路径
        out_file: 'logs/out.log', //  普通日志路径
        merge_logs: true, //集群情况下，可以合并日志
        log_type: 'json',
        log_date_format: 'YYYY-MM-DD HH:mm:ss', // 日志
        env: {
            COMMON_VARIABLE: true,
            PM2_SERVE_PATH: ".",    //静态服务路径
            PM2_SERVE_PORT: 8080,   //静态服务器访问端口
            NODE_ENV: 'development', //启动默认模式,设置运行环境，此时process.env.NODE_ENV的值就是development
            ORIGIN_ADDR: 'http://www.yoduao.com'
        },
        env_production : {
            NODE_ENV: 'production'  //使用production模式 pm2 start ecosystem.config.js --env production
        },
	},
    deploy : {
        production : {
            user : 'node',                      // ssh 用户
            host : ['212.83.163.1'],            // ssh 地址
            post: 8000,
            ref  : 'origin/master',             // GIT远程/分支
            repo : 'git@github.com:repo.git',   // 项目 git地址,
            path : '/var/www/production',       // 服务器文件路径
            ssh_options: 'StrictHostKeyChecking=no', // ssh校验关闭
            env: {
                NODE_ENV: 'production'
            },
            "post-deploy" : 'npm install && pm2 reload ecosystem.config.js --env production'  //部署后的动作
        }
    }
}
```

## 多进程

多进程之间无法共享内存
多进程访问一个 redis，实现数据共享

# git 和自动部署

<!-- https://www.jianshu.com/p/5c7ce1b02100 -->
