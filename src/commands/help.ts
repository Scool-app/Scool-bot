import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../utils/types";
import { createEmbed, Colors, Emojis } from "../utils/embeds";
import { getOrCreateConfig } from "../config/GuildConfig";
import { t } from "../utils/i18n";

export const help: Command = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List all available commands / Lister les commandes disponibles"),

  async execute(interaction: ChatInputCommandInteraction) {
    const config = await getOrCreateConfig(interaction.guildId!);
    const lang = config.lang;

    const embed = createEmbed(Colors.WHITE)
      .setTitle(`${Emojis.HELP}  ${t(lang, "help_title")}`)
      .setDescription(t(lang, "help_desc"))
      .addFields(
        {
          name: `${Emojis.DOT}  ${t(lang, "help_field_general")}`,
          value: t(lang, "help_field_general_value"),
          inline: false,
        },
        {
          name: `${Emojis.DOT}  ${t(lang, "help_field_admin")}`,
          value: t(lang, "help_field_admin_value"),
          inline: false,
        }
      );

    await interaction.reply({ embeds: [embed] });
  },
};