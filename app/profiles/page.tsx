"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, Plus } from "lucide-react";
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

export default function ProfilesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample family members data
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: "1",
      name: "John Smith",
      role: "Parent",
      tasksCompleted: 15,
      avatar: "/placeholder.svg?height=100&width=100",
      favoriteColor: "#FF5733",
    },
    {
      id: "2",
      name: "Sarah Smith",
      role: "Parent",
      tasksCompleted: 18,
      avatar: "/placeholder.svg?height=100&width=100",
      favoriteColor: "#33FF57",
    },
    {
      id: "3",
      name: "Emma Smith",
      role: "Child",
      tasksCompleted: 8,
      avatar: "/placeholder.svg?height=100&width=100",
      favoriteColor: "#3357FF",
    },
    {
      id: "4",
      name: "Michael Smith",
      role: "Child",
      tasksCompleted: 6,
      avatar: "/placeholder.svg?height=100&width=100",
      favoriteColor: "#F333FF",
    },
  ]);

  // State for new family member
  const [newMember, setNewMember] = useState({
    name: "",
    role: "Child",
    avatar: "/placeholder.svg?height=100&width=100",
    favoriteColor: "#FF5733",
  });

  // Add new family member
  const addFamilyMember = () => {
    if (newMember.name.trim() === "") return;

    setFamilyMembers([
      ...familyMembers,
      {
        id: (familyMembers.length + 1).toString(),
        ...newMember,
        tasksCompleted: 0,
      },
    ]);

    // Reset form
    setNewMember({
      name: "",
      role: "Child",
      avatar: "/placeholder.svg?height=100&width=100",
      favoriteColor: "#FF5733",
    });

    // Close dialog
    setIsDialogOpen(false);
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
              className="text-sm font-medium transition-colors hover:text-primary"
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
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
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
              Family Profiles
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Family Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Family Member</DialogTitle>
                  <DialogDescription>
                    Create a new profile for a family member.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addFamilyMember();
                  }}
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="member-name">Name</Label>
                      <Input
                        id="member-name"
                        placeholder="Enter family member's name"
                        value={newMember.name}
                        onChange={(e) =>
                          setNewMember({ ...newMember, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="member-role">Role</Label>
                      <Select
                        value={newMember.role}
                        onValueChange={(value) =>
                          setNewMember({ ...newMember, role: value })
                        }
                      >
                        <SelectTrigger id="member-role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Parent">Parent</SelectItem>
                          <SelectItem value="Child">Child</SelectItem>
                          <SelectItem value="Grandparent">
                            Grandparent
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="member-color">Favorite Color</Label>
                      <div className="flex gap-2 items-center">
                        <Input
                          id="member-color"
                          type="color"
                          value={newMember.favoriteColor}
                          onChange={(e) =>
                            setNewMember({
                              ...newMember,
                              favoriteColor: e.target.value,
                            })
                          }
                          className="w-12 h-12 p-1"
                        />
                        <span className="text-sm text-muted-foreground">
                          {newMember.favoriteColor}
                        </span>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Family Member</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {familyMembers.map((member) => (
              <Card
                key={member.id}
                className="overflow-hidden transition-colors"
                style={{
                  backgroundColor: `${member.favoriteColor}15`,
                  borderColor: `${member.favoriteColor}30`,
                }}
              >
                <CardHeader className="p-0">
                  <div className="bg-muted h-24 flex items-center justify-center">
                    <Image
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      width={100}
                      height={100}
                      className="rounded-full border-4 border-background"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                  <div className="mt-4 text-sm">
                    <p>Tasks Completed: {member.tasksCompleted}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t p-4">
                  <Link href={`/profiles/${member.id}`} className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
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
