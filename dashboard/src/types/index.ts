export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email?: string;
}

export interface Guild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: number;
  features: string[];
}

export interface GuildConfig {
  guildId: string;
  lang: 'fr' | 'en';
  announcementChannelId: string | null;
  adminRoleId: string | null;
  logsChannelId: string | null;
  setupDone: boolean;
}

export interface BotStats {
  totalGuilds: number;
  totalUsers: number;
  uptime: number;
  ping: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
