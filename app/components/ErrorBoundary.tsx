'use client';

import { Component, ReactNode, ErrorInfo as ReactErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorDiagnostics {
  timestamp: string;
  error_message: string;
  error_stack: string | undefined;
  component_stack: string | null | undefined;
  location: string;
  user_agent: string;
  platform: string;
  ready_state: string;
  notification_api: boolean;
  service_worker: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ReactErrorInfo | null;
  diagnostics?: ErrorDiagnostics | null;
}

/**
 * GLOBAL ERROR BOUNDARY
 * Catches all React errors and prevents white screen of death
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ReactErrorInfo) {
    // Log error to console (in production, send to error tracking service)
    console.error('Error Boundary caught an error:', error, errorInfo);

    // Capture diagnostic information for debugging
    const diagnostics: ErrorDiagnostics = {
      timestamp: new Date().toISOString(),
      error_message: error.message,
      error_stack: error.stack,
      component_stack: errorInfo.componentStack,
      location: typeof window !== 'undefined' ? window.location.href : 'N/A',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
      platform: typeof navigator !== 'undefined' ? navigator.platform : 'N/A',
      ready_state: typeof document !== 'undefined' ? document.readyState : 'N/A',
      notification_api: typeof window !== 'undefined' && typeof window.Notification !== 'undefined',
      service_worker: typeof navigator !== 'undefined' && typeof navigator.serviceWorker !== 'undefined',
    };

    this.setState({ errorInfo, diagnostics });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-white text-xl font-bold mb-3">Something went wrong</h2>
            <p className="text-zinc-400 text-sm mb-6">
              We encountered an unexpected error. This has been logged and our team will look into it.
            </p>
            {this.state.error && (
              <details className="text-left mb-6">
                <summary className="text-zinc-500 text-xs cursor-pointer hover:text-zinc-400">
                  Error details (tap to expand)
                </summary>
                <pre className="mt-2 text-xs text-red-400 bg-black/50 p-3 rounded overflow-auto max-h-64 text-left whitespace-pre-wrap break-all">
                  {this.state.diagnostics ? (
                    <>
                      Timestamp: {this.state.diagnostics.timestamp}
                      Error: {this.state.diagnostics.error_message}
                      Stack: {this.state.diagnostics.error_stack}
                      Component Stack: {this.state.diagnostics.component_stack}
                      Location: {this.state.diagnostics.location}
                      User Agent: {this.state.diagnostics.user_agent}
                      Platform: {this.state.diagnostics.platform}
                      Ready State: {this.state.diagnostics.ready_state}
                      Notification API: {this.state.diagnostics.notification_api ? 'Yes' : 'No'}
                      Service Worker: {this.state.diagnostics.service_worker ? 'Yes' : 'No'}
                    </>
                  ) : (
                    this.state.error.message
                  )}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}