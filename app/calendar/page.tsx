"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { CalendarDays, Home, Plus } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  createdBy: string;
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());

  // Sample events data
  const events: Event[] = [
    {
      id: 1,
      title: "Family Dinner",
      date: "2023-10-16",
      time: "18:00",
      description: "Weekly family dinner",
      createdBy: "Sarah Smith",
    },
    {
      id: 2,
      title: "Soccer Practice",
      date: "2023-10-18",
      time: "16:00",
      description: "Michael's soccer practice",
      createdBy: "John Smith",
    },
    {
      id: 3,
      title: "Dentist Appointment",
      date: "2023-10-20",
      time: "14:30",
      description: "Emma's dentist appointment",
      createdBy: "Sarah Smith",
    },
    {
      id: 4,
      title: "Movie Night",
      date: "2023-10-21",
      time: "20:00",
      description: "Family movie night",
      createdBy: "John Smith",
    },
  ];

  // Format date to YYYY-MM-DD for comparison
  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  // Get events for the selected date
  const selectedDateEvents = events.filter(
    (event) => event.date === formatDate(date)
  );

  // Get upcoming events (next 7 days)
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= nextWeek;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Tasks
            </Link>
            <Link
              href="/calendar"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Calendar
            </Link>
            <Link
              href="/cleaning-routine"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Routine
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Family Calendar
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>
                    Create a new event for the family calendar.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="event-title">Event Title</Label>
                    <Input id="event-title" placeholder="Enter event title" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="event-date">Date</Label>
                    <Input id="event-date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="event-time">Time</Label>
                    <Input id="event-time" type="time" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="event-description">Description</Label>
                    <Input
                      id="event-description"
                      placeholder="Enter event description"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="event-creator">Created By</Label>
                    <Select>
                      <SelectTrigger id="event-creator">
                        <SelectValue placeholder="Select family member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Smith</SelectItem>
                        <SelectItem value="emma">Emma Smith</SelectItem>
                        <SelectItem value="michael">Michael Smith</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Event</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6 md:grid-cols-[4fr_400px] h-[calc(100vh-13rem)]">
            <Card className="h-full">
              <CardHeader className="pb-4">
                <CardTitle>Calendar</CardTitle>
                <CardDescription>View and manage family events</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center h-[calc(100%-5rem)] p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  className="rounded-md border w-full h-full p-8 [&_.rdp-caption]:text-2xl [&_.rdp-cell]:text-xl [&_.rdp-head_th]:text-xl [&_.rdp-button]:w-20 [&_.rdp-button]:h-20 [&_.rdp-nav]:h-20 [&_.rdp-nav_button]:w-20 [&_.rdp-nav_button]:h-20 [&_.rdp]:h-full [&_.rdp-months]:h-full [&_.rdp-month]:h-full [&_.rdp-table]:h-full [&_.rdp-table]:w-full"
                />
              </CardContent>
            </Card>

            <div className="space-y-6 h-full overflow-y-auto">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {date.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                  <CardDescription>
                    {selectedDateEvents.length} events scheduled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-4">
                      {selectedDateEvents.map((event) => (
                        <div
                          key={event.id}
                          className="border-l-4 border-primary pl-4 py-2"
                        >
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {event.time} • {event.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Added by {event.createdBy}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <CalendarDays className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        No events scheduled for this day
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex justify-between items-start"
                        >
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {event.time}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {new Date(event.date).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" }
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-sm text-muted-foreground">
                        No upcoming events
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
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
