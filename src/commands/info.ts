import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../utils/types";
import { createEmbed, Colors, Emojis } from "../utils/embeds";
import { getOrCreateConfig } from "../config/GuildConfig";
import { t } from "../utils/i18n";

const VERSION = "1.0.4";
const TSVERSION = "10.9.2"

export const info: Command = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Information about Scool / Informations sur Scool"),

  async execute(interaction: ChatInputCommandInteraction) {
    const config = await getOrCreateConfig(interaction.guildId!);
    const lang = config.lang;

    const embed = createEmbed(Colors.WHITE)
      .setTitle(`${Emojis.INFO}  ${t(lang, "info_title")}`)
      .setDescription(t(lang, "info_desc"))
      .addFields(
        {
          name: t(lang, "info_field_version"),
          value: `\`v${VERSION}\``,
          inline: true,
        },
        {
          name: t(lang, "info_field_tsversion"),
          value: `\`v${TSVERSION}\``,
          inline: true,
        },
        {
          name: t(lang, "info_field_status"),
          value: t(lang, "info_field_status_value"),
          inline: true,
        },
        {
          name: t(lang, "info_field_website"),
          value: t(lang, "info_field_website_value"),
          inline: false,
        }
      );

    await interaction.reply({ embeds: [embed] });
  },
};