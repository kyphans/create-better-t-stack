import path from "node:path";

import { Result } from "better-result";
import fs from "fs-extra";

import { readKpsConfig } from "../../utils/kps-config";

export async function detectProjectConfig(projectDir: string) {
  const result = await Result.tryPromise({
    try: async () => {
      const kpsConfig = await readKpsConfig(projectDir);
      if (kpsConfig) {
        return {
          projectDir,
          projectName: path.basename(projectDir),
          addonOptions: kpsConfig.addonOptions,
          dbSetupOptions: kpsConfig.dbSetupOptions,
          database: kpsConfig.database,
          orm: kpsConfig.orm,
          backend: kpsConfig.backend,
          runtime: kpsConfig.runtime,
          frontend: kpsConfig.frontend,
          addons: kpsConfig.addons,
          examples: kpsConfig.examples,
          auth: kpsConfig.auth,
          payments: kpsConfig.payments,
          packageManager: kpsConfig.packageManager,
          dbSetup: kpsConfig.dbSetup,
          api: kpsConfig.api,
          webDeploy: kpsConfig.webDeploy,
          serverDeploy: kpsConfig.serverDeploy,
        };
      }

      return null;
    },
    catch: () => null,
  });

  return result.isOk() ? result.value : null;
}

export async function isKpsProject(projectDir: string): Promise<boolean> {
  const result = await Result.tryPromise({
    try: () => fs.pathExists(path.join(projectDir, "kps.jsonc")),
    catch: () => false,
  });

  return result.isOk() ? result.value : false;
}
