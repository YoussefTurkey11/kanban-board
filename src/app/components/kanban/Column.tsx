"use client";
import { TTaskStatus } from "@/types/task";
import TaskCard from "./TaskCard";
import { useColumnTask } from "@/app/hooks/useColumnTask";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/store";
import { incrementPage, openCreateDialog } from "@/redux/slices/uiSlice";
import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";

const colorStatus = [
  {
    id: "backlog",
    color: "#134E8E",
  },
  {
    id: "in_progress",
    color: "#FFB33F",
  },
  {
    id: "review",
    color: "#8A7650",
  },
  {
    id: "done",
    color: "#237227",
  },
];

const Column = ({ status }: { status: TTaskStatus }) => {
  const { data, isLoading, hasMore } = useColumnTask(status);
  const dispatch = useAppDispatch();
  const { setNodeRef } = useDroppable({ id: status });
  const totalTasksInColumn = data?.length ?? 0;

  if (isLoading) return <div className="w-5 h-5 animate-spin" />;

  return (
    <section
      ref={setNodeRef}
      className="p-5 rounded-lg bg-muted/50 border border-ring/30 min-h-175 hover:shadow-lg transition-all"
    >
      <div className="mb-5 flex items-center gap-3">
        <div
          className="h-3 w-3 rounded-full"
          style={{
            backgroundColor: colorStatus.find((c) => c.id === status)?.color,
          }}
        />
        <h3 className="uppercase text-lg">{status.replace("_", " ")}</h3>
        <p className="bg-input px-2 rounded-full">{totalTasksInColumn}</p>
      </div>

      <div className="space-y-3">
        {data?.length! > 0 ? (
          data?.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p className="text-muted-foreground">Add new task...</p>
        )}
      </div>

      <Button
        variant={"outline"}
        onClick={() => dispatch(openCreateDialog(status))}
        className="w-full cursor-pointer my-5"
      >
        <Plus size={18} /> Add Task
      </Button>

      {!data && hasMore && (
        <Button
          variant={"link"}
          onClick={() => dispatch(incrementPage(status))}
          className="w-full cursor-pointer my-5"
        >
          Load More
        </Button>
      )}
    </section>
  );
};

export default Column;
