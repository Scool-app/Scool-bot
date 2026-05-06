import {
  Guild,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  TextChannel,
  ChannelType,
} from 'discord.js'
import { createEmbed, Colors, Emojis } from '../utils/embeds'
import { getOrCreateConfig } from '../config/GuildConfig'

export async function onGuildCreate(guild: Guild): Promise<void> {
  console.log(`[Scool] Joined guild: ${guild.name} (${guild.id})`)

  await getOrCreateConfig(guild.id)

  const channel = guild.channels.cache
    .filter(
      (c) =>
        c.type === ChannelType.GuildText &&
        c.permissionsFor(guild.members.me!)?.has('SendMessages') === true,
    )
    .first() as TextChannel | undefined

  if (!channel) {
    console.warn(`[Scool] No writable channel found in ${guild.name}`)
    return
  }

  const embed = createEmbed(Colors.WHITE)
    .setTitle(`${Emojis.SCOOL}  Hello, I'm Scool!  ·  Bonjour, je suis Scool !`)
    .setDescription(
      'Choose the default language for this server.\n' +
        'Choisis la langue par défaut pour ce serveur.\n\n' +
        'You can always change this later with `/setup language`.\n' +
        'Tu pourras toujours modifier cela via `/setup language`.',
    )

  const btnFr = new ButtonBuilder()
    .setCustomId('welcome_lang_fr')
    .setLabel('🇫🇷  Français')
    .setStyle(ButtonStyle.Secondary)

  const btnEn = new ButtonBuilder()
    .setCustomId('welcome_lang_en')
    .setLabel('🇬🇧  English')
    .setStyle(ButtonStyle.Secondary)

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(btnFr, btnEn)

  await channel.send({ embeds: [embed], components: [row] })
}
