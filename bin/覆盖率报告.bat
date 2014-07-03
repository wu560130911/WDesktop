@echo off
echo [INFO] 欢迎使用WMS框架
echo [INFO] 正在生成覆盖率报告，请稍等......

cd ..

call mvn cobertura:cobertura

cd bin

echo [INFO] 报告生成完毕！请到site/cobertura目录下的index.html下查看
pause