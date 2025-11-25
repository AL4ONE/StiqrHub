@echo off
REM Script untuk push ke GitLab FE dan BE secara terpisah
REM FE hanya push folder frontend, BE hanya push folder backend
REM FE selalu push ke branch on-development
REM BE push ke branch yang ditentukan (default: deployment)

set FE_BRANCH=on-development
set BE_BRANCH=%1
if "%BE_BRANCH%"=="" set BE_BRANCH=deployment

echo Pushing frontend to GitLab FE (branch: %FE_BRANCH%)...
git subtree push --prefix=frontend gitlab-fe %FE_BRANCH%

echo.
echo Pushing backend to GitLab BE (branch: %BE_BRANCH%)...
git subtree push --prefix=backend gitlab-be %BE_BRANCH%

echo.
echo Done! Frontend dan Backend sudah di-push ke GitLab masing-masing.

