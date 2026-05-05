import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
} from "discord.js";
import { Command } from "../utils/types";
import { createEmbed, successEmbed, errorEmbed, Colors, Emojis } from "../utils/embeds";
import { getOrCreateConfig } from "../config/GuildConfig";
import { t } from "../utils/i18n";

export const setup: Command = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Configure Scool for this server / Configurer Scool pour ce serveur")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((sub) =>
      sub
        .setName("language")
        .setDescription("Set the bot language / Définir la langue du bot")
        .addStringOption((opt) =>
          opt
            .setName("lang")
            .setDescription("Choose a language / Choisir une langue")
            .setRequired(true)
            .addChoices(
              { name: "Français", value: "fr" },
              { name: "English", value: "en" }
            )
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("channel")
        .setDescription("Set the announcement channel / Définir le salon d'annonces")
        .addChannelOption((opt) =>
          opt
            .setName("channel")
            .setDescription("Announcement channel")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("role")
        .setDescription("Set the Scool admin role / Définir le rôle admin Scool")
        .addRoleOption((opt) =>
          opt.setName("role").setDescription("Admin role").setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("logs")
        .setDescription("Set the logs channel / Définir le salon de logs")
        .addChannelOption((opt) =>
          opt
            .setName("channel")
            .setDescription("Logs channel")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("view")
        .setDescription("View current configuration / Voir la configuration actuelle")
    ),

  async execute(interaction: ChatInputCommandInteraction) {

    if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
      const config = await getOrCreateConfig(interaction.guildId!);
      const embed = errorEmbed(t(config.lang, "setup_no_permission"));
      return void (await interaction.reply({ embeds: [embed], ephemeral: true }));
    }

    const config = await getOrCreateConfig(interaction.guildId!);
    const lang = config.lang;
    const sub = interaction.options.getSubcommand();


    if (sub === "language") {
      const newLang = interaction.options.getString("lang", true) as "fr" | "en";
      config.lang = newLang;
      config.setupDone = true;
      await config.save();

      const embed = successEmbed(
        t(newLang, "setup_lang_updated"),
        t(newLang, "setup_lang_value", newLang === "fr" ? "Français" : "English")
      );
      return void (await interaction.reply({ embeds: [embed], ephemeral: true }));
    }


    if (sub === "channel") {
      const channel = interaction.options.getChannel("channel", true);
      config.announcementChannelId = channel.id;
      await config.save();

      const embed = successEmbed(
        t(lang, "setup_channel_updated"),
        t(lang, "setup_channel_value", `<#${channel.id}>`)
      );
      return void (await interaction.reply({ embeds: [embed], ephemeral: true }));
    }


    if (sub === "role") {
      const role = interaction.options.getRole("role", true);
      config.adminRoleId = role.id;
      await config.save();

      const embed = successEmbed(
        t(lang, "setup_role_updated"),
        t(lang, "setup_role_value", `<@&${role.id}>`)
      );
      return void (await interaction.reply({ embeds: [embed], ephemeral: true }));
    }


    if (sub === "logs") {
      const channel = interaction.options.getChannel("channel", true);
      config.logsChannelId = channel.id;
      await config.save();

      const embed = successEmbed(
        t(lang, "setup_logs_updated"),
        t(lang, "setup_logs_value", `<#${channel.id}>`)
      );
      return void (await interaction.reply({ embeds: [embed], ephemeral: true }));
    }


    if (sub === "view") {
      const channelStr = config.announcementChannelId
        ? `<#${config.announcementChannelId}>`
        : "—";
      const roleStr = config.adminRoleId ? `<@&${config.adminRoleId}>` : "—";
      const logsStr = config.logsChannelId ? `<#${config.logsChannelId}>` : "—";
      const langStr = config.lang === "fr" ? "Français" : "English";

      const embed = createEmbed(Colors.WHITE)
        .setTitle(`${Emojis.SETUP}  ${t(lang, "setup_summary_title")}`)
        .setDescription(t(lang, "setup_summary", langStr, channelStr, roleStr, logsStr));

      return void (await interaction.reply({ embeds: [embed], ephemeral: true }));
    }
  },
};