# Heroku Extension for Visual Studio Code

[![MIT License](https://img.shields.io/github/license/ivangabriele/vscode-heroku?style=for-the-badge)](https://github.com/ivangabriele/vscode-heroku/blob/main/LICENSE)
[![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/i/ivangabriele.vscode-heroku?style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=ivangabriele.vscode-heroku)
[![Main Workflow Status](https://img.shields.io/github/actions/workflow/status/ivangabriele/vscode-heroku/main.yml?style=for-the-badge)](https://github.com/ivangabriele/vscode-heroku/actions?query=main)

---

- [Features](#features)
- [Requirements](#requirements)
- [Roadmap](#roadmap)
- [Issues \& Feature Requests](#issues--feature-requests)
- [Changelog](#changelog)

---

## Features

- **Check your project's Heroku deployment status.**
- **Log into Heroku CLI.**
- **Logout from Heroku CLI.**
- **Link your current project's workspace to your Heroku app via the Command Palette.**
- **Includes teams applications.**

## Requirements

- You need to have installed the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli).
- You need to be authenticated via Heroku CLI:<br />
  **Command Palette** > `Heroku: Login`.
- Your workspace needs to be linked to an existing application hosted on Heroku:<br />
  **Command Palette** > `Heroku: Link current workspace to an existing Heroku app`.

## Roadmap

1. Open the current Heroku app Activity Dashboard when clicking on the Heroku Status.
2. Add a command in the Command Palette to open the Heroku-hosted app.
3. Create and deploy a new Heroku app via the Command Palette.
4. Handle pipelines.

## Issues & Feature Requests

Please report any issue or feature request [there](https://github.com/ivangabriele/vscode-heroku/issues).

## Changelog

Please check the [changelog file](https://github.com/ivangabriele/vscode-heroku/blob/master/CHANGELOG.md).
