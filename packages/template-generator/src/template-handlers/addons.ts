import type { ProjectConfig } from "@kps/types";

import type { VirtualFileSystem } from "../core/virtual-fs";
import { type TemplateData, processTemplatesFromPrefix } from "./utils";

export async function processAddonTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.addons || config.addons.length === 0) return;

  for (const addon of config.addons) {
    if (addon === "none") continue;

    // monorepo tools are handled programmatically by generators
    if (addon === "turborepo" || addon === "nx") continue;

    if (addon === "pwa") {
      if (config.frontend.includes("next")) {
        processTemplatesFromPrefix(
          vfs,
          templates,
          "addons/pwa/apps/web/next",
          `apps/${config.frontendName}`,
          config,
        );
      } else if (
        config.frontend.some((f) => ["tanstack-router", "react-router", "solid"].includes(f))
      ) {
        processTemplatesFromPrefix(
          vfs,
          templates,
          "addons/pwa/apps/web/vite",
          `apps/${config.frontendName}`,
          config,
        );
      }
      continue;
    }

    processTemplatesFromPrefix(vfs, templates, `addons/${addon}`, "", config);
  }
}
