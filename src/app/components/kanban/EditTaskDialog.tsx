"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} from "@/redux/apis/taskApi";
import { closeEditDialog } from "@/redux/slices/uiSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";

const EditTaskDialog = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state: RootState) => state.uiSlice.isEditDialogOpen,
  );
  const selectedId = useAppSelector(
    (state: RootState) => state.uiSlice.selectedTaskId,
  );

  const [updateTask] = useUpdateTaskMutation();

  const { data: currentTask } = useGetTaskByIdQuery(selectedId!, {
    skip: !selectedId,
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDesc(currentTask.desc);
    }
  }, [currentTask]);

  const handleSubmit = async () => {
    if (!selectedId) return;

    await updateTask({
      id: selectedId,
      title,
      desc,
    });

    dispatch(closeEditDialog());
  };

  const handleReset = () => {
    setTitle("");
    setDesc("");
    dispatch(closeEditDialog());
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(closeEditDialog())}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Task description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={handleReset}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
