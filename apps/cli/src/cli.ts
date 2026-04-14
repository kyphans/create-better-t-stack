import { createKpsCli } from "./index";
import { startKpsMcpServer } from "./mcp";

const [, , command, ...args] = process.argv;

if (command === "mcp") {
  if (args.includes("--help") || args.includes("-h")) {
    console.log(`Usage: create-kps mcp

Start the KPS MCP server over stdio.

This command is intended to be launched by an MCP client, for example:
  create-kps mcp`);
    process.exit(0);
  }

  await startKpsMcpServer();
} else {
  await createKpsCli().run();
}
