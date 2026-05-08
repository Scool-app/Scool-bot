import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, CreditCard, Bell, Shield, Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const settingsSections = [
    {
      title: 'Profile',
      icon: User,
      items: [
        { label: 'Username', value: user?.username || 'N/A' },
        { label: 'User ID', value: user?.id || 'N/A' },
        { label: 'Email', value: user?.email || 'Not provided' },
      ],
    },
    {
      title: 'Preferences',
      icon: Bell,
      items: [
        { label: 'Email Notifications', value: 'Enabled', type: 'toggle' },
        { label: 'Server Updates', value: 'Enabled', type: 'toggle' },
        { label: 'Language', value: 'English', type: 'select' },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { label: 'Two-Factor Auth', value: 'Disabled', type: 'toggle' },
        { label: 'Session Management', value: '1 active session', type: 'link' },
      ],
    },
  ];

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
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <section.icon className="w-5 h-5 text-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between py-3 border-b border-border last:border-0"
                      >
                        <span className="text-sm font-medium text-foreground">
                          {item.label}
                        </span>
                        {item.type === 'toggle' ? (
                          <button
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              item.value === 'Enabled' ? 'bg-success' : 'bg-accent'
                            }`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                item.value === 'Enabled' ? 'left-7' : 'left-1'
                              }`}
                            />
                          </button>
                        ) : item.type === 'select' ? (
                          <select className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                            <option>English</option>
                            <option>Français</option>
                          </select>
                        ) : item.type === 'link' ? (
                          <button className="text-sm text-primary hover:underline">
                            {item.value}
                          </button>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            {item.value}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-error/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-error">
                  <Shield className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="danger">Delete Account</Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button isLoading={loading}>Save Changes</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
