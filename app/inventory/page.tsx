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
  Home,
  Plus,
  Box,
  ChefHat,
  Bath,
  Bed,
  Sofa,
  Tv,
  WashingMachine,
} from "lucide-react";

export default function InventoryPage() {
  // Sample inventory categories data
  const [categories, setCategories] = useState([
    {
      id: "1",
      name: "Kitchen",
      items: 25,
      icon: ChefHat,
      color: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: "2",
      name: "Bathroom",
      items: 15,
      icon: Bath,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "3",
      name: "Bedroom",
      items: 20,
      icon: Bed,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "4",
      name: "Living Room",
      items: 18,
      icon: Sofa,
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "5",
      name: "Electronics",
      items: 12,
      icon: Tv,
      color: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      id: "6",
      name: "Laundry",
      items: 8,
      icon: WashingMachine,
      color: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
  ]);

  // State for new category
  const [newCategory, setNewCategory] = useState({
    name: "",
    icon: ChefHat,
    color: "bg-orange-100",
    iconColor: "text-orange-600",
  });

  // Add new category
  const addCategory = () => {
    if (newCategory.name.trim() === "") return;

    setCategories([
      ...categories,
      {
        id: (categories.length + 1).toString(),
        name: newCategory.name,
        items: 0,
        icon: newCategory.icon,
        color: newCategory.color,
        iconColor: newCategory.iconColor,
      },
    ]);

    // Reset form
    setNewCategory({
      name: "",
      icon: ChefHat,
      color: "bg-orange-100",
      iconColor: "text-orange-600",
    });
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
              className="text-sm font-medium transition-colors hover:text-primary"
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
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Inventory Categories
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    Create a new inventory category.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addCategory();
                  }}
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category-name">Name</Label>
                      <Input
                        id="category-name"
                        placeholder="Enter category name"
                        value={newCategory.name}
                        onChange={(e) =>
                          setNewCategory({
                            ...newCategory,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Category</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div
                      className={`${category.color} h-24 flex items-center justify-center`}
                    >
                      <Icon className={`h-16 w-16 ${category.iconColor}`} />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-center">
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>Category</CardDescription>
                    <div className="mt-4 text-sm">
                      <p>Items: {category.items}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t p-4">
                    <Link href={`/inventory/${category.id}`} className="w-full">
                      <Button variant="outline" size="sm" className="w-full">
                        View Items
                      </Button>
                    </Link>
                  </CardFooter>
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
