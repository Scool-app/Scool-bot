import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Button } from '../components/Button';
import { authService } from '../services/api';

export default function LoginPage() {
  const handleLogin = () => {
    window.location.href = authService.getLoginUrl();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md w-full"
      >
        <div className="glass border border-border rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-lg"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </motion.div>
            <h1 className="text-3xl font-bold text-foreground">Scool Dashboard</h1>
            <p className="text-muted-foreground mt-2 text-center">
              Manage your Discord bot with ease
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            {[
              'OAuth2 Discord Authentication',
              'Multi-server Management',
              'Advanced Configuration',
              'Real-time Statistics',
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-muted-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            className="w-full py-3 text-lg"
            icon={LogIn}
          >
            Sign in with Discord
          </Button>

          {/* Footer */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
