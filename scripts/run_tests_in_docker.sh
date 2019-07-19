#!/bin/bash

# Exit when any command fails:
set -e

docker build -t vscode-heroku:test .
docker run -it vscode-heroku:test
