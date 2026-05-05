import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../utils/types";
import { createEmbed, Colors, Emojis } from "../utils/embeds";
import { getOrCreateConfig } from "../config/GuildConfig";
import { t } from "../utils/i18n";

export const soon: Command = {
  data: new SlashCommandBuilder()
    .setName("soon")
    .setDescription("Upcoming features / Fonctionnalités à venir"),

  async execute(interaction: ChatInputCommandInteraction) {
    const config = await getOrCreateConfig(interaction.guildId!);
    const lang = config.lang;

    const embed = createEmbed(Colors.WHITE)
      .setTitle(`${Emojis.SOON}  ${t(lang, "soon_title")}`)
      .setDescription(t(lang, "soon_desc"))
      .addFields({
        name: t(lang, "soon_field_planned"),
        value: t(lang, "soon_field_planned_value"),
        inline: false,
      });

    await interaction.reply({ embeds: [embed] });
  },
};