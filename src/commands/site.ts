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


const SITE_URL =
  "https://scool.qzz.io";

export const site: Command = {
  data: new SlashCommandBuilder()
    .setName("site")
    .setDescription("The official site of Scool / Le site officiel de Scool"),

  async execute(interaction: ChatInputCommandInteraction) {
    const config = await getOrCreateConfig(interaction.guildId!);
    const lang = config.lang;

    const embed = createEmbed(Colors.WHITE)
      .setTitle(`${Emojis.SITE}  ${t(lang, "site_title")}`)
      .setDescription(t(lang, "site_desc"));

    const linkBtn = new ButtonBuilder()
      .setLabel(t(lang, "site_button"))
      .setURL(SITE_URL)
      .setStyle(ButtonStyle.Link)
      .setEmoji("🌐");

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(linkBtn);

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};