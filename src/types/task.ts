export type TTaskStatus = "backlog" | "in_progress" | "review" | "done";

export type TTask = {
  id: string;
  title: string;
  desc: string;
  status: TTaskStatus;
  createdAt: string;
};

export type TColumnPagination = {
  page: number;
  hasMore: boolean;
};

export type TTaskUIState = {
  search: string;
  status: Record<TTaskStatus, TColumnPagination>;
  selectedTaskId: string | null;
  isCreateDialogOpen: boolean;
  isEditDialogOpen: boolean;
  activeDragTaskId: string | null;
  createTaskStatus: TTaskStatus | null;
};
