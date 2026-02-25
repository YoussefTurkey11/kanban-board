"use client";
import { useGetAllTasksQuery } from "@/redux/apis/taskApi";
import { setHasMore } from "@/redux/slices/uiSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { TTaskStatus } from "@/types/task";
import { useEffect } from "react";
import { useDebounce } from "./useDebounce";

export const useColumnTask = (status: TTaskStatus) => {
  const dispatch = useAppDispatch();
  const { page, hasMore } = useAppSelector(
    (state: RootState) => state.uiSlice.status[status],
  );
  const search = useAppSelector((state: RootState) => state.uiSlice.search);
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isFetching } = useGetAllTasksQuery({
    status,
    page,
    limit: 5,
    search: debouncedSearch,
  });

  useEffect(() => {
    if (data && data.length < 5) {
      dispatch(setHasMore({ case: status, hasMore: false }));
    }
  }, [data]);

  return { data, isLoading, isFetching, hasMore };
};
