import "dotenv/config";
import { REST, Routes } from "discord.js";

import { ping } from "./commands/ping";
import { info } from "./commands/info";
import { help } from "./commands/help";
import { soon } from "./commands/soon";
import { invite } from "./commands/invite";
import { setup } from "./commands/setup";

const { DISCORD_TOKEN, CLIENT_ID } = process.env;
if (!DISCORD_TOKEN || !CLIENT_ID) {
  console.error("[Scool] Missing DISCORD_TOKEN or CLIENT_ID in .env");
  process.exit(1);
}

const commands = [ping, info, help, soon, invite, setup].map((cmd) =>
  cmd.data.toJSON()
);

const rest = new REST().setToken(DISCORD_TOKEN);

(async () => {
  try {
    console.log(`[Scool] Deploying ${commands.length} slash commands...`);

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log("[Scool] Slash commands deployed successfully.");
  } catch (err) {
    console.error("[Scool] Error deploying commands:", err);
  }
})();