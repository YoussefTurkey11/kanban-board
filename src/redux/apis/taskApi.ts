import { TTask } from "@/types/task";
import { api } from "../baseApi";

export const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Tasks
    getAllTasks: builder.query<
      TTask[],
      { status?: string; page: number; limit: number; search: string }
    >({
      query: ({ status, page = 1, limit = 10, search }) => {
        const params = new URLSearchParams();

        if (status) params.append("status", status);
        if (search) params.append("q", search);

        return `/tasks?${params.toString()}`;
      },
      providesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    // Get Specific Task
    getTaskById: builder.query<TTask, string>({
      query: (id) => `/tasks/${id}`,
    }),

    // Create New Task
    createNewTask: builder.mutation<TTask, Partial<TTask>>({
      query: (body) => ({
        url: `/tasks`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    // Update Task
    updateTask: builder.mutation<
      TTask,
      { id: string } & Partial<Omit<TTask, "id">>
    >({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    // Delete Task
    deleteTask: builder.mutation<TTask, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetTaskByIdQuery,
  useCreateNewTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
