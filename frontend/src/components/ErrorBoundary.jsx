import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="text-4xl font-heading text-indigo dark:text-ivory">
            Something went wrong
          </h1>
          <p className="text-indigo/70 dark:text-ivory/60 font-body">
            Please refresh the page or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-indigo px-6 py-3 text-sm text-ivory font-body font-medium hover:bg-indigo-light transition"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
