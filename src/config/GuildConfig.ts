import mongoose, { Schema, Document } from 'mongoose'
import { Lang } from '../utils/i18n'

export interface IGuildConfig extends Document {
  guildId: string
  lang: Lang
  announcementChannelId: string | null
  adminRoleId: string | null
  logsChannelId: string | null
  setupDone: boolean
  createdAt: Date
  updatedAt: Date
}

const GuildConfigSchema = new Schema<IGuildConfig>(
  {
    guildId: { type: String, required: true, unique: true },
    lang: { type: String, enum: ['fr', 'en'], default: 'en' },
    announcementChannelId: { type: String, default: null },
    adminRoleId: { type: String, default: null },
    logsChannelId: { type: String, default: null },
    setupDone: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const GuildConfig = mongoose.model<IGuildConfig>(
  'GuildConfig',
  GuildConfigSchema,
)

export async function getOrCreateConfig(
  guildId: string,
): Promise<IGuildConfig> {
  let config = await GuildConfig.findOne({ guildId })
  if (!config) {
    config = await GuildConfig.create({ guildId })
  }
  return config
}
