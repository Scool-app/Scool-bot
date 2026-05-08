import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Globe, Bell, Shield, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { guildService } from '../services/api';
import type { GuildConfig } from '../types';

export default function ServerConfigPage() {
  const { guildId } = useParams<{ guildId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<GuildConfig | null>(null);
  const [formData, setFormData] = useState({
    lang: 'en',
    announcementChannelId: '',
    adminRoleId: '',
    logsChannelId: '',
  });

  useEffect(() => {
    const loadConfig = async () => {
      if (!guildId) return;
      try {
        const data = await guildService.getGuildConfig(guildId);
        setConfig(data);
        setFormData({
          lang: data.lang || 'en',
          announcementChannelId: data.announcementChannelId || '',
          adminRoleId: data.adminRoleId || '',
          logsChannelId: data.logsChannelId || '',
        });
      } catch (error) {
        console.error('Failed to load config:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, [guildId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guildId) return;

    setSaving(true);
    try {
      await guildService.updateGuildConfig(guildId, formData);
      // Show success notification
    } catch (error) {
      console.error('Failed to save config:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-card rounded w-1/3" />
            <div className="h-64 bg-card rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate('/servers')}
            className="mb-4"
          >
            Back to Servers
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Server Configuration</h1>
          <p className="text-muted-foreground">
            Customize how Scool behaves on this server.
          </p>
        </motion.div>

        {/* Config Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Language */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Language
              </CardTitle>
            </CardHeader>
            <CardContent>
              <select
                value={formData.lang}
                onChange={(e) => setFormData({ ...formData, lang: e.target.value })}
                className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
              <p className="text-sm text-muted-foreground mt-2">
                Choose the default language for bot responses on this server.
              </p>
            </CardContent>
          </Card>

          {/* Announcement Channel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Announcement Channel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                value={formData.announcementChannelId}
                onChange={(e) => setFormData({ ...formData, announcementChannelId: e.target.value })}
                placeholder="Channel ID"
                className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-sm text-muted-foreground mt-2">
                The channel where announcements will be sent. Enter the channel ID.
              </p>
            </CardContent>
          </Card>

          {/* Admin Role */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Admin Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                value={formData.adminRoleId}
                onChange={(e) => setFormData({ ...formData, adminRoleId: e.target.value })}
                placeholder="Role ID"
                className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-sm text-muted-foreground mt-2">
                The role that can manage bot settings. Enter the role ID.
              </p>
            </CardContent>
          </Card>

          {/* Logs Channel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Logs Channel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                value={formData.logsChannelId}
                onChange={(e) => setFormData({ ...formData, logsChannelId: e.target.value })}
                placeholder="Channel ID"
                className="w-full px-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-sm text-muted-foreground mt-2">
                The channel where bot logs will be sent. Enter the channel ID.
              </p>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/servers')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              icon={Save}
              isLoading={saving}
            >
              Save Changes
            </Button>
          </div>
        </motion.form>
      </main>
    </div>
  );
}
