# nginx

云主机重装了一下系统后，再登录本机会有之前服务器的信息，将之删掉即可
错误信息中有：Add correct host key in /Users/dashu/.ssh/known_hosts to get rid of this message.
在/Users/dashu/.ssh/known_hosts 该文件下删除重装主机的信息，重新登录即可

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

# node 项目上线

前期准备
域名：
服务器：带外网 IP 的一台电脑，把项目部署上去，启动，监听 80 端口，根据转发的机制，把这些代码转发到 nodejs 后台的服务中
域名备案

配置服务器应用环境
安装配置数据库
项目远程部署发布与更新

光标回到行首：ctrl + a
光标回到行尾：ctrl + e

```sh
# 登录
ssh root@外网地址

# 查看linux系统的盘
fdisk -l

# 清空面板
command + r

# 查看硬盘使用情况
df -h

# 退出
logout

# 如果安装了zsh就会有.zshrc这个配置文件，在这个文件中可以加上一些软链接的命令。执行source .zshrc，配置就会生效

alias ssh_root="ssh root@外网地址"

# 创建权限更低的用户，root会误操作不可恢复
adduser lyr
# passwd 用户名，给用户设置密码
# 给用户赋权, 输入命令在sudo的情况下可以操作命令
gpasswd -a lyr sudo # 没有办法执行该命令
sudo visudo # 更改配置文件
# 在user那一项, 把root的权限同样复制一份给lyr
root ALL=(ALL:ALL) ALL
# 重启ssh功能
service ssh restart

# 通过ssh实现无密码的登录,在根目录下创建打开.ssh文件夹，里面有配置文件，如果没有该文件夹就mkdir .ssh, 重新创建
pwd
ll -a
cd .ssh
未完

# 修改服务器默认登录端口(重启生效： sudo service ssh restart)
sudo vi /etc/ssh/sshd_config
Prot 39999
UseDNS no
AllowUsers lyr
PermitRootLogin no # 不允许root登录

登录也要换
ssh -p 39999 lyr@XXX # 默认端口是22

# 配置iptables （防火墙） 和 Fail2Ban
未完

# 安装node环境
系统更新
sudo apt-get update
安装包文件
sudo apt-get install vim open ssl build-essential libssl-dev wget curl git
安装nvm, 用wget安装
wget 去github nvm 仓库找链接
安装node
nvm install v8.12.0
nvm use v6.9.5
nvm alias default v6.9.5 # 系统的默认node版本为6.9.5
node -v
npm --registry=https://registry.npm.taobao.org install -g npm # npm用淘宝镜像
npm --registry=https://registry.npm.taobao.org install -g cnpm # npm用淘宝镜像
# echo fs.inotify.max_user_watches=524288
npm i pm2 webpack -g

# 让服务稳定的运行 pm2
在终端中启动服务，该服务只限于该终端的生命周期，
pm2 list
pm2 run app.js
pm2 logs # 当前实时日志
pm2 代码的自动更新
```

linux 常用命令
在 Fedora 上用 yum 安装
在 Ubuntu 这类 Debian 体系的系统上，可以用 apt-get 安装

```sh
# 查看软件安装的所有路径(地址)
whereis node # node: /root/.nvm/versions/node/v12.7.0/bin/node
whereis git # git: /usr/bin/git /usr/share/man/man1/git.1.gz
whereis nginx # nginx: /usr/sbin/nginx /usr/lib64/nginx /etc/nginx /usr/share/nginx /usr/share/man/man3/nginx.3pm.gz /usr/share/man/man8/nginx.8.gz

# 已经安装的但是不包含在资源库中的rpm包
yum list # 列出资源库中所有可以安装或更新的rpm包
yum list installed #
yum list perl # 列出名为perl  的包
yum list perl* # 列出perl 开头的包
yum list updates # 列出资源库中所有可以更新的rpm包
yum info # 列出资源库中所有可以安装或更新的rpm包的信息
yum info perl # 列出perl 包信息
yum info perl* # 列出perl 开头的所有包的信息
yum info updates # 列出资源库中所有可以更新的rpm包的信息
yum info installed # 列出已经安装的所有的rpm包的信息
yum info extras # 列出已经安装的但是不包含在资源库中的rpm包的信息

# 在github官网上找下载的链接 https://github.com/nvm-sh/nvm/blob/master/README.md
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
source ~/.bashrc
# 可查看node所有版本
nvm ls-remote
# 安装最新稳定版的nodejs
nvm install stable
nvm use node
nvm run node --version
# 安装pm2
npm install -g pm2
# 安装git
yum install git-core
# 安装nginx
yum install nginx

# 查看公钥
# 看机器有没有配置过公钥
pwd # 查看当前位置
ls -a # 查看以点为前缀的文件
cd .ssh # 里面的id_rsa.pub 就是公钥，如果没有这些文件说明没有，就要生产私钥和公钥
ssh-keygen -t rsa -b 4096 -C "liyueru.com.cn" # liyueru.com.cn邮箱名字
cat id_rsa.pub

# 让node项目稳定跑起来
pm2 start app.js # node app.js

# nginx 开机自动重启
# nginx 代理80端口的请求，分发给别的地址
# nginx的配置文件命名，一般会起程 对应的域名+要分发的端口
cd /etc/nginx/conf.d
vi liyueru.com.cn_8080.conf # 创建文件
# 内容如下： 将域名liyueru.com.cn指向服务器本地的8080端口
upstream blog {
	server 127.0.0.1:8080;
}

server {
	listen 80;
	# server_name 111.231.145.233; # 服务器的IP地址，不要端口
	server_name liyueru.com.cn; # 错误：server_name http://xxx.com;正确：server_name xxx.com;

	location / {
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
		proxy_set_header Host $http_host;
		proxy_set_header X-Nginx-Proxy true;
		proxy_pass http://127.0.0.1:8080;
		proxy_redirect off;
	}
}
# 内容结束，检查是否正确
nginx -t # 检测配置文件有没有问题
nginx # 启动
nginx  -s  stop # 关闭
nginx -s reload # 重启
# 前端和后端整合的配置
server {
    listen  80;
    server_name liyueru.com.cn;

    location /  {
        root  /usr/share/nginx/liyueru.com.cn-8080/;
        try_files $uri $uri/ @routerSso;
        index   index.html index.htm;
    }

    location @routerSso {
        rewrite ^.*$  / last;
    }

    location /gateway {
        proxy_pass  http://192.168.5.89:8190/;
        proxy_set_header Host     $host;
        proxy_set_header X-Real-IP  $remote_addr;
        proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_read_timeout 3600s;
        client_max_body_size    1000m;
    }
}

# 服务器重启之后 重启nginx; nginx: [error] open() "/run/nginx.pid" failed (2: No such file or directory)
因为强制终止nginx之后，不能直接用重启命令，先执行nginx命令之后才

# 安装mysql https://www.cnblogs.com/shalldou/p/10767043.html   https://www.jianshu.com/p/455b93c451fd
# 查看mysql可允许登录的用户名和主机
select user,host from user;
# 删除mysql用户和主机（将上面的查询的到的用户名和主机写入即可）
DROP USER 'username'@'host';
# 添加用户和主机权限(host为%代表所有的都可以)
grant all on *.* to 'username'@'host' identified by 'password' with grant option;
grant all on *.* to 'root'@'%' identified by '123456' with grant option;
# 重新加载权限
flush privileges
```
