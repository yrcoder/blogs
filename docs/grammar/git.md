 安装

```sh
# 配置用户名和邮箱
git config --global user.name "lyr"
git config --global user.email "xxx@xx.com"
# 初始化版本库
git init
# 添加文件到版本库
git add
git commit
 # 查看仓库状态
git status

# 其他
pwd # 当前所在目录（位置）
ll # 展示当前目录所有文件
cd ..
ls
ls -a # 会显示隐藏的文件
mkdir fileName # 创建文件
cd fileName # 进入文件
git init # 创建新的版本库
echo "一些文字" >> test.txt # echo输入 >> 追加，将“一些文字”追加到test.txt文件
cat test.txt # 展示文件的内容
git add test.txt # 添加到暂存区
git commit -m "一些提示信息" # 提交到本地仓库
git status # 查看当前状态，（当前所在分支，是否有未提交的文件）
```
