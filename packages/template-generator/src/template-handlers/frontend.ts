import type { ProjectConfig } from "@kps/types";

import type { VirtualFileSystem } from "../core/virtual-fs";
import { type TemplateData, processTemplatesFromPrefix } from "./utils";

export async function processFrontendTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  const hasReactWeb = config.frontend.some((f) =>
    ["tanstack-router", "react-router", "tanstack-start", "next"].includes(f),
  );
  const hasNuxtWeb = config.frontend.includes("nuxt");
  const hasSvelteWeb = config.frontend.includes("svelte");
  const hasSolidWeb = config.frontend.includes("solid");
  const hasAstroWeb = config.frontend.includes("astro");
  const hasNativeBare = config.frontend.includes("native-bare");
  const hasNativeUniwind = config.frontend.includes("native-uniwind");
  const hasUnistyles = config.frontend.includes("native-unistyles");
  const isConvex = config.backend === "convex";

  if (hasReactWeb || hasNuxtWeb || hasSvelteWeb || hasSolidWeb || hasAstroWeb) {
    if (hasReactWeb) {
      processTemplatesFromPrefix(
        vfs,
        templates,
        "frontend/react/web-base",
        `apps/${config.frontendName}`,
        config,
      );

      const reactFramework = config.frontend.find((f) =>
        ["tanstack-router", "react-router", "tanstack-start", "next"].includes(f),
      );
      if (reactFramework) {
        processTemplatesFromPrefix(
          vfs,
          templates,
          `frontend/react/${reactFramework}`,
          `apps/${config.frontendName}`,
          config,
        );
      }
    } else if (hasNuxtWeb) {
      processTemplatesFromPrefix(
        vfs,
        templates,
        "frontend/nuxt",
        `apps/${config.frontendName}`,
        config,
      );
    } else if (hasSvelteWeb) {
      processTemplatesFromPrefix(
        vfs,
        templates,
        "frontend/svelte",
        `apps/${config.frontendName}`,
        config,
      );
    } else if (hasSolidWeb) {
      processTemplatesFromPrefix(
        vfs,
        templates,
        "frontend/solid",
        `apps/${config.frontendName}`,
        config,
      );
    } else if (hasAstroWeb) {
      processTemplatesFromPrefix(
        vfs,
        templates,
        "frontend/astro",
        `apps/${config.frontendName}`,
        config,
      );
    }
  }

  if (hasNativeBare || hasNativeUniwind || hasUnistyles) {
    processTemplatesFromPrefix(vfs, templates, "frontend/native/base", "apps/native", config);

    if (hasNativeBare) {
      processTemplatesFromPrefix(vfs, templates, "frontend/native/bare", "apps/native", config);
    } else if (hasNativeUniwind) {
      processTemplatesFromPrefix(vfs, templates, "frontend/native/uniwind", "apps/native", config);
    } else if (hasUnistyles) {
      processTemplatesFromPrefix(
        vfs,
        templates,
        "frontend/native/unistyles",
        "apps/native",
        config,
      );
    }

    if (!isConvex && (config.api === "trpc" || config.api === "orpc")) {
      processTemplatesFromPrefix(vfs, templates, `api/${config.api}/native`, "apps/native", config);
    }
  }
}
