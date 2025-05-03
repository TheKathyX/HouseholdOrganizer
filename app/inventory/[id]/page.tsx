"use client";

import { useState } from "react";
import Link from "next/link";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Home, Plus, ArrowLeft } from "lucide-react";

interface Item {
  id: string;
  name: string;
  quantity: number;
  location: string;
  notes: string;
  lastUpdated: string;
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  // Sample items data - in a real app, this would come from an API
  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      name: "Sample Item 1",
      quantity: 2,
      location: "Cabinet A",
      notes: "Good condition",
      lastUpdated: "2024-03-20",
    },
    {
      id: "2",
      name: "Sample Item 2",
      quantity: 1,
      location: "Shelf B",
      notes: "Needs replacement",
      lastUpdated: "2024-03-19",
    },
  ]);

  // State for new item
  const [newItem, setNewItem] = useState<Omit<Item, "id" | "lastUpdated">>({
    name: "",
    quantity: 1,
    location: "",
    notes: "",
  });

  // Add new item
  const addItem = () => {
    if (newItem.name.trim() === "") return;

    setItems([
      ...items,
      {
        id: (items.length + 1).toString(),
        ...newItem,
        lastUpdated: new Date().toISOString().split("T")[0],
      },
    ]);

    // Reset form
    setNewItem({
      name: "",
      quantity: 1,
      location: "",
      notes: "",
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
          <div className="flex items-center gap-4 mb-6">
            <Link href="/inventory">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Category Items
              </h2>
              <p className="text-muted-foreground">
                Manage items in this category
              </p>
            </div>
          </div>

          <div className="flex justify-end mb-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Item</DialogTitle>
                  <DialogDescription>
                    Add a new item to this category.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addItem();
                  }}
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="item-name">Item Name</Label>
                      <Input
                        id="item-name"
                        placeholder="Enter item name"
                        value={newItem.name}
                        onChange={(e) =>
                          setNewItem({ ...newItem, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="item-quantity">Quantity</Label>
                      <Input
                        id="item-quantity"
                        type="number"
                        min="1"
                        value={newItem.quantity}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            quantity: parseInt(e.target.value),
                          })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="item-location">Location</Label>
                      <Input
                        id="item-location"
                        placeholder="Enter item location"
                        value={newItem.location}
                        onChange={(e) =>
                          setNewItem({ ...newItem, location: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="item-notes">Notes</Label>
                      <Input
                        id="item-notes"
                        placeholder="Enter any notes"
                        value={newItem.notes}
                        onChange={(e) =>
                          setNewItem({ ...newItem, notes: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Item</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>Quantity: {item.quantity}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Location:</span>{" "}
                      {item.location}
                    </p>
                    {item.notes && (
                      <p className="text-sm">
                        <span className="font-medium">Notes:</span> {item.notes}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Last updated: {item.lastUpdated}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {items.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No items in this category yet.
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
