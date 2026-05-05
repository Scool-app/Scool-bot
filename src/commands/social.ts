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


const GHUB = "https://github.com/scool-app";
const ADOUCHE = "https://github.com/adouche-js";
const ALEXIS = "https://github.com/6lxsdev"

export const social: Command = {
  data: new SlashCommandBuilder()
    .setName("social")
    .setDescription("Our socials links / Nos liens sociaux"),

  async execute(interaction: ChatInputCommandInteraction) {
    const config = await getOrCreateConfig(interaction.guildId!);
    const lang = config.lang;

    const embed = createEmbed(Colors.WHITE)
      .setTitle(`${Emojis.GHUB}  ${t(lang, "social_title")}`)
      .setDescription(t(lang, "social_desc"));

    const button = new ButtonBuilder()
      .setLabel("GitHub")
      .setURL(GHUB)
      .setStyle(ButtonStyle.Link)
      .setEmoji("🌐");

    const button1 = new ButtonBuilder()
      .setLabel("adouche-js")
      .setURL(ADOUCHE)
      .setStyle(ButtonStyle.Link)
      .setEmoji("🎓");

    const button2 = new ButtonBuilder()
      .setLabel("6lxsdev")
      .setURL(ALEXIS)
      .setStyle(ButtonStyle.Link)
      .setEmoji("📱");

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button, button1, button2);

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};