import React from "react";
import ErrorPage from "../../pages/errors/ErrorPage";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          title="Application Error"
          message="Krishna Wisdom encountered an unexpected issue."
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;