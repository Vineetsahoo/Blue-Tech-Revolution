import  { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleGoBack = () => {
    window.history.back();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-red-100"
          >
            <div className="mb-6 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md"></div>
                <div className="relative p-4 bg-red-100 text-red-600 rounded-full">
                  <AlertTriangle className="h-10 w-10" />
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Something went wrong</h2>
            <p className="text-gray-600 mb-6 text-center">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            
            {this.state.errorInfo && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mb-6 overflow-auto max-h-40 p-4 bg-gray-100 rounded-lg text-xs font-mono text-gray-700"
              >
                <pre>{this.state.errorInfo.componentStack}</pre>
              </motion.div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleReload}
                className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reload Page
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleGoHome}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="h-4 w-4" />
                Go Home
              </motion.button>
            </div>
            
            <motion.button
              whileHover={{ x: -2 }}
              onClick={this.handleGoBack}
              className="mt-4 text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center w-full gap-1"
            >
              <ArrowLeft className="h-3 w-3" />
              Go Back
            </motion.button>
            
            <p className="mt-6 text-xs text-gray-500 text-center">
              If this issue persists, please contact our support team.
            </p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}