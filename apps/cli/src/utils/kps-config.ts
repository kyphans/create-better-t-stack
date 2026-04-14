import path from "node:path";

import type { KpsConfig } from "@kps/types";
import fs from "fs-extra";
import { applyEdits, modify, parse } from "jsonc-parser";

const KPS_CONFIG_FILE = "kps.jsonc";

/**
 * Reads the KPS configuration file from the project directory.
 */
export async function readKpsConfig(projectDir: string): Promise<KpsConfig | null> {
  try {
    const configPath = path.join(projectDir, KPS_CONFIG_FILE);

    if (!(await fs.pathExists(configPath))) {
      return null;
    }

    const configContent = await fs.readFile(configPath, "utf-8");
    const config = parse(configContent) as KpsConfig;
    return config;
  } catch {
    return null;
  }
}

/**
 * Updates specific fields in the KPS configuration file.
 */
export async function updateKpsConfig(
  projectDir: string,
  updates: Partial<
    Pick<
      KpsConfig,
      "addons" | "addonOptions" | "dbSetupOptions" | "webDeploy" | "serverDeploy"
    >
  >,
): Promise<void> {
  try {
    const configPath = path.join(projectDir, KPS_CONFIG_FILE);

    if (!(await fs.pathExists(configPath))) {
      return;
    }

    let content = await fs.readFile(configPath, "utf-8");

    // Apply each update using jsonc-parser's modify (preserves comments)
    for (const [key, value] of Object.entries(updates)) {
      const edits = modify(content, [key], value, { formattingOptions: { tabSize: 2 } });
      content = applyEdits(content, edits);
    }

    await fs.writeFile(configPath, content, "utf-8");
  } catch {
    // Silent failure
  }
}
