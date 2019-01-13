workflow "New workflow" {
  on = "push"
  resolves = ["Publish to Expo"]
}

action "Publish to Expo" {
  uses = "byCedric/ci-expo@HEAD"
  args = "publish"
}
