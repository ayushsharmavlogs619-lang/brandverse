'use client';

import { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://ai-receptionist-prod.ayushsharmavlogs619.workers.dev';

interface OAuthStatus {
  connected: boolean;
  status: string;
  googleAccountEmail?: string;
  calendarId?: string;
}

interface Calendar {
  id: string;
  summary: string;
  description?: string;
  accessRole: string;
  primary: boolean;
}

export default function DashboardPage() {
  const [clientId, setClientId] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const [oauthStatus, setOAuthStatus] = useState<OAuthStatus | null>(null);
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCalendar, setSelectedCalendar] = useState('');

  // Check for OAuth callback params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oauthStatus = urlParams.get('oauth');
    const email = urlParams.get('email');
    const message = urlParams.get('message');

    if (oauthStatus === 'success') {
      setError('');
      // Clear URL params
      window.history.replaceState({}, '', '/dashboard');
    } else if (oauthStatus === 'error') {
      setError(message || 'OAuth connection failed');
      window.history.replaceState({}, '', '/dashboard');
    }

    // Load saved session
    const savedClientId = localStorage.getItem('nexus_client_id');
    const savedSessionToken = localStorage.getItem('nexus_session_token');
    if (savedClientId && savedSessionToken) {
      setClientId(savedClientId);
      setSessionToken(savedSessionToken);
      fetchOAuthStatus(savedClientId, savedSessionToken);
    }
  }, []);

  const fetchOAuthStatus = async (cid: string, token: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/${cid}/oauth/status?session_token=${token}`);
      if (response.ok) {
        const data = await response.json();
        setOAuthStatus(data);
        if (data.calendarId) {
          setSelectedCalendar(data.calendarId);
        }
      }
    } catch (err) {
      console.error('Failed to fetch OAuth status:', err);
    }
  };

  const createSession = async () => {
    if (!clientId) {
      setError('Please enter a Client ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/dashboard/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      const data = await response.json();
      setSessionToken(data.sessionToken);
      localStorage.setItem('nexus_client_id', clientId);
      localStorage.setItem('nexus_session_token', data.sessionToken);
      await fetchOAuthStatus(clientId, data.sessionToken);
    } catch (err) {
      setError('Failed to create session. Please check your Client ID.');
    } finally {
      setLoading(false);
    }
  };

  const connectGoogleCalendar = async () => {
    if (!clientId || !sessionToken) {
      setError('Please create a session first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, sessionToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate OAuth URL');
      }

      const data = await response.json();
      window.location.href = data.authUrl;
    } catch (err) {
      setError('Failed to start OAuth flow. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCalendars = async () => {
    if (!clientId || !sessionToken) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/${clientId}/oauth/calendars?session_token=${sessionToken}`);
      if (!response.ok) {
        throw new Error('Failed to fetch calendars');
      }

      const data = await response.json();
      setCalendars(data.calendars);
    } catch (err) {
      setError('Failed to fetch calendars. Please reconnect Google Calendar.');
    } finally {
      setLoading(false);
    }
  };

  const selectCalendar = async (calendarId: string) => {
    if (!clientId || !sessionToken) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/${clientId}/oauth/select-calendar?session_token=${sessionToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calendarId }),
      });

      if (!response.ok) {
        throw new Error('Failed to select calendar');
      }

      setSelectedCalendar(calendarId);
      await fetchOAuthStatus(clientId, sessionToken);
    } catch (err) {
      setError('Failed to select calendar. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const disconnect = async () => {
    if (!clientId || !sessionToken) return;

    if (!confirm('Are you sure you want to disconnect Google Calendar? This will stop appointment booking.')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/${clientId}/oauth/disconnect?session_token=${sessionToken}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to disconnect');
      }

      setOAuthStatus(null);
      setCalendars([]);
      setSelectedCalendar('');
    } catch (err) {
      setError('Failed to disconnect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Nexus Dashboard</h1>
          <p className="text-slate-400">Manage your AI receptionist calendar integration</p>
        </div>

        {/* Session Setup */}
        {!sessionToken && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Setup Session</h2>
            <div className="flex gap-4">
              <input
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="Enter your Client ID"
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={createSession}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Session'}
              </button>
            </div>
          </div>
        )}

        {/* OAuth Status */}
        {sessionToken && oauthStatus && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Google Calendar Integration
            </h2>

            {oauthStatus.connected ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Connected</span>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
                  <div>
                    <span className="text-slate-400 text-sm">Google Account:</span>
                    <p className="font-medium">{oauthStatus.googleAccountEmail}</p>
                  </div>
                  {selectedCalendar && (
                    <div>
                      <span className="text-slate-400 text-sm">Booking Calendar:</span>
                      <p className="font-medium">{calendars.find(c => c.id === selectedCalendar)?.summary || selectedCalendar}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={fetchCalendars}
                    disabled={loading}
                    className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Change Calendar'}
                  </button>
                  <button
                    onClick={disconnect}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-red-400">
                  <XCircle className="w-5 h-5" />
                  <span className="font-medium">Not Connected</span>
                </div>

                <p className="text-slate-400 text-sm">
                  Connect your Google Calendar so Nexus can check availability and book appointments automatically.
                </p>

                <button
                  onClick={connectGoogleCalendar}
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Connect Google Calendar'}
                </button>

                {oauthStatus.status === 'reconnect_required' && (
                  <div className="flex items-start gap-2 text-amber-400 text-sm bg-amber-400/10 border border-amber-400/20 rounded-lg p-3">
                    <AlertCircle className="w-4 h-4 mt-0.5" />
                    <p>Your Google Calendar connection needs to be reconnected. Please click the button above.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Calendar Selection */}
        {sessionToken && calendars.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Select Booking Calendar</h2>
            <div className="space-y-2">
              {calendars.map((calendar) => (
                <button
                  key={calendar.id}
                  onClick={() => selectCalendar(calendar.id)}
                  disabled={loading}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedCalendar === calendar.id
                      ? 'bg-indigo-600/20 border-indigo-500'
                      : 'bg-slate-900/50 border-slate-600 hover:border-slate-500'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{calendar.summary}</p>
                      {calendar.primary && <span className="text-xs text-slate-400">Primary calendar</span>}
                    </div>
                    {selectedCalendar === calendar.id && (
                      <CheckCircle className="w-5 h-5 text-indigo-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
