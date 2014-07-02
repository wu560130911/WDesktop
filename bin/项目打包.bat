@echo off
echo [INFO] 欢迎使用WMS框架
echo [INFO] 正在打包项目，请稍等......

cd %~dp0
cd ..
call mvn clean package -Dmaven.test.skip=true

cd bin

pause