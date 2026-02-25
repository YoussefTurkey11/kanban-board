"use client";
import { useGetAllTasksQuery } from "@/redux/apis/taskApi";
import { LayoutDashboard } from "lucide-react";

const Logo = () => {
  const { data } = useGetAllTasksQuery({
    page: 1,
    limit: 1000,
    search: "",
  });
  const totalTasks = data?.length ?? 0;

  return (
    <div className="flex items-center gap-2">
      <div className="p-2 rounded-md bg-chart-3">
        <LayoutDashboard size={20} color="var(--background)" />
      </div>
      <div>
        <h1 className="text-xl font-bold uppercase">kanban board</h1>
        <p className="text-muted-foreground text-sm">{totalTasks} tasks</p>
      </div>
    </div>
  );
};

export default Logo;
