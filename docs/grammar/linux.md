# shell

此权限时使用命令 chattr 的 a 属性来设置的，具体命令为：
sudo chattr +a file(filename)
取消此权限命令：
sudo chattr -a file(filename)

若递归的设置文件夹的此种权限，使用-R 属性：
sudo chattr +a -R file(filename)
递归取消文件夹的此属性：
sudo chattr -a -R file(filename)

# linux

吾注：
文件的增删改查
用户的权限(什么人可以增删改查)
各种软件的安装和使用(环境变量，开机启动，进程管理等等)

大小写区分
一切皆文件
后缀名不重要

有没有公网 IP 区分是不是服务器

CentOs
虚拟机是什么？
virtualbox
安装虚拟机电脑要支持虚拟化，BIOS 开启虚拟化支持。
在虚拟机中安装操作系统
安装 centOs
网络设置成桥接
改变默认源

准备工作
ifconfig
ip addr
vi /etc/sysconfig/network-scripts/ifcfg (tab 键提示)
yum install net-tools (可以用 ifconfig 命令)

vi /etc/sysconfig/network-scripts/ifcfg
把 ONBOOT 设置为 yes
将网络服务重启
service network restart

cat /etc/redhat-release

yum install wget

# ssh 一个协议(类似 http 协议)

ssh： secure shell 安全外壳协议
远程链接的方案
建立在应用层基础上的安全协议，可靠，专为远程登录会话和其他网络服务提供安全性的协议
有效防止远程管理过程中对信息泄露问题
ssh 客户端适用于多种平台
ssh 服务端几乎支持所有 UNIX 平台

在服务器中安装 ssh 服务
yum install openssh-server
启动
service sshd start
设置开机运行
chkconfig sshd on
查看进程是否存在
ps -ef |grep ssh

客户端安装 ssh 工具
window: xshell
linux: 执行命令 yum install openssh-clients

链接命令
ssh root@xxx.xxx.xxx
exit

ssh config
方便批量管理多个 ssh
config 存放在 ～/.ssh/config
配置语法：
查看是不是能连上
ping 192.168.0.022
cd ~/.ssh/
新建文件
touch config
编辑文件
vim config
内容
host "lyr"
HostName 192.168.0.102
User root
Port 22
设置完之后再链接不需要输入 ssh root@192.168.0.102
只需要输入 ssh lyr

多台服务器
host "lyr"
HostName 192.168.0.102
User root
Port 22

host "lyr2"
HostName 192.168.0.102
User root
Port 22

免密登录
ssh key 使用非对称加密方式生成公钥和私钥，存放在～/.ssh 目录
公钥可以对外公开
～/.ssh/authorized_keys
生成 ssh key
ssh-keygen -t rsa 或者 ssh-keygen -t dsa

ssh 安全端口
默认 22
修改端口
vim /etc/ssh/sshd_config
服务重启
service sshd restart

# 常用命令

-   软件操作命令

软件包管理器：yum
安装软件：yum install xxx
卸载：yum remove xxx
搜索：yum search xxx
清理缓存：yum clean packages
列出已安装：yum list
软件包信息：yum info xxx

-   服务器硬件资源和磁盘操作

查看内存：free -m (-m 以 M 的形式展示)
硬盘：df -h (-h 是以人类可以看的懂的形式展示)
负载：w/top (1 说明满了)
cpu 个数和核数：cat /proc/cpuinfo
格式化磁盘：fdisk

-   文件和文件夹操作命令

目录结构

    * 根目录 /
    * 家目录 /home
    * 临时目录 /tmp
    * 配置目录 /etc
    * 用户程序目录 /usr
    /usr/bin
    /usr/sbin

命令

    * ls; ls -al === ll
    * touch; 新建文件
    * mkdir; 新建文件夹。 循环新建: mkdir -p lyr/test/test1;
    * rm; rm 删除文件。 删除文件夹: rm -r xxx; 强制删除: rm -rf xxx
    * cp 源文件路径 目标路径; 复制文件
    * mv 源文件路径 目标路径; 移动文件
    * pwd; 显示当前路径

vim

    * 首行: G
    * 尾行: gg
    * 删除当前光标所在行: dd
    * 恢复: u
    * 复制: yy
    * 粘贴: p
    * 显示行数: :set number

文件权限 421

    * r w x -> 1*2*2 + 1 * 2 + 1*1
    * 读r: 4
    * 写w: 2
    * 可执行x: 1
    * -rw-r--r--: rw-(读写的权限); r--(读的权限)
    * drwxr-xr-x: d表示目录结构;rwx(最高权限，读写可执行);r-x(读和执行);r-x(读和执行)
    * 777是最大的权限

文件搜索，查找，读取

    * tail: 从文件尾部开始读取 tail -f xxx, 当在另一个窗口编辑的时候可以自动读取尾部信息
    * head: 从文件头部开始读取
    * cat: 读取整个文件
    * more: 分页读取, 从头部开始读，按enter键一行一行往下跑
    * less: 可控分页
    * grep: 搜索关键字, grep 'aaa' xxx(查找文件中带aaa的); grep -n 'aaa' xxx(带行号)
    * find: 查找文件, find .(列出当前目录下的所有文件); find . -name "*.c"(找出当前目录下,以.c为结尾的文件名); find . -type f(找出当前目录下的文件); find . -type d(找出当前目录下的文件夹); find . -ctime -20(找出当前目录下20天内更新过的文件, -ctime -20 指当前时间减去20天); find . -type f -mtime + 7(找出当前目录下的7天之前更新过的文件, -mtime 最后更新的时间); find . -type f -perm 777 -exec ls -l {} \(找到当前目录下权限是777的文件并列出它们)
    * wc: 统计个数, cat xxx | wc -l (xxx文件总共多少行)
    * |: 管道，将第一个命令执行完之后的结果传给第二个命令，grep "2017-08-22 15:30" xxx | more

文件压缩与解压

    * tar
    * man tar; tar 命令的操作手册
    * tar -cvf|tvf|xvf
    * tar -czvf|tzvf|xzvf

-   系统用户操作命令

    -   添加用户: useradd(adduser); adduser lyr_test; /home 文件夹下多一个目录
    -   删除用户: userdel [username]; 删除文件之后，文件夹还在, rm -rf /home/lyr_test; userdel -r [username]彻底删除，包括目录
    -   设置密码: passwd [username]

*   防火墙相关设置

    -   作用: 保护服务器的安全
    -   设置防火墙规则(开放 80, 22, 43 端口)
    -   查看是否安装: yum list | grep firewall
    -   查看是否启动：ps -ef | grep firewall
    -   安装：yum install firewalld
    -   启动/重启：service firewalld start/restart
    -   检查状态： service firewalld status
    -   关闭或者禁用：service firewalld stop/disable
    -   简单操作: firewall-cmd --version; firewall-cmd --help;firewall-cmd --get-zones(查看防火墙区域);firewall-cmd --get-default-zones(查看防火墙默认区域);firewall-cmd --list-all-zone(查看防火墙每个区域的配置信息);firewall-cmd --zone=public(查看某个防火墙的区域); firewall-cmd --list-ports(查看防火墙的端口);
        firewall-cmd --query-service=ssh(查看是否允许这个服务访问);firewall-cmd --remove-service=ssh(删除服务,删除之后就不能访问了);firewall-cmd --add-service=ssh(添加服务); firewall-cmd --list-service(查询有哪些服务); firewall-cmd --add-port=22/tcp(添加端口，就可以登录了？);firewall-cmd --remove-port=22/tcp(删除端口);

-   提权操作 sudo 和文件传输操作

    -   提权操作：sudo(visudo 编辑 sudo 配置), 找到 ALL 的权限，复制
    -   文件下载(wget,curl): wegt http://www/baidu.com; curl -o 我起的名字 http://www/baidu.com;
    -   文件上传(scp): scp 本地的文件名 用户+服务器+路径; scp text.txt root@192.168.0.0.1:/tmp/; scp root@192.168.0.0.1:/tmp/text.txt ./; (将服务器上的文件下载到本地当前目录)

# webServer 安装和配置讲解（nginx）

安装: yum install nginx
启动，停止，重载: service nginx start/restart/stop/reload
反向代理：隐藏了后台服务器

```sh
# 负载均衡
upstream lyr_hosts {
    server 192.169.0.092 weight=5;
    server 192.169.0.000 weight=1;
}
server {
    # 可以监听多个端口
    listen 80;
    listen 999;
    # 可以设置多个访问域名
    server_name www.aaa.com www.bbb.com;
    root /data/www;
    index index.html index.htm;
    # 日志的位置，和模式
    access_log /var/log/nginx/access_imooc.log lyr_test;
    location / {
        # 伪静态
        rewrite ^(.*)\.htmp$ /index.html;
        # 反向代理，（后台服务器）
        proxy_pass http://aaa.bbb.com
        # 反向代理可能会用到的规则
        # proxy_set_header Host aaa.bbb.cn
    }
}


# 日志的格式化
vim /etc/nginx/nginx.conf

http {
    # 定义日志格式（可以多个）
    log_format lyr_test '$remote_addr - $"http_user_agent"'
    # 日志的存放路径，和日志格式
    access_log /var/log/nginx/access.log lyr_test;
}
```

# 数据库服务

# 缓存服务

# git

yum install git
命令

# 服务管理

-   定时任务：crontab; crontab -e （编辑配置文件）; crontab
-   日期同步：Ntpdate; date; ntpdate; yum install utpdate（安装）; ntpdate cn.pool.ntp.org(同步时间)；rm /etc/localtime; sudo ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime(设置时区)
-   定时同步时间：crontab -l; 文件内容为 `*/30**** ntpdate cn.pool.ntp.org` 每半个小时同步一次
-   日志切割：Logrotate;

```sh
cat /etc/logrotage.d/nginx;
/var/log/nginx/*.log {
    daily
    missingok
    rotate 52
    compress
    deloycompress
    notifempty
    create 640 nginx adm
    sharedscripts
    postrotate
        if[ -f /var/run/gninx.pid ]; then
            kill -USR1 `cat /var/run/nginx.pid`
        fi
    endscript
}
```

-   进程管理：supervisor

```sh
pip install supervisor
```

# 监控神器 zabbix

可以监控 mysql,等等服务
