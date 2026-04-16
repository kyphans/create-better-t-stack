import { text } from "@clack/prompts";

import { DEFAULT_CONFIG } from "../constants";

export async function getFrontendNameChoice(providedName?: string, hasFrontend: boolean = true) {
  if (providedName || !hasFrontend) {
    return providedName || DEFAULT_CONFIG.frontendName;
  }

  const result = await text({
    message: "What should be the name of the frontend directory?",
    placeholder: DEFAULT_CONFIG.frontendName,
    defaultValue: DEFAULT_CONFIG.frontendName,
    validate: (value) => {
      if (!value) return;
      if (/[^a-zA-Z0-9-_]/.test(value)) return "Name contains invalid characters";
      return;
    },
  });

  return (result as string) || DEFAULT_CONFIG.frontendName;
}

export async function getBackendNameChoice(providedName?: string, hasBackend: boolean = true) {
  if (providedName || !hasBackend) {
    return providedName || DEFAULT_CONFIG.backendName;
  }

  const result = await text({
    message: "What should be the name of the backend directory?",
    placeholder: DEFAULT_CONFIG.backendName,
    defaultValue: DEFAULT_CONFIG.backendName,
    validate: (value) => {
      if (!value) return;
      if (/[^a-zA-Z0-9-_]/.test(value)) return "Name contains invalid characters";
      return;
    },
  });

  return (result as string) || DEFAULT_CONFIG.backendName;
}
