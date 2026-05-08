import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Server, 
  Activity, 
  Clock, 
  TrendingUp,
  Bot,
  Shield,
  Settings as SettingsIcon,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Navbar } from '../components/Navbar';
import { botService, guildService } from '../services/api';
import type { BotStats, Guild } from '../types';

export default function DashboardPage() {
  const [stats, setStats] = useState<BotStats | null>(null);
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, guildsData] = await Promise.all([
          botService.getStats().catch(() => ({ totalGuilds: 0, totalUsers: 0, uptime: 0, ping: 0 })),
          guildService.getGuilds().catch(() => []),
        ]);
        setStats(statsData);
        setGuilds(guildsData.slice(0, 5));
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const statCards = [
    {
      title: 'Total Servers',
      value: stats?.totalGuilds ?? 0,
      icon: Server,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%',
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers ?? 0,
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      change: '+8%',
    },
    {
      title: 'Uptime',
      value: stats?.uptime ? formatUptime(stats.uptime) : '0h 0m',
      icon: Clock,
      color: 'from-green-500 to-emerald-500',
      change: '99.9%',
    },
    {
      title: 'Average Ping',
      value: `${stats?.ping ?? 0}ms`,
      icon: Activity,
      color: 'from-orange-500 to-red-500',
      change: '-5ms',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-card rounded w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-card rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your bot.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden group hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions & Recent Servers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent/10 transition-colors text-left">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Invite Bot</p>
                      <p className="text-sm text-muted-foreground">Add Scool to a new server</p>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent/10 transition-colors text-left">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">View Documentation</p>
                      <p className="text-sm text-muted-foreground">Learn how to use Scool</p>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent/10 transition-colors text-left">
                    <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                      <SettingsIcon className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Global Settings</p>
                      <p className="text-sm text-muted-foreground">Configure bot-wide settings</p>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Servers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Servers</CardTitle>
              </CardHeader>
              <CardContent>
                {guilds.length > 0 ? (
                  <div className="space-y-3">
                    {guilds.map((guild) => (
                      <div
                        key={guild.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10 transition-colors cursor-pointer"
                      >
                        {guild.icon ? (
                          <img
                            src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=32`}
                            alt={guild.name}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-medium">
                            {guild.name[0].toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{guild.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {guild.owner ? 'Owner' : 'Member'}
                          </p>
                        </div>
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No servers found. Invite the bot to get started!
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function formatUptime(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}
