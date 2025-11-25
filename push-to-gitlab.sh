#!/bin/bash

# Script untuk push ke GitLab FE dan BE secara terpisah
# FE hanya push folder frontend, BE hanya push folder backend
# FE selalu push ke branch on-development
# BE push ke branch yang ditentukan (default: deployment)

FE_BRANCH="on-development"
BE_BRANCH=${1:-deployment}

echo "Pushing frontend to GitLab FE (branch: $FE_BRANCH)..."
git subtree push --prefix=frontend gitlab-fe $FE_BRANCH

echo ""
echo "Pushing backend to GitLab BE (branch: $BE_BRANCH)..."
git subtree push --prefix=backend gitlab-be $BE_BRANCH

echo ""
echo "Done! Frontend dan Backend sudah di-push ke GitLab masing-masing."

