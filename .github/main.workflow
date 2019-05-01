workflow "Install and Publish" {
  on = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Publish" {
  needs = "Install"
  uses = "expo/expo-github-action@2.3.1"
  args = "publish"
  secrets = [
    "EXPO_USERNAME",
    "EXPO_PASSWORD",
    "EXPO_CLI_USERNAME",
    "EXPO_CLI_PASSWORD",
  ]
}
