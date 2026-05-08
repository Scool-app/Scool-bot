import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Settings, Trash2, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { guildService } from '../services/api';
import type { Guild } from '../types';

export default function ServersPage() {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadGuilds = async () => {
      try {
        const data = await guildService.getGuilds();
        setGuilds(data);
      } catch (error) {
        console.error('Failed to load guilds:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGuilds();
  }, []);

  const filteredGuilds = guilds.filter((guild) =>
    guild.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID || ''}&permissions=8&integration_type=0&scope=bot+applications.commands`;

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Servers</h1>
              <p className="text-muted-foreground">
                Manage your bot configurations across all servers.
              </p>
            </div>
            <Button icon={Plus} onClick={() => window.open(inviteUrl, '_blank')}>
              Add Bot to Server
            </Button>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search servers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Servers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-card rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredGuilds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuilds.map((guild, index) => (
              <motion.div
                key={guild.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      {guild.icon ? (
                        <img
                          src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=64`}
                          alt={guild.name}
                          className="w-16 h-16 rounded-xl group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold">
                          {guild.name[0].toUpperCase()}
                        </div>
                      )}
                      {guild.owner && (
                        <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                          Owner
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2 truncate">
                      {guild.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      ID: {guild.id}
                    </p>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                        icon={Settings}
                        onClick={() => window.location.href = `/servers/${guild.id}`}
                      >
                        Configure
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={ExternalLink}
                        onClick={() => window.open(`https://discord.com/channels/${guild.id}`, '_blank')}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchTerm ? 'No servers found' : 'No servers yet'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm
                  ? 'Try adjusting your search terms.'
                  : 'Add the bot to a server to get started.'}
              </p>
              {!searchTerm && (
                <Button icon={Plus} onClick={() => window.open(inviteUrl, '_blank')}>
                  Add Bot to Server
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
