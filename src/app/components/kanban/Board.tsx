"use client";
import { TTaskStatus } from "@/types/task";
import Column from "./Column";
import { CreateTaskDialog } from "./CreateTaskDialog";
import EditTaskDialog from "./EditTaskDialog";
import { useUpdateTaskMutation } from "@/redux/apis/taskApi";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const columns: TTaskStatus[] = ["backlog", "in_progress", "review", "done"];

const Board = () => {
  const [updateTask] = useUpdateTaskMutation();

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TTaskStatus;

    await updateTask({
      id: taskId,
      status: newStatus,
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-5 p-5 md:py-5 container mx-auto overflow-x-auto">
        {columns.map((status) => (
          <Column key={status} status={status} />
        ))}
        <CreateTaskDialog />
        <EditTaskDialog />
      </div>
    </DndContext>
  );
};

export default Board;
