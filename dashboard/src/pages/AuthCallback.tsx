import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const errorParam = params.get('error');

      if (errorParam) {
        setError('Authentication was denied or cancelled.');
        return;
      }

      if (!code) {
        setError('No authorization code received.');
        return;
      }

      try {
        await authService.login(code);
        navigate('/dashboard');
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('Failed to authenticate. Please try again.');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        {error ? (
          <>
            <h1 className="text-2xl font-bold text-error mb-4">Authentication Failed</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-primary rounded-lg hover:bg-primary/80 transition-colors"
            >
              Back to Login
            </button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Completing authentication...</p>
          </>
        )}
      </div>
    </div>
  );
}
