import { Component, type ReactNode } from "react";
import { Button, Paper, Title, Text } from "@mantine/core";

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Paper p="xl" withBorder style={{ maxWidth: 500, margin: '100px auto', textAlign: 'center' }}>
          <Title order={2}>Something went wrong</Title>
          <Text c="dimmed" size="sm" mt="sm">{this.state.error?.message}</Text>
          <Button mt="md" onClick={() => { this.setState({ hasError: false }); }}>
            Reload
          </Button>
        </Paper>
      );
    }
    return this.props.children;
  }
}