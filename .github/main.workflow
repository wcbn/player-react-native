workflow "New workflow" {
  on = "push"
  resolves = ["Publish to Expo"]
}

action "Install dependencies" {
  uses = "bycedric/ci-expo/cli@master"
  runs = "yarn"
}

action "Login with Expo" {
  uses = "bycedric/ci-expo/cli@master"
  secrets = ["EXPO_USERNAME", "EXPO_PASSWORD"]
  needs = ["Install dependencies"]
  args = "login --username $EXPO_USERNAME --password $EXPO_PASSWORD"
}

action "Publish to Expo" {
  uses = "bycedric/ci-expo/cli@master"
  needs = ["Login with Expo"]
  args = "publish"
}