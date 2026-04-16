import type { ProjectConfig } from "@kps/types";

import type { VirtualFileSystem } from "../core/virtual-fs";
import { type TemplateData, processTemplatesFromPrefix, processSingleTemplate } from "./utils";

export async function processApiTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (config.api === "none") return;
  if (config.backend === "convex") return;

  processTemplatesFromPrefix(vfs, templates, `api/${config.api}/server`, "packages/api", config);

  const hasReactWeb = config.frontend.some((f) =>
    ["tanstack-router", "react-router", "tanstack-start", "next"].includes(f),
  );
  const hasNuxtWeb = config.frontend.includes("nuxt");
  const hasSvelteWeb = config.frontend.includes("svelte");
  const hasSolidWeb = config.frontend.includes("solid");
  const hasAstroWeb = config.frontend.includes("astro");

  if (hasReactWeb) {
    processTemplatesFromPrefix(
      vfs,
      templates,
      `api/${config.api}/web/react/base`,
      `apps/${config.frontendName}`,
      config,
    );

    const reactFramework = config.frontend.find((f) =>
      ["tanstack-router", "react-router", "tanstack-start", "next"].includes(f),
    );
    if (
      config.backend === "self" &&
      (reactFramework === "next" || reactFramework === "tanstack-start")
    ) {
      processTemplatesFromPrefix(
        vfs,
        templates,
        `api/${config.api}/fullstack/${reactFramework}`,
        `apps/${config.frontendName}`,
        config,
      );
    }
  } else if (hasNuxtWeb && config.api === "orpc") {
    if (config.backend === "self") {
      processTemplatesFromPrefix(
        vfs,
        templates,
        `api/${config.api}/fullstack/nuxt`,
        `apps/${config.frontendName}`,
        config,
      );
      // Only include vue-query from web templates, skip generic orpc.ts
      processSingleTemplate(
        vfs,
        templates,
        `api/${config.api}/web/nuxt/app/plugins/vue-query.ts`,
        `apps/${config.frontendName}/app/plugins/vue-query.ts`,
        config,
      );
    } else {
      processTemplatesFromPrefix(
        vfs,
        templates,
        `api/${config.api}/web/nuxt`,
        `apps/${config.frontendName}`,
        config,
      );
    }
  } else if (hasSvelteWeb && config.api === "orpc") {
    processTemplatesFromPrefix(
      vfs,
      templates,
      `api/${config.api}/web/svelte`,
      `apps/${config.frontendName}`,
      config,
    );
  } else if (hasSolidWeb && config.api === "orpc") {
    processTemplatesFromPrefix(
      vfs,
      templates,
      `api/${config.api}/web/solid`,
      `apps/${config.frontendName}`,
      config,
    );
  } else if (hasAstroWeb && config.api === "orpc") {
    // Always include the orpc client (handles both self and external backend)
    processTemplatesFromPrefix(
      vfs,
      templates,
      `api/${config.api}/web/astro`,
      `apps/${config.frontendName}`,
      config,
    );
    // Add fullstack API routes when backend=self
    if (config.backend === "self") {
      processTemplatesFromPrefix(
        vfs,
        templates,
        `api/${config.api}/fullstack/astro`,
        `apps/${config.frontendName}`,
        config,
      );
    }
  }
}
