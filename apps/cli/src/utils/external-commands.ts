export function shouldSkipExternalCommands(): boolean {
  return process.env.KPS_SKIP_EXTERNAL_COMMANDS === "1" || process.env.KPS_TEST_MODE === "1";
}
