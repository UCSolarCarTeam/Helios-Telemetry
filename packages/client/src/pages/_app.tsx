import { ThemeProvider, useTheme } from "next-themes";
import type { AppProps } from "next/app";

import { EffectsProvider } from "@/components/global/EffectsProvider";
import LoadingWrapper from "@/components/global/LoadingWrapper";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create QueryClient instance once at module level
// This ensures a single instance across the entire app lifecycle
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Unused data stays in cache for 1 hour
      gcTime: 1000 * 60 * 60, // 1 hour (formerly cacheTime)
      // No automatic polling
      refetchInterval: false,
      // Don't refetch on mount if data is still fresh
      refetchOnMount: false,
      // Don't refetch on window focus (expensive ML data)
      refetchOnWindowFocus: false,
      // Retry failed requests 3 times with exponential backoff
      retry: 3,
      // Data is considered fresh for 1 hour (matches backend cache TTL)
      staleTime: 1000 * 60 * 60, // 1 hour
    },
  },
});

function AppContent({ Component, pageProps }: AppProps) {
  const { resolvedTheme } = useTheme();

  return (
    <MantineProvider
      forceColorScheme={resolvedTheme === "dark" ? "dark" : "light"}
    >
      <Notifications zIndex={1400} />
      {/* Initialize side-effect logic for Zustand store state files */}
      <EffectsProvider />
      <LoadingWrapper>
        <Component {...pageProps} />
      </LoadingWrapper>
    </MantineProvider>
  );
}
export default function App(props: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppContent {...props} />
        </ThemeProvider>
        {/* React Query DevTools - only visible in development */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
