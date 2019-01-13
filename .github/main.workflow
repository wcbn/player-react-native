workflow "New workflow" {
  on = "push"
  resolves = ["Publish to Expo"]
}

action "Install dependencies" {
  uses = "dctalbot/ci-expo/cli@master"
  runs = "npm"
  args = "ci"
}

action "Login with Expo" {
  uses = "dctalbot/ci-expo/cli@master"
  secrets = ["EXPO_USERNAME", "EXPO_PASSWORD"]
  needs = ["Install dependencies"]
  args = "login --username $EXPO_USERNAME --password $EXPO_PASSWORD"
}

action "Publish to Expo" {
  uses = "dctalbot/ci-expo/cli@master"
  args = "publish"
  needs = ["Login with Expo"]
}
