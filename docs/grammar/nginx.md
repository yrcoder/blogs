# nginx

cd /etc/nginx/conf.d

把公钥放到 ssh 文件下就不用输密码了

```sh
# 获取本机的公钥
cd ~
cd .ssh/
ls
# 公钥
cat id_rsa.pub

# 把公钥放在服务器上
cd ~
cd .ssh/
ll
vi authorized_keys
```

更改 nginx 配置
在 nginx 目录下创建一个文件夹，放前端打包后的代码
然后在 nginx/conf.d 目录下创建对应文件名的配置文件

```sh
cd /etc/nginx/conf.d
cat tsxy.conf

server {
    listen  80;
    server_name tsxy.loan.test.shufanfinance.com;

       location /  {
            root  /usr/share/nginx/tsxy/;
            try_files $uri $uri/ @routerSso;
            index   index.html index.htm;
        }

        location @routerSso {
            rewrite ^.*$  / last;
        }


    location /gateway {
        proxy_pass  http://192.168.5.89:8190/;
        proxy_set_header  Host     $host;
        proxy_set_header  X-Real-IP  $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_read_timeout 3600s;
        client_max_body_size    1000m;

    }
}

cp tsxy.conf workflow.conf
# 更改配置文件之后要重启nginx服务
# 然后上传文件就可以了
sshpass -p 'hengtian' ssh root@192.168.5.157 "cd /usr/share/nginx/birpt/; rm -rf *"
sshpass -p hengtian scp -r build/* root@192.168.5.157:/usr/share/nginx/birpt/.
```

shell 基本操作

```sh
# 登陆
ssh root@192.168.203.9
root：指用户名
192.168.203.9：服务器IP
# 打开文件
cd ~
cd ..
cd ../myFile
cd [foldername]
# 创建文件
mkdir [foldername]
# 删除文件夹
rm -rf [foldername]
# 查看
cat [filename]
# 查看文件所在目录
pwd
# 编辑
vi [filename]
vim [filename]
# 在文件中开始编辑(插入)
i
# 结束编辑状态
esc
# 强制保存退出
!wq
# 退出(!强制)
esc + 冒号 + q + !
# 拷贝 cp [srcname] [targetname]
cp tsxy.conf workflow.conf
# 列出文件
ls
ll
ll -li
# 登出
exit
# 重启
nginx -s reload
```

# 基础

# 场景实战

# 深度

# 架构

# 新特性
