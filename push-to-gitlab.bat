@echo off
REM Script untuk push ke GitLab FE dan BE secara terpisah
REM FE hanya push folder frontend, BE hanya push folder backend

set BRANCH=%1
if "%BRANCH%"=="" set BRANCH=deployment

echo Pushing frontend to GitLab FE...
git subtree push --prefix=frontend gitlab-fe %BRANCH%

echo.
echo Pushing backend to GitLab BE...
git subtree push --prefix=backend gitlab-be %BRANCH%

echo.
echo Done! Frontend dan Backend sudah di-push ke GitLab masing-masing.

