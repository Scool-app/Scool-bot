import { Interaction, ButtonInteraction, PermissionFlagsBits } from "discord.js";
import { Collection } from "discord.js";
import { Command } from "../utils/types";
import { successEmbed, errorEmbed, Colors, Emojis } from "../utils/embeds";
import { getOrCreateConfig } from "../config/GuildConfig";
import { t } from "../utils/i18n";

export function createInteractionHandler(commands: Collection<string, Command>) {
  return async function onInteractionCreate(interaction: Interaction): Promise<void> {

    if (interaction.isChatInputCommand()) {
      const command = commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(`[Scool] Error in /${interaction.commandName}:`, err);
        const config = await getOrCreateConfig(interaction.guildId ?? "");
        const embed = errorEmbed(t(config.lang, "error_generic"));

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ embeds: [embed], ephemeral: true });
        } else {
          await interaction.reply({ embeds: [embed], ephemeral: true });
        }
      }
      return;
    }


    if (interaction.isButton()) {
      await handleButton(interaction as ButtonInteraction);
    }
  };
}

async function handleButton(interaction: ButtonInteraction): Promise<void> {
  const { customId, guildId } = interaction;

  if (!guildId) return;


  if (customId === "welcome_lang_fr" || customId === "welcome_lang_en") {
    const isAdmin = interaction.memberPermissions?.has(PermissionFlagsBits.Administrator);

    if (!isAdmin) {
      const config = await getOrCreateConfig(guildId);
      const embed = errorEmbed(t(config.lang, "setup_no_permission"));
      return void (await interaction.reply({ embeds: [embed], ephemeral: true }));
    }

    const newLang = customId === "welcome_lang_fr" ? "fr" : "en";
    const config = await getOrCreateConfig(guildId);
    config.lang = newLang;
    config.setupDone = true;
    await config.save();

    const langName = newLang === "fr" ? "Français" : "English";
    const embed = successEmbed(
      t(newLang, "setup_lang_updated"),
      t(newLang, "setup_lang_value", langName)
    );


    await interaction.update({ embeds: [interaction.message.embeds[0]], components: [] });
    await interaction.followUp({ embeds: [embed], ephemeral: true });
  }
}