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

// remplacer
const INVITE_URL =
  "https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands";

export const invite: Command = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Get the invite link / Obtenir le lien d'invitation"),

  async execute(interaction: ChatInputCommandInteraction) {
    const config = await getOrCreateConfig(interaction.guildId!);
    const lang = config.lang;

    const embed = createEmbed(Colors.WHITE)
      .setTitle(`${Emojis.INVITE}  ${t(lang, "invite_title")}`)
      .setDescription(t(lang, "invite_desc"));

    const button = new ButtonBuilder()
      .setLabel(t(lang, "invite_button"))
      .setURL(INVITE_URL)
      .setStyle(ButtonStyle.Link)
      .setEmoji("🎓");

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};