@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\@strapi\sdk-plugin\bin\strapi-plugin.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\node_modules\@strapi\sdk-plugin\bin\strapi-plugin.js" %*
)
