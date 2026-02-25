"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CSS } from "@dnd-kit/utilities";

import {
  useDeleteTaskMutation,
  useGetAllTasksQuery,
} from "@/redux/apis/taskApi";
import { openEditDialog, setSelectedTask } from "@/redux/slices/uiSlice";
import { useAppDispatch } from "@/redux/store";
import { TTask } from "@/types/task";
import { useDraggable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";

const TaskCard = ({ task }: { task: TTask }) => {
  const dispatch = useAppDispatch();
  const { data } = useGetAllTasksQuery({ page: 1, limit: 1000, search: "" });
  const [deleteTask] = useDeleteTaskMutation();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };
  const totalTasks = data?.length ?? 0;

  const handleEdit = () => {
    dispatch(setSelectedTask(task.id));
    dispatch(openEditDialog());
  };

  const handleDelete = async () => await deleteTask(task.id).unwrap();

  return (
    <Card
      ref={setNodeRef}
      className="hover:shadow-md transition relative"
      style={style}
    >
      <CardContent className="p-4 space-y-4">
        <Button
          variant={"ghost"}
          onClick={handleEdit}
          className="absolute top-5 right-5 text-2xl hover:bg-transparent cursor-pointer"
          title="Edit Task"
        >
          ...
        </Button>
        <h4
          {...attributes}
          {...listeners}
          className="text-xl font-semibold cursor-grab"
        >
          {task.title}
        </h4>
        <p className="text-sm text-muted-foreground truncate">{task.desc}</p>

        <div className="flex justify-end mx-5">
          <Trash2
            size={16}
            className="text-destructive cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
