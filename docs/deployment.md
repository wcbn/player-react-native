# Deployment Playbook

1. Create a PR
2. Bump `expo.android.versionCode` and `expo.version` in `app.json`
3. CLI stuff

   ```sh
   expo login
   expo whoami
   expo doctor
   expo build:android --type app-bundle
   ```

4. Download build artifact (.aab)
5. Upload to https://play.google.com/console and roll out
6. Wait for google to review
7. Once the app has been reviewed + rolled out to the public, merge to master
8. On-merge, github actions will publish to expo
