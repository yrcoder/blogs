# node

## npx

npm install -g npx

## nvm

node 的版本管理器

## npm

查看版本
npm ls react-router react-router-dom react-router-config
引用外部的包
npm outdated

安装来源（淘宝镜像）
npm config get registry

rm -rf node_modules/
mv package-lock.json package-lock.json.bak
npm cache clean --force

git checkout 97c897a
git stash
git stash pop

回退版本
git reset --hard 97c897a
强制提交
git push -f origin develop

把其他的因素注释，是找 bug 的方法
各种版本
谷歌调试器
