"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckSquare, Home, Plus, User } from "lucide-react";

interface Task {
  id: number;
  title: string;
  assignedTo: string;
  dueDate: string;
  status: "pending" | "completed";
  recurring: string;
  category: string;
  room: string;
}

interface TasksByAssignee {
  [key: string]: Task[];
}

export default function TasksPage() {
  // Sample tasks data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Take out trash",
      assignedTo: "John Smith",
      dueDate: "2023-10-16",
      status: "pending",
      recurring: "weekly",
      category: "Household",
      room: "Kitchen",
    },
    {
      id: 2,
      title: "Wash dishes",
      assignedTo: "Emma Smith",
      dueDate: "2023-10-16",
      status: "completed",
      recurring: "daily",
      category: "Kitchen",
      room: "Kitchen",
    },
    {
      id: 3,
      title: "Vacuum living room",
      assignedTo: "Sarah Smith",
      dueDate: "2023-10-18",
      status: "pending",
      recurring: "weekly",
      category: "Cleaning",
      room: "Living Room",
    },
    {
      id: 4,
      title: "Mow the lawn",
      assignedTo: "Michael Smith",
      dueDate: "2023-10-20",
      status: "pending",
      recurring: "biweekly",
      category: "Yard",
      room: "Outdoor",
    },
    {
      id: 5,
      title: "Clean bathroom",
      assignedTo: "Sarah Smith",
      dueDate: "2023-10-17",
      status: "pending",
      recurring: "weekly",
      category: "Cleaning",
      room: "Bathroom",
    },
    {
      id: 6,
      title: "Do laundry",
      assignedTo: "John Smith",
      dueDate: "2023-10-19",
      status: "pending",
      recurring: "weekly",
      category: "Household",
      room: "Laundry Room",
    },
  ]);

  // State for new task
  const [newTask, setNewTask] = useState<Omit<Task, "id" | "status">>({
    title: "",
    assignedTo: "John Smith",
    dueDate: "",
    recurring: "weekly",
    category: "Household",
    room: "Kitchen",
  });

  const [filter, setFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");

  const toggleTaskStatus = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
    );
  };

  // Add new task
  const addTask = () => {
    if (newTask.title.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        ...newTask,
        status: "pending",
      },
    ]);

    // Reset form
    setNewTask({
      title: "",
      assignedTo: "John Smith",
      dueDate: "",
      recurring: "weekly",
      category: "Household",
      room: "Kitchen",
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (
      filter !== "all" &&
      filter === "completed" &&
      task.status !== "completed"
    )
      return false;
    if (filter !== "all" && filter === "pending" && task.status !== "pending")
      return false;
    if (assigneeFilter !== "all" && task.assignedTo !== assigneeFilter)
      return false;
    return true;
  });

  // Get unique assignees
  const assignees = ["all", ...new Set(tasks.map((task) => task.assignedTo))];

  // Group tasks by assignee
  const tasksByAssignee = filteredTasks.reduce<TasksByAssignee>((acc, task) => {
    if (!acc[task.assignedTo]) {
      acc[task.assignedTo] = [];
    }
    acc[task.assignedTo].push(task);
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6" />
            <h1 className="text-xl font-bold">HomeHub</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="/profiles"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Profiles
            </Link>
            <Link
              href="/inventory"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Inventory
            </Link>
            <Link
              href="/tasks"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Tasks
            </Link>
            <Link
              href="/calendar"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Calendar
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Tasks & Chores
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                  <DialogDescription>
                    Create a new task for the family.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addTask();
                  }}
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="task-title">Task Title</Label>
                      <Input
                        id="task-title"
                        placeholder="Enter task title"
                        value={newTask.title}
                        onChange={(e) =>
                          setNewTask({ ...newTask, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="task-assignee">Assigned To</Label>
                      <Select
                        value={newTask.assignedTo}
                        onValueChange={(value) =>
                          setNewTask({ ...newTask, assignedTo: value })
                        }
                      >
                        <SelectTrigger id="task-assignee">
                          <SelectValue placeholder="Select family member" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="John Smith">John Smith</SelectItem>
                          <SelectItem value="Sarah Smith">
                            Sarah Smith
                          </SelectItem>
                          <SelectItem value="Emma Smith">Emma Smith</SelectItem>
                          <SelectItem value="Michael Smith">
                            Michael Smith
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="task-due-date">Due Date</Label>
                      <Input
                        id="task-due-date"
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) =>
                          setNewTask({ ...newTask, dueDate: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="task-recurring">Recurring</Label>
                      <Select
                        value={newTask.recurring}
                        onValueChange={(value) =>
                          setNewTask({ ...newTask, recurring: value })
                        }
                      >
                        <SelectTrigger id="task-recurring">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="task-category">Category</Label>
                      <Select
                        value={newTask.category}
                        onValueChange={(value) =>
                          setNewTask({ ...newTask, category: value })
                        }
                      >
                        <SelectTrigger id="task-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Household">Household</SelectItem>
                          <SelectItem value="Kitchen">Kitchen</SelectItem>
                          <SelectItem value="Cleaning">Cleaning</SelectItem>
                          <SelectItem value="Yard">Yard</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="task-room">Room</Label>
                      <Select
                        value={newTask.room}
                        onValueChange={(value) =>
                          setNewTask({ ...newTask, room: value })
                        }
                      >
                        <SelectTrigger id="task-room">
                          <SelectValue placeholder="Select room" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Kitchen">Kitchen</SelectItem>
                          <SelectItem value="Living Room">
                            Living Room
                          </SelectItem>
                          <SelectItem value="Bathroom">Bathroom</SelectItem>
                          <SelectItem value="Bedroom">Bedroom</SelectItem>
                          <SelectItem value="Laundry Room">
                            Laundry Room
                          </SelectItem>
                          <SelectItem value="Outdoor">Outdoor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Task</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <Tabs defaultValue="all" className="mb-2" onValueChange={setFilter}>
              <TabsList>
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="House">House</TabsTrigger>
              </TabsList>
            </Tabs>

            <Tabs defaultValue="all" onValueChange={setAssigneeFilter}>
              <TabsList className="flex-wrap h-auto">
                {assignees.map((assignee) => (
                  <TabsTrigger key={assignee} value={assignee}>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {assignee === "all" ? "Everyone" : assignee}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {assigneeFilter === "all" ? (
            // Display tasks grouped by assignee
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(tasksByAssignee).map(
                ([assignee, assigneeTasks]) => (
                  <Card key={assignee} className="h-fit">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-6 pb-4 border-b">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{assignee}</h3>
                          <p className="text-sm text-muted-foreground">
                            {
                              assigneeTasks.filter(
                                (task) => task.status === "pending"
                              ).length
                            }{" "}
                            pending tasks
                          </p>
                        </div>
                      </div>
                      <div className="grid gap-4">
                        {assigneeTasks.map((task) => (
                          <div
                            key={task.id}
                            className={`p-4 rounded-lg border ${
                              task.status === "completed"
                                ? "opacity-70 bg-muted/50"
                                : "bg-card"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <Checkbox
                                  id={`task-${task.id}`}
                                  checked={task.status === "completed"}
                                  onCheckedChange={() =>
                                    toggleTaskStatus(task.id)
                                  }
                                />
                                <div>
                                  <div
                                    className={`font-medium ${
                                      task.status === "completed"
                                        ? "line-through"
                                        : ""
                                    }`}
                                  >
                                    {task.title}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Due: {task.dueDate} • {task.recurring} •{" "}
                                    {task.category} • {task.room}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {assigneeTasks.length === 0 && (
                        <div className="text-center py-6 text-muted-foreground">
                          No tasks assigned
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          ) : (
            // Display filtered assignee tasks
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{assigneeFilter}</h3>
                    <p className="text-sm text-muted-foreground">
                      {
                        filteredTasks.filter(
                          (task) => task.status === "pending"
                        ).length
                      }{" "}
                      pending tasks
                    </p>
                  </div>
                </div>
                <div className="grid gap-4">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border ${
                        task.status === "completed"
                          ? "opacity-70 bg-muted/50"
                          : "bg-card"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Checkbox
                            id={`task-${task.id}`}
                            checked={task.status === "completed"}
                            onCheckedChange={() => toggleTaskStatus(task.id)}
                          />
                          <div>
                            <div
                              className={`font-medium ${
                                task.status === "completed"
                                  ? "line-through"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Due: {task.dueDate} • {task.recurring} •{" "}
                              {task.category} • {task.room}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {filteredTasks.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    No tasks assigned
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <CheckSquare className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No tasks found</h3>
              <p className="text-muted-foreground">
                {filter === "completed"
                  ? "No completed tasks yet."
                  : assigneeFilter !== "all"
                  ? `No tasks assigned to ${assigneeFilter}`
                  : "All tasks are completed!"}
              </p>
            </div>
          )}
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} HomeHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
