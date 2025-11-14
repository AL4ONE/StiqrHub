#!/bin/bash

# Script untuk push ke GitLab FE dan BE secara terpisah
# FE hanya push folder frontend, BE hanya push folder backend

BRANCH=${1:-deployment}

echo "Pushing frontend to GitLab FE..."
git subtree push --prefix=frontend gitlab-fe $BRANCH

echo ""
echo "Pushing backend to GitLab BE..."
git subtree push --prefix=backend gitlab-be $BRANCH

echo ""
echo "Done! Frontend dan Backend sudah di-push ke GitLab masing-masing."

