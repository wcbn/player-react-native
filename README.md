# React-Native WCBN App for Android and iOS

<a href="https://play.google.com/store/apps/details?id=org.wcbn">
  <img alt="Get it on Google Play" title="Google Play" src="docs/play-store.png" height="40">
</a>

![Screenshots](docs/screenshots.jpg)

# Demo

[View with the Expo app](https://expo.io/@dctalbot/wcbn-app)

# Things you'll need

- [yarn](https://classic.yarnpkg.com/lang/en/)
- [Expo Client](https://apps.apple.com/us/app/expo-client/id982107779) OR [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) device simulator OR [Android Studio](https://developer.android.com/studio) AVD emulator

# Getting started

    cd player-react-native
    yarn
    yarn start

# Custom Native Runtime

To extend native capabilities, create a custom dev environment using EAS. e.g.:

    eas build --profile development --platform ios
    eas build --profile development --platform android
    eas build --profile development-simulator --platform ios

Then download, install the environment on device / simulator, and run:

    expo start --dev-client

# Deployment Notes

1. Bump `app.json` `expo.android.versionCode`
2. Create pull request (make sure github actions checks pass)
3. `expo build:android --type app-bundle`
4. Download from turtle
5. Upload to Google Play console
6. Wait for Google to approve
7. Merge PR (github actions will publish to expo)
