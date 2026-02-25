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
import { useCreateNewTaskMutation } from "@/redux/apis/taskApi";
import { closeCreateDialog } from "@/redux/slices/uiSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";

export function CreateTaskDialog() {
  const isOpen = useAppSelector(
    (state: RootState) => state.uiSlice.isCreateDialogOpen,
  );
  const dispatch = useAppDispatch();
  const [createTask] = useCreateNewTaskMutation();
  const status = useAppSelector(
    (state: RootState) => state.uiSlice.createTaskStatus,
  );
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    await createTask({
      title,
      desc,
      status: status!,
      createdAt: new Date().toISOString(),
    }).unwrap();

    dispatch(closeCreateDialog());
    setTitle("");
    setDesc("");
  };

  const handleReset = () => {
    setTitle("");
    setDesc("");
    dispatch(closeCreateDialog());
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(closeCreateDialog())}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
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
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
