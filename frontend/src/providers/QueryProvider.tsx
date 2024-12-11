import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const STALE_TIME = 1000 * 60 * 5; // 5 minutes

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: STALE_TIME,
			retry: 1,
		},
	},
});

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
