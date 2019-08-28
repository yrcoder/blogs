# shell

此权限时使用命令 chattr 的 a 属性来设置的，具体命令为：
sudo chattr +a file(filename)
取消此权限命令：
sudo chattr -a file(filename)

若递归的设置文件夹的此种权限，使用-R 属性：
sudo chattr +a -R file(filename)
递归取消文件夹的此属性：
sudo chattr -a -R file(filename)
