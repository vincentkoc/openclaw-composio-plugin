import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { execFileSync } from "node:child_process";

const INSTALL_COMMAND = "curl -fsSL https://raw.githubusercontent.com/ComposioHQ/composio/main/install.sh | bash -s -- --agent";

const composioPluginConfigSchema = {
  parse: () => ({}),
};

const composioPlugin = {
  id: "composio",
  name: "Composio",
  description: "Use the Composio CLI from OpenClaw to access 1000+ third-party tools.",
  configSchema: composioPluginConfigSchema,

  register(api: OpenClawPluginApi) {
    registerCli(api);

    api.on("before_prompt_build", () => ({
      prependSystemContext: getCliSystemPrompt(),
    }));

    api.logger.info("[composio] Loaded CLI guidance plugin. Run 'openclaw composio setup' for next steps.");
  },
};

function registerCli(api: OpenClawPluginApi): void {
  api.registerCli(
    ({ program }: { program: any }) => {
      const cmd = program
        .command("composio")
        .description("Composio CLI onboarding");

      cmd
        .command("setup")
        .description("Show Composio CLI install and login steps")
        .action(async () => {
          printSetup();
        });

      cmd
        .command("status")
        .description("Check Composio CLI install and auth status")
        .action(async () => {
          printStatus();
        });

      cmd
        .command("doctor")
        .description("Show the recommended Composio CLI workflow for OpenClaw")
        .action(async () => {
          printStatus();
          console.log("");
          printWorkflow();
        });
    },
    { commands: ["composio"] },
  );
}

function printSetup(): void {
  console.log("\nComposio now runs through the Universal CLI.\n");
  console.log("Install:");
  console.log(`  ${INSTALL_COMMAND}`);
  console.log("\nSign in:");
  console.log("  composio login");
  console.log("  composio whoami");
  console.log("\nThen use Composio from OpenClaw by asking for external app work, or run CLI commands directly.");
  console.log("For app setup: composio link <app>");
  console.log("");
}

function printStatus(): void {
  console.log("\nComposio CLI Status\n");

  try {
    const whoami = execFileSync("composio", ["whoami"], {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();

    console.log("  CLI:    installed");
    console.log("  Auth:   signed in");
    if (whoami) {
      console.log("");
      console.log(whoami);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("  CLI/Auth: not ready");
    console.log(`  Detail:   ${message.split("\n")[0]}`);
    console.log("");
    console.log("  Run:");
    console.log(`    ${INSTALL_COMMAND}`);
    console.log("    composio login");
  }
}

function printWorkflow(): void {
  console.log("Recommended OpenClaw + Composio workflow\n");
  console.log("  1. Search for the right tool:");
  console.log('     composio search "create a github issue"');
  console.log("  2. Inspect or preview inputs:");
  console.log("     composio execute GITHUB_CREATE_ISSUE --get-schema");
  console.log("     composio execute GITHUB_CREATE_ISSUE --dry-run -d '{ owner: \"acme\", repo: \"app\", title: \"Bug\" }'");
  console.log("  3. Connect the app if prompted:");
  console.log("     composio link github");
  console.log("  4. Retry the execute command.");
  console.log("");
}

function getCliSystemPrompt(): string {
  return `<composio>
Composio is available through the Composio CLI, not direct plugin-registered MCP tools.

Use Composio for external third-party services such as Gmail, Slack, GitHub, Notion, Linear, Jira, Google Calendar, Google Drive, HubSpot, and Salesforce.
Use native OpenClaw tools for local files, shell commands, browser work, and web search.

When the user asks to work with an external app:
1. Check whether the CLI is installed and signed in with \`composio whoami\`.
2. If the CLI is missing, tell the user to run:
   \`${INSTALL_COMMAND}\`
   Then run \`composio login\`.
3. If the tool slug is unknown, run \`composio search "<task>"\`.
4. If inputs are unclear, run \`composio execute <SLUG> --get-schema\` or \`--dry-run\`.
5. If an app is not connected, run \`composio link <app>\` and retry.
6. For multi-step workflows, use \`composio run\`.

For onboarding, ask what the user wants to automate, recommend 2-4 relevant apps, connect them with \`composio link <app>\`, then verify with a small \`composio execute ...\` command.

Do not claim Composio MCP tools are registered by this plugin. Route Composio work through the CLI.
</composio>`;
}

export default composioPlugin;
