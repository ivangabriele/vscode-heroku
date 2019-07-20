// tslint:disable-next-line: import-name
import to from 'await-to-js';
import { window, workspace } from 'vscode';

import exec from '../helpers/exec';
import showProgressNotification from '../helpers/showProgressNotification';

import { HerokuApp } from './linkWorkspace.d';

export default async function () {
  const cwd = workspace.workspaceFolders[0].uri.fsPath;

  const [err1, herokuAppsNames] = await to(showProgressNotification(
    'Listing current Heroku apps...',
    async () => {
      const [err, herokuApps] = await to<string>(exec('heroku', ['apps', '--json'], { cwd }));
      if (err !== null) {
        window.showErrorMessage(
          'Something went wrong while trying to list your currents Heroku apps.',
        );

        throw err;
      }

      const herokuAppsJson = JSON.parse(herokuApps.trim()) as HerokuApp[];

      return herokuAppsJson.map(({ name }) => name);
    },
  ));
  if (err1 !== null) return;

  const herokuAppName = await window.showQuickPick(herokuAppsNames);
  if (herokuAppName === undefined) return;

  const [err2] = await to(showProgressNotification(
    'Listing current Heroku apps...',
    async () => {
      const [err] = await to<string>(exec('heroku', ['git:remote', '-a', herokuAppName], { cwd }));
      if (err !== null) {
        window.showErrorMessage(
          `Something went wrong while linking your Heroku app: "${herokuAppName}".`,
          );

        return;
      }
    },
  ));
  if (err2 !== null) return;

  window.showInformationMessage(
    `Your current workspace is now linked to the  "${herokuAppName}" Heroku app.`,
    );
}
