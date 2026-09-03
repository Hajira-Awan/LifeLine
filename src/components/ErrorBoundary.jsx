import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("LifeLine ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-rose-600/20 border border-rose-500/50 flex items-center justify-center text-rose-500 font-mono text-2xl font-bold">
            !
          </div>
          <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
          <p className="text-xs text-rose-300 max-w-md font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
            {this.state.error?.toString()}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs shadow-lg hover:from-rose-600 hover:to-pink-700"
          >
            Reload LifeLine Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
