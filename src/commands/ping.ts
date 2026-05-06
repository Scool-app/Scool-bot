import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { Command } from '../utils/types'
import { createEmbed, Colors, Emojis } from '../utils/embeds'
import { getOrCreateConfig } from '../config/GuildConfig'
import { t } from '../utils/i18n'

export const ping: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Check Scool's latency / Vérifier la latence de Scool"),

  async execute(interaction: ChatInputCommandInteraction) {
    const config = await getOrCreateConfig(interaction.guildId!)
    const lang = config.lang

    const sent = await interaction.reply({ content: '...', fetchReply: true })
    const apiLatency = sent.createdTimestamp - interaction.createdTimestamp
    const wsLatency = Math.round(interaction.client.ws.ping)

    const embed = createEmbed(Colors.WHITE)
      .setTitle(`${Emojis.PING}  ${t(lang, 'ping_title')}`)
      .setDescription(t(lang, 'ping_desc', wsLatency, apiLatency))

    await interaction.editReply({ content: '', embeds: [embed] })
  },
}
