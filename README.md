# Composio for OpenClaw

Use the Composio CLI with OpenClaw to access 1000+ third-party tools: Gmail, Slack, GitHub, Notion, Linear, Jira, HubSpot, Salesforce, Google Drive, and more.

This package is intentionally small. It exists as an OpenClaw marketplace/plugin entry that points agents and users to the Composio CLI. The old direct MCP plugin path is no longer the recommended integration.

## Install the Composio CLI

```bash
curl -fsSL https://raw.githubusercontent.com/ComposioHQ/composio/main/install.sh | bash -s -- --agent
```

Then sign in:

```bash
composio login
composio whoami
```

## Optional: Install the OpenClaw Plugin

Install this plugin if you want OpenClaw to show Composio onboarding and CLI guidance:

```bash
openclaw plugins install @composio/openclaw-plugin
```

Restart OpenClaw after installing.

## How to Use Composio

Start with the CLI:

```bash
composio search "create a github issue"
composio execute GITHUB_CREATE_AN_ISSUE --get-schema
composio execute GITHUB_CREATE_AN_ISSUE --dry-run -d '{ owner: "acme", repo: "app", title: "Bug report" }'
```

If the CLI says an app is not connected, link it and retry:

```bash
composio link github
composio execute GITHUB_GET_THE_AUTHENTICATED_USER -d '{}'
```

For multi-step workflows, use `composio run`:

```bash
composio run '
  const me = await execute("GITHUB_GET_THE_AUTHENTICATED_USER");
  console.log(me);
'
```

## Onboarding Flow

For first-time users, OpenClaw should guide them through:

1. Check CLI install and auth with `composio whoami`.
2. If needed, run the install command above and `composio login`.
3. Ask what they want to automate.
4. Recommend 2-4 apps, then connect each one with `composio link <app>`.
5. Verify the connection with a small `composio execute ...` command.

Common verification commands:

```bash
composio execute GITHUB_GET_THE_AUTHENTICATED_USER -d '{}'
composio execute GMAIL_FETCH_EMAILS -d '{ max_results: 1 }'
composio execute SLACK_LIST_CHANNELS -d '{}'
composio execute NOTION_SEARCH_NOTION_PAGE -d '{ query: "" }'
composio execute LINEAR_LIST_LINEAR_TEAMS -d '{}'
```

## OpenClaw Helper Commands

After installing this plugin:

```bash
openclaw composio setup    # Print CLI install and login steps
openclaw composio status   # Check whether the CLI is installed and signed in
openclaw composio doctor   # Show the recommended OpenClaw + Composio flow
```

## Links

- [Composio CLI docs](https://docs.composio.dev/docs/cli)
- [Composio Dashboard](https://app.composio.dev)
