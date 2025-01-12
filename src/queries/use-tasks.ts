import API from "@/lib/axios-instance";
import { queryClient } from "@/lib/query-client";
import { Task } from "@prisma/client";
import { toast } from "sonner";

import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

export const useTasks = () => {
    return useQuery<Task[], Error>({
        queryKey: ["tasks"],
        queryFn: async () => {
            const response = await API.get<Task[]>(`/tasks`);
            return response.data;
        },
        staleTime: 5000,
        placeholderData: keepPreviousData,
    });
};

export const useCreateTask = () => {
    return useMutation<
        Task,
        Error,
        Omit<Task, "id" | "status" | "userId" | "createdAt" | "updatedAt">
    >({
        mutationFn: async (
            newTask: Omit<
                Task,
                "id" | "status" | "userId" | "createdAt" | "updatedAt"
            >
        ) => {
            const response = await API.post<Task>(`/tasks`, newTask);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("Task created successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to create task");
        },
    });
};

export const useDeleteTask = () => {
    return useMutation<unknown, Error, string>({
        mutationFn: async (taskId: string) => {
            const response = await API.delete<unknown>(`/tasks/${taskId}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("Task deleted successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to delete task");
        },
    });
};

export const useUpdateStatus = () => {
    return useMutation<Task, Error, { taskId: string; status: string }>({
        mutationFn: async ({ taskId, status }) => {
            const response = await API.patch<Task>(
                `/tasks/${taskId}/set-status`,
                {
                    status,
                }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("Task status updated successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to update task status");
        },
    });
};
