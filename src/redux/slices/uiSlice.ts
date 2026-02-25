import { TTaskStatus, TTaskUIState } from "@/types/task";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TTaskUIState = {
  search: "",
  status: {
    backlog: { page: 1, hasMore: true },
    in_progress: { page: 1, hasMore: true },
    review: { page: 1, hasMore: true },
    done: { page: 1, hasMore: true },
  },
  selectedTaskId: null,
  isCreateDialogOpen: false,
  isEditDialogOpen: false,
  activeDragTaskId: null,
  createTaskStatus: null,
};

const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    // Search
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },

    // Pagination
    setPage(state, action: PayloadAction<{ case: TTaskStatus; page: number }>) {
      state.status[action.payload.case].page = action.payload.page;
    },

    incrementPage(state, action: PayloadAction<TTaskStatus>) {
      state.status[action.payload].page += 1;
    },

    setHasMore(
      state,
      action: PayloadAction<{ case: TTaskStatus; hasMore: boolean }>,
    ) {
      state.status[action.payload.case].hasMore = action.payload.hasMore;
    },

    resetColumn(state, action: PayloadAction<TTaskStatus>) {
      state.status[action.payload] = {
        page: 1,
        hasMore: true,
      };
    },

    // Task Selection
    setSelectedTask(state, action: PayloadAction<string | null>) {
      state.selectedTaskId = action.payload;
    },

    // Dialog Control
    openCreateDialog(state, action: PayloadAction<TTaskStatus>) {
      state.isCreateDialogOpen = true;
      state.createTaskStatus = action.payload;
    },

    closeCreateDialog(state) {
      state.isCreateDialogOpen = false;
      state.createTaskStatus = null;
    },

    openEditDialog(state) {
      state.isEditDialogOpen = true;
    },

    closeEditDialog(state) {
      state.isEditDialogOpen = false;
    },

    // Drag Status
    setActiveDragTask(state, action: PayloadAction<string | null>) {
      state.activeDragTaskId = action.payload;
    },
  },
});

export const {
  setSearch,
  setPage,
  incrementPage,
  setHasMore,
  resetColumn,
  setSelectedTask,
  openCreateDialog,
  closeCreateDialog,
  openEditDialog,
  closeEditDialog,
  setActiveDragTask,
} = uiSlice.actions;

export default uiSlice.reducer;
