import type { KpsConfig, ProjectConfig } from "@kps/types";

import type { VirtualFileSystem } from "./core/virtual-fs";

const KPS_CONFIG_FILE = "kps.jsonc";

/**
 * Writes the KPS configuration file to the VFS (for new project creation).
 * This is browser-safe as it only writes to VFS, not the real filesystem.
 */
export function writeKpsConfigToVfs(
  vfs: VirtualFileSystem,
  projectConfig: ProjectConfig,
  version: string,
  reproducibleCommand?: string,
): void {
  const kpsConfig: KpsConfig = {
    version,
    createdAt: new Date().toISOString(),
    reproducibleCommand,
    addonOptions: projectConfig.addonOptions,
    dbSetupOptions: projectConfig.dbSetupOptions,
    database: projectConfig.database,
    orm: projectConfig.orm,
    backend: projectConfig.backend,
    runtime: projectConfig.runtime,
    frontend: projectConfig.frontend,
    addons: projectConfig.addons,
    examples: projectConfig.examples,
    auth: projectConfig.auth,
    payments: projectConfig.payments,
    packageManager: projectConfig.packageManager,
    dbSetup: projectConfig.dbSetup,
    api: projectConfig.api,
    webDeploy: projectConfig.webDeploy,
    serverDeploy: projectConfig.serverDeploy,
  };

  const baseContent = {
    $schema: "https://r2.kps.pqky.dev/schema.json",
    ...kpsConfig,
  };

  const jsonContent = JSON.stringify(baseContent, null, 2);

  const addCommand =
    projectConfig.packageManager === "npm"
      ? "npx create-kps add"
      : projectConfig.packageManager === "pnpm"
        ? "pnpm dlx create-kps add"
        : "bun create kps add";

  const finalContent = `// KPS
//
// Website: https://kps.pqky.dev/
// Stack Builder: https://kps.pqky.dev/new
// Analytics: https://kps.pqky.dev/analytics
// Showcase: https://kps.pqky.dev/showcase
// Sponsor: https://github.com/sponsors/kyphans
//
// Add new addons with: ${addCommand}
// This file is safe to delete

${jsonContent}`;

  vfs.writeFile(KPS_CONFIG_FILE, finalContent);
}
