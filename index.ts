import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { execFileSync } from "node:child_process";

const INSTALL_COMMAND =
  "curl -fsSL https://composio.dev/install | bash -s -- --agent";

const composioPluginConfigSchema = {
  parse: () => ({}),
};

const composioPlugin = {
  id: "composio",
  name: "Composio",
  description:
    "Use the Composio CLI from OpenClaw to access 1000+ third-party tools.",
  configSchema: composioPluginConfigSchema,

  register(api: OpenClawPluginApi) {
    registerCli(api);

    api.on("before_prompt_build", () => ({
      prependSystemContext: getCliSystemPrompt(),
    }));

    api.logger.info(
      "[composio] Loaded CLI guidance plugin. Run 'openclaw composio setup' for next steps.",
    );
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
          console.log("");
          attemptUpgrade();
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
  console.log(
    "\nThen use Composio from OpenClaw by asking for external app work, or run CLI commands directly.",
  );
  console.log("For app setup: composio link <app>");
  console.log("");
}

function isCliInstalled(): boolean {
  try {
    execFileSync("composio", ["--version"], {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return true;
  } catch {
    return false;
  }
}

function getWhoamiOutput(): string | null {
  // `composio whoami` exits 0 with empty stdout when logged out, so the
  // exit code alone is not a reliable signal — we have to inspect stdout.
  try {
    const out = execFileSync("composio", ["whoami"], {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out.length > 0 ? out : null;
  } catch {
    return null;
  }
}

function printStatus(): void {
  console.log("\nComposio CLI Status\n");

  if (!isCliInstalled()) {
    console.log("  CLI:  not installed");
    console.log("");
    console.log("  Install:");
    console.log(`    ${INSTALL_COMMAND}`);
    console.log("    composio login");
    return;
  }

  console.log("  CLI:  installed");

  const whoami = getWhoamiOutput();
  if (!whoami) {
    console.log("  Auth: not signed in");
    console.log("");
    console.log("  Run: composio login");
    return;
  }

  console.log("  Auth: signed in");
  try {
    const parsed = JSON.parse(whoami) as {
      email?: string;
      default_org_name?: string;
    };
    if (parsed.email) console.log(`  User: ${parsed.email}`);
    if (parsed.default_org_name)
      console.log(`  Org:  ${parsed.default_org_name}`);
  } catch {
    console.log("");
    console.log(whoami);
  }
}

function printWorkflow(): void {
  // Defer to the CLI's own `--help` so guidance stays in sync with the
  // installed CLI version instead of going stale in this plugin.
  let help: string;
  try {
    help = execFileSync("composio", ["--help"], {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return;
  }

  console.log(help.trimEnd());
  console.log("");
  console.log("Targeted examples:");
  console.log("  composio execute GITHUB_CREATE_AN_ISSUE --get-schema");
  console.log(
    '  composio execute GITHUB_CREATE_AN_ISSUE --dry-run -d \'{ owner: "acme", repo: "app", title: "Bug" }\'',
  );
  console.log("");
}

function attemptUpgrade(): void {
  if (!isCliInstalled()) {
    return;
  }

  console.log("Running composio upgrade...\n");

  try {
    execFileSync("composio", ["upgrade"], {
      stdio: "inherit",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("");
    console.log("composio upgrade failed:");
    console.log(`  ${message.split("\n")[0]}`);
    console.log("");
    printReinstallHelp();
  }
}

function getCliPath(): string | null {
  try {
    return execFileSync("which", ["composio"], {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

function printReinstallHelp(): void {
  const cliPath = getCliPath();

  console.log("Try a clean reinstall:\n");

  if (cliPath) {
    console.log(`  # Current install: ${cliPath}`);
  }
  console.log("  # 1. Remove the install directory");
  console.log("  rm -rf ~/.composio");
  console.log("");
  console.log("  # 2. Strip the '# Composio CLI' block from your shell rc:");
  console.log("  #    zsh:  ~/.zshrc");
  console.log("  #    bash: ~/.bashrc or ~/.bash_profile");
  console.log("  #    fish: ~/.config/fish/config.fish");
  console.log("");
  console.log("  # 3. Open a new terminal, then reinstall:");
  console.log(`  ${INSTALL_COMMAND}`);
  console.log("  composio login");
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
