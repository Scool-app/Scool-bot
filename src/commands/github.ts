import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import { Command } from "../utils/types";
import { createEmbed, Colors, Emojis } from "../utils/embeds";
import { getOrCreateConfig } from "../config/GuildConfig";
import { t } from "../utils/i18n";

const GHUB_URL = "https://github.com/scool-app"

export const info: Command = {
  data: new SlashCommandBuilder()
    .setName("github")
    .setDescription("Our Github / Notre Github"),

  async execute(interaction: ChatInputCommandInteraction) {
    const config = await getOrCreateConfig(interaction.guildId!);
    const lang = config.lang;

    const embed = createEmbed(Colors.WHITE)
      .setTitle(`${Emojis.GHUB}  ${t(lang, "ghub_title")}`)
      .setDescription(t(lang, "ghub_desc"))
      .addFields(
        { 
          name: `${Emojis.INVITE}  ${t(lang, "ghub_founder")}`,
          value: `\`${t(lang, "ghub_founders")}\``,
          inline: false,
        },
      )

    const button = new ButtonBuilder()
        .setLabel(t(lang, "ghub_title"))
        .setURL(GHUB_URL)
        .setStyle(ButtonStyle.Link)
        .setEmoji("💻");

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};