"use client";

import { useState, useEffect, use } from "react";
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
import Image from "next/image";

interface Item {
  id: string;
  name: string;
  quantity: number;
  location: string;
  notes: string;
  lastUpdated: string;
  expirationDate?: string;
  instructionManuals?: string[]; // Array of photo URLs
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params using React.use()
  const { id } = use(params);

  // Validate category ID
  const isValidCategoryId = (id: string) => {
    const validIds = ["1", "2", "3", "4", "5", "6"];
    return validIds.includes(id);
  };

  // Function to get category-specific items
  const getCategoryItems = (categoryId: string) => {
    if (!isValidCategoryId(categoryId)) {
      console.error("Invalid category ID:", categoryId);
      return [];
    }

    switch (categoryId) {
      case "1": // Kitchen
        return [
          {
            id: "1",
            name: "Stainless Steel Pots Set",
            quantity: 1,
            location: "Kitchen Cabinet",
            notes: "5-piece set",
            lastUpdated: "2024-03-20",
          },
          {
            id: "2",
            name: "Cutting Board Set",
            quantity: 1,
            location: "Kitchen Drawer",
            notes: "Bamboo, 3 sizes",
            lastUpdated: "2024-03-19",
          },
          {
            id: "3",
            name: "Kitchen Knife Set",
            quantity: 1,
            location: "Knife Block",
            notes: "8-piece set",
            lastUpdated: "2024-03-18",
          },
        ];
      case "2": // Bathroom
        return [
          {
            id: "1",
            name: "Bath Towel Set",
            quantity: 4,
            location: "Bathroom Cabinet",
            notes: "Cotton, 4 pieces",
            lastUpdated: "2024-03-20",
          },
          {
            id: "2",
            name: "Shower Curtain",
            quantity: 1,
            location: "Bathroom Closet",
            notes: "Waterproof",
            lastUpdated: "2024-03-19",
          },
          {
            id: "3",
            name: "Bath Mat",
            quantity: 2,
            location: "Bathroom Floor",
            notes: "Memory foam",
            lastUpdated: "2024-03-18",
          },
        ];
      case "3": // Bedroom
        return [
          {
            id: "1",
            name: "Bed Sheets Set",
            quantity: 2,
            location: "Bedroom Closet",
            notes: "Queen size, cotton",
            lastUpdated: "2024-03-20",
          },
          {
            id: "2",
            name: "Pillows",
            quantity: 4,
            location: "Bed",
            notes: "Memory foam",
            lastUpdated: "2024-03-19",
          },
          {
            id: "3",
            name: "Comforter",
            quantity: 1,
            location: "Bedroom Closet",
            notes: "Down alternative",
            lastUpdated: "2024-03-18",
          },
        ];
      case "4": // Living Room
        return [
          {
            id: "1",
            name: "Throw Pillows",
            quantity: 4,
            location: "Sofa",
            notes: "Decorative",
            lastUpdated: "2024-03-20",
          },
          {
            id: "2",
            name: "Area Rug",
            quantity: 1,
            location: "Living Room Floor",
            notes: "5x7 feet",
            lastUpdated: "2024-03-19",
          },
          {
            id: "3",
            name: "Blanket",
            quantity: 2,
            location: "Living Room Cabinet",
            notes: "Fleece",
            lastUpdated: "2024-03-18",
          },
        ];
      case "5": // Electronics
        return [
          {
            id: "1",
            name: "Smart TV",
            quantity: 1,
            location: "Living Room",
            notes: "55-inch 4K",
            lastUpdated: "2024-03-20",
            instructionManuals: [
              "/manuals/tv-manual-1.jpg",
              "/manuals/tv-manual-2.jpg",
            ],
          },
          {
            id: "2",
            name: "Washing Machine",
            quantity: 1,
            location: "Laundry Room",
            notes: "Front loading",
            lastUpdated: "2024-03-19",
            instructionManuals: ["/manuals/washer-manual.jpg"],
          },
          {
            id: "3",
            name: "Blender",
            quantity: 1,
            location: "Kitchen Counter",
            notes: "High-speed blender",
            lastUpdated: "2024-03-18",
            instructionManuals: ["/manuals/blender-manual.jpg"],
          },
          {
            id: "4",
            name: "Coffee Maker",
            quantity: 1,
            location: "Kitchen Cabinet",
            notes: "Programmable",
            lastUpdated: "2024-03-17",
            instructionManuals: ["/manuals/coffee-maker-manual.jpg"],
          },
          {
            id: "5",
            name: "Toaster",
            quantity: 1,
            location: "Kitchen Counter",
            notes: "4-slice toaster",
            lastUpdated: "2024-03-16",
            instructionManuals: ["/manuals/toaster-manual.jpg"],
          },
          {
            id: "6",
            name: "Air Fryer",
            quantity: 1,
            location: "Kitchen Cabinet",
            notes: "Digital display",
            lastUpdated: "2024-03-15",
            instructionManuals: ["/manuals/air-fryer-manual.jpg"],
          },
        ];
      case "6": // Laundry
        return [
          {
            id: "1",
            name: "Laundry Basket",
            quantity: 2,
            location: "Laundry Room",
            notes: "Plastic, collapsible",
            lastUpdated: "2024-03-20",
          },
          {
            id: "2",
            name: "Drying Rack",
            quantity: 1,
            location: "Laundry Room",
            notes: "Foldable",
            lastUpdated: "2024-03-19",
          },
          {
            id: "3",
            name: "Ironing Board",
            quantity: 1,
            location: "Laundry Room Closet",
            notes: "Adjustable height",
            lastUpdated: "2024-03-18",
          },
        ];
      default:
        return [];
    }
  };

  // Initialize items based on category with proper validation
  const [items, setItems] = useState<Item[]>(() => {
    if (!isValidCategoryId(id)) {
      console.error("Invalid category ID in params:", id);
      return [];
    }
    return getCategoryItems(id);
  });

  // State for new item with proper initialization
  const [newItem, setNewItem] = useState<Partial<Item>>({
    name: "",
    quantity: 1,
    location: "",
    notes: "",
  });

  // State for instruction manual photos
  const [instructionManuals, setInstructionManuals] = useState<string[]>([]);

  // Handle file upload with error handling
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (files) {
        const newManuals = Array.from(files).map((file) =>
          URL.createObjectURL(file)
        );
        setInstructionManuals((prev) => [...prev, ...newManuals]);
      }
    } catch (error) {
      console.error("Error handling file upload:", error);
    }
  };

  // Add new item with validation
  const addItem = () => {
    try {
      if (!newItem.name?.trim() || !newItem.location?.trim()) {
        return;
      }

      const item: Item = {
        id: (items.length + 1).toString(),
        name: newItem.name.trim(),
        quantity: newItem.quantity || 1,
        location: newItem.location.trim(),
        notes: newItem.notes?.trim() || "",
        lastUpdated: new Date().toISOString().split("T")[0],
        instructionManuals:
          isValidCategoryId(id) && id === "5" ? instructionManuals : undefined,
      };

      setItems((prev) => [...prev, item]);
      setNewItem({
        name: "",
        quantity: 1,
        location: "",
        notes: "",
      });
      setInstructionManuals([]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Cleanup function for file URLs
  useEffect(() => {
    return () => {
      instructionManuals.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [instructionManuals]);

  // Show error state if category ID is invalid
  if (!isValidCategoryId(id)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">Invalid Category</h1>
        <p className="text-muted-foreground mt-2">
          The requested category does not exist.
        </p>
        <Link href="/inventory" className="mt-4">
          <Button variant="outline">Return to Categories</Button>
        </Link>
      </div>
    );
  }

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
                    <div className="grid gap-2">
                      <Label htmlFor="item-expiration">Expiration Date</Label>
                      <Input
                        id="item-expiration"
                        type="date"
                        value={newItem.expirationDate}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            expirationDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    {id === "5" && ( // Electronics category
                      <div className="grid gap-2">
                        <Label htmlFor="item-manuals">
                          Instruction Manuals
                        </Label>
                        <Input
                          id="item-manuals"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileUpload}
                        />
                        {instructionManuals.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {instructionManuals.map((url, index) => (
                              <div key={index} className="relative w-20 h-20">
                                <Image
                                  src={url}
                                  alt={`Manual ${index + 1}`}
                                  fill
                                  className="object-cover rounded-md"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
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
                    {item.expirationDate && (
                      <p className="text-sm">
                        <span className="font-medium">Expires:</span>{" "}
                        {item.expirationDate}
                      </p>
                    )}
                    {id === "5" &&
                      item.instructionManuals &&
                      item.instructionManuals.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">
                            Instruction Manuals:
                          </p>
                          <div className="flex gap-2">
                            {item.instructionManuals.map((url, index) => (
                              <Dialog key={index}>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    Manual {index + 1}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Instruction Manual
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="relative w-full h-[80vh]">
                                    <Image
                                      src={url}
                                      alt={`Manual ${index + 1}`}
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                </DialogContent>
                              </Dialog>
                            ))}
                          </div>
                        </div>
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
