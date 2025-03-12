"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, Package, Plus, Search } from "lucide-react"

export default function InventoryPage() {
  // Sample inventory data
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Paper Towels",
      category: "Household",
      quantity: 4,
      location: "Kitchen",
      lastUpdated: "2023-10-15",
    },
    {
      id: 2,
      name: "Laundry Detergent",
      category: "Cleaning",
      quantity: 1,
      location: "Laundry Room",
      lastUpdated: "2023-10-10",
    },
    {
      id: 3,
      name: "Cereal",
      category: "Food",
      quantity: 2,
      location: "Pantry",
      lastUpdated: "2023-10-12",
    },
    {
      id: 4,
      name: "Toothpaste",
      category: "Bathroom",
      quantity: 3,
      location: "Bathroom",
      lastUpdated: "2023-10-05",
    },
    {
      id: 5,
      name: "Batteries",
      category: "Electronics",
      quantity: 8,
      location: "Drawer",
      lastUpdated: "2023-09-28",
    },
    {
      id: 6,
      name: "Light Bulbs",
      category: "Household",
      quantity: 6,
      location: "Storage",
      lastUpdated: "2023-09-15",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = ["All", "Household", "Cleaning", "Food", "Bathroom", "Electronics"]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6" />
            <h1 className="text-xl font-bold">HomeHub</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link
              href="/profiles"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Profiles
            </Link>
            <Link href="/inventory" className="text-sm font-medium transition-colors hover:text-primary">
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
            <h2 className="text-3xl font-bold tracking-tight">Household Inventory</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search inventory..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
              <div className="col-span-4">Item</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Location</div>
              <div className="col-span-2">Last Updated</div>
            </div>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center">
                  <div className="col-span-4 flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    {item.name}
                  </div>
                  <div className="col-span-2">{item.category}</div>
                  <div className="col-span-2">{item.quantity}</div>
                  <div className="col-span-2">{item.location}</div>
                  <div className="col-span-2">{item.lastUpdated}</div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">No items found</div>
            )}
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
  )
}

