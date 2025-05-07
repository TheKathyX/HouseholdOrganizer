"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Home, Plus, CheckCircle2 } from "lucide-react";

interface CleaningTask {
  id: string;
  day: string;
  task: string;
  description: string;
  completed: boolean;
}

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function CleaningRoutinePage() {
  const [tasks, setTasks] = useState<CleaningTask[]>([
    {
      id: "1",
      day: "Friday",
      task: "Clean Bedroom",
      description: "Vacuum, dust, and organize bedroom",
      completed: false,
    },
    {
      id: "2",
      day: "Saturday",
      task: "Clean Bathroom",
      description: "Clean shower, toilet, and sink",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState<
    Omit<CleaningTask, "id" | "completed">
  >({
    day: "",
    task: "",
    description: "",
  });

  const addTask = () => {
    if (newTask.task.trim() === "" || newTask.day === "") return;

    setTasks([
      ...tasks,
      {
        id: (tasks.length + 1).toString(),
        ...newTask,
        completed: false,
      },
    ]);

    setNewTask({
      day: "",
      task: "",
      description: "",
    });
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

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
              href="/cleaning-routine"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Cleaning Routine
            </Link>
            <Link
              href="/tasks"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
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
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Weekly Cleaning Routine
            </h2>
            <p className="text-muted-foreground">
              Manage your weekly cleaning schedule
            </p>
          </div>

          <div className="flex justify-end mb-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Cleaning Task</DialogTitle>
                  <DialogDescription>
                    Add a new task to your weekly cleaning routine.
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
                      <Label htmlFor="task-day">Day of Week</Label>
                      <Select
                        value={newTask.day}
                        onValueChange={(value) =>
                          setNewTask({ ...newTask, day: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a day" />
                        </SelectTrigger>
                        <SelectContent>
                          {DAYS_OF_WEEK.map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="task-name">Task Name</Label>
                      <Input
                        id="task-name"
                        placeholder="Enter task name"
                        value={newTask.task}
                        onChange={(e) =>
                          setNewTask({ ...newTask, task: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="task-description">Description</Label>
                      <Input
                        id="task-description"
                        placeholder="Enter task description"
                        value={newTask.description}
                        onChange={(e) =>
                          setNewTask({
                            ...newTask,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Task</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DAYS_OF_WEEK.map((day) => {
              const dayTasks = tasks.filter((task) => task.day === day);
              return (
                <Card key={day}>
                  <CardHeader>
                    <CardTitle>{day}</CardTitle>
                    <CardDescription>
                      {dayTasks.length} task{dayTasks.length !== 1 ? "s" : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dayTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-start justify-between gap-4 rounded-lg border p-4"
                        >
                          <div className="space-y-1">
                            <h4 className="font-medium">{task.task}</h4>
                            {task.description && (
                              <p className="text-sm text-muted-foreground">
                                {task.description}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleTaskCompletion(task.id)}
                            className={task.completed ? "text-green-500" : ""}
                          >
                            <CheckCircle2 className="h-5 w-5" />
                          </Button>
                        </div>
                      ))}
                      {dayTasks.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          No tasks scheduled
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
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
