@echo off
echo [INFO] 欢迎使用WMS框架
echo [INFO] 正在启动Jetty，请稍等......

cd ..

set MAVEN_OPTS=%MAVEN_OPTS% -XX:MaxPermSize=128m
call mvn jetty:run -Djetty.port=8080

cd bin

echo [INFO] 启动成功！请到浏览器下访问.
pause