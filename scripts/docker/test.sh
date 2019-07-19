#!/bin/bash

# Exit when any command fails:
set -e

# Run a virtual monitor for GTK:
# https://cloud.docker.com/u/igabriele/repository/docker/igabriele/node-vscode/general#requirements
Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &

yarn test
