#!/bin/bash

set -e

# If os is macos
if [[ "$OSTYPE" == "darwin"* ]]; then
  rm -Rf /usr/local/heroku /usr/local/lib/heroku /usr/local/bin/heroku ~/.local/share/heroku ~/Library/Caches/heroku
else
  if ! command -v sudo &> /dev/null
    if test -f /usr/local/bin/heroku; then
      sudo rm -Rf /usr/local/bin/heroku
    fi
    sudo rm -Rf /usr/local/lib/heroku /usr/local/heroku
    sudo rm -Rf ~/.local/share/heroku ~/.cache/heroku
  then
    if test -f /usr/local/bin/heroku; then
      rm /usr/local/bin/heroku
    fi
    rm -Rf /usr/local/lib/heroku /usr/local/heroku
    rm -Rf ~/.local/share/heroku ~/.cache/heroku
  fi
fi
