import 'dotenv/config'
import { Client, GatewayIntentBits, Collection } from 'discord.js'
import mongoose from 'mongoose'
import { Command } from './utils/types'
import { ping } from './commands/ping'
import { info } from './commands/info'
import { help } from './commands/help'
import { soon } from './commands/soon'
import { invite } from './commands/invite'
import { setup } from './commands/setup'
import { social } from './commands/social'
import { site } from './commands/site'
import { onGuildCreate } from './events/guildCreate'
import { createInteractionHandler } from './events/interactionCreate'

const { DISCORD_TOKEN, CLIENT_ID, MONGODB_URI } = process.env
if (!DISCORD_TOKEN || !CLIENT_ID || !MONGODB_URI) {
  console.error(
    '[Scool] Missing required environment variables. Check your .env file.',
  )
  process.exit(1)
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
})

const commands = new Collection<string, Command>()
;[ping, info, help, soon, invite, setup, social, site].forEach((cmd) => {
  commands.set(cmd.data.name, cmd)
})

client.once('ready', (c) => {
  console.log(`\n  Scool is online — logged in as ${c.user.tag}`)
  console.log(`  Serving ${c.guilds.cache.size} guild(s)\n`)
  client.user?.setPresence({
    status: 'dnd',
    activities: [
      {
        name: 'scoolapp.fr',
        type: 3,
      },
    ],
  })
})

client.on('guildCreate', onGuildCreate)
client.on('interactionCreate', createInteractionHandler(commands))

;(async () => {
  try {
    console.log('[Scool] Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('[Scool] MongoDB connected.')

    await client.login(DISCORD_TOKEN)
  } catch (err) {
    console.error('[Scool] Startup error:', err)
    process.exit(1)
  }
})()
