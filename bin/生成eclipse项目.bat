@echo off
echo [INFO] 欢迎使用WMS框架
echo [INFO] 正在生成Eclipse项目，请稍等......

cd %~dp0
cd ..
call mvn eclipse:clean eclipse:eclipse

cd bin

pause