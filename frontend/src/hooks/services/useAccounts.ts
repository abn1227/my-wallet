import { QueryClient, type QueryKey, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { accountService } from '@/services/AccountService';
import { Account } from '@/types/account';

export const accountKeys = {
	all: ['accounts'] as QueryKey,
	lists: () => [...accountKeys.all, 'list'] as QueryKey,
	detail: (id: string) => [...accountKeys.all, 'detail', id] as QueryKey,
};

const invalidateAccountQueries = (queryClient: QueryClient) => {
	queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
};

export const useAccounts = () => {
	return useQuery({
		queryKey: accountKeys.lists(),
		queryFn: async () => {
			const response = await accountService.list();

			return response.data;
		},
	});
};

export const useCreateAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (newAccount: Account) => accountService.create(newAccount),
		onSuccess: () => invalidateAccountQueries(queryClient),
	});
};

export const useUpdateAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<Account> }) => accountService.update(id, data),
		onSuccess: () => invalidateAccountQueries(queryClient),
	});
};

export const useDeleteAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => accountService.delete(id),
		onSuccess: () => invalidateAccountQueries(queryClient),
	});
};
