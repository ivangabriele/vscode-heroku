#!/bin/bash

# Exit when any command fails:
set -e

docker build -t vscode-git-automator:test -f ./test.Dockerfile .
docker run -it vscode-heroku:test
