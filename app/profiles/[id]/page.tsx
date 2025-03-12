"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Edit, ExternalLink, Gift, Home, Plus, Trash2 } from "lucide-react"

export default function ProfilePage() {
  const params = useParams()
  const profileId = params.id

  // Sample family members data - in a real app, you would fetch this based on the ID
  const familyMembers = [
    {
      id: "1",
      name: "John Smith",
      role: "Parent",
      age: 42,
      birthday: "1981-05-15",
      clothesSize: "L",
      shoeSize: "10",
      favoriteColor: "Blue",
      allergies: "None",
      bio: "Dad who loves DIY projects and coaching soccer on weekends.",
      tasksCompleted: 15,
      avatar: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "2",
      name: "Sarah Smith",
      role: "Parent",
      age: 40,
      birthday: "1983-08-22",
      clothesSize: "M",
      shoeSize: "8",
      favoriteColor: "Purple",
      allergies: "Peanuts",
      bio: "Mom who works as a graphic designer and enjoys gardening.",
      tasksCompleted: 18,
      avatar: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "3",
      name: "Emma Smith",
      role: "Child",
      age: 12,
      birthday: "2011-03-10",
      clothesSize: "Youth L",
      shoeSize: "5",
      favoriteColor: "Pink",
      allergies: "None",
      bio: "Loves art, reading, and playing with friends.",
      tasksCompleted: 8,
      avatar: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "4",
      name: "Michael Smith",
      role: "Child",
      age: 9,
      birthday: "2014-11-05",
      clothesSize: "Youth M",
      shoeSize: "3",
      favoriteColor: "Green",
      allergies: "Dairy",
      bio: "Enjoys soccer, video games, and building with Legos.",
      tasksCompleted: 6,
      avatar: "/placeholder.svg?height=200&width=200",
    },
  ]

  // Find the current profile
  const profile = familyMembers.find((member) => member.id === profileId) || familyMembers[0]

  // Sample wishlist data
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones in black",
      link: "https://example.com/headphones",
      priority: "High",
    },
    {
      id: 2,
      title: "Hiking Boots",
      description: "Waterproof hiking boots, size 10",
      link: "https://example.com/boots",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Cookbook",
      description: "Italian cooking recipes",
      link: "https://example.com/cookbook",
      priority: "Low",
    },
  ])

  // State for new wishlist item
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    link: "",
    priority: "Medium",
  })

  // Add new wishlist item
  const addWishlistItem = () => {
    if (newItem.title.trim() === "") return

    setWishlist([
      ...wishlist,
      {
        id: wishlist.length + 1,
        ...newItem,
      },
    ])

    // Reset form
    setNewItem({
      title: "",
      description: "",
      link: "",
      priority: "Medium",
    })
  }

  // Remove wishlist item
  const removeWishlistItem = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id))
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
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/profiles" className="text-sm font-medium transition-colors hover:text-primary">
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
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/profiles">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">{profile.name}'s Profile</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-4">
                    <Image
                      src={profile.avatar || "/placeholder.svg"}
                      alt={profile.name}
                      fill
                      className="rounded-full object-cover border-4 border-background"
                    />
                    <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="text-2xl font-bold">{profile.name}</h3>
                  <p className="text-muted-foreground">{profile.role}</p>
                  <div className="mt-4 text-sm">
                    <p>Tasks Completed: {profile.tasksCompleted}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Details about {profile.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Age:</div>
                      <div className="text-sm">{profile.age}</div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Birthday:</div>
                      <div className="text-sm">{new Date(profile.birthday).toLocaleDateString()}</div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Clothes Size:</div>
                      <div className="text-sm">{profile.clothesSize}</div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Shoe Size:</div>
                      <div className="text-sm">{profile.shoeSize}</div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Favorite Color:</div>
                      <div className="text-sm">{profile.favoriteColor}</div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Allergies:</div>
                      <div className="text-sm">{profile.allergies}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Information
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{profile.bio}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5" />
                      Wishlist
                    </CardTitle>
                    <CardDescription>Items {profile.name} would like to receive</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Wishlist Item</DialogTitle>
                        <DialogDescription>Add an item to {profile.name}'s wishlist</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="item-title">Item Name</Label>
                          <Input
                            id="item-title"
                            placeholder="Enter item name"
                            value={newItem.title}
                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="item-description">Description</Label>
                          <Textarea
                            id="item-description"
                            placeholder="Enter item description"
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="item-link">Link (Optional)</Label>
                          <Input
                            id="item-link"
                            placeholder="https://example.com/item"
                            value={newItem.link}
                            onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="item-priority">Priority</Label>
                          <select
                            id="item-priority"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={newItem.priority}
                            onChange={(e) => setNewItem({ ...newItem, priority: e.target.value })}
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={addWishlistItem}>
                          Add to Wishlist
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {wishlist.length > 0 ? (
                    <div className="space-y-4">
                      {wishlist.map((item) => (
                        <div key={item.id} className="flex items-start justify-between border rounded-lg p-4">
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary flex items-center mt-1 hover:underline"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View Item
                              </a>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                item.priority === "High"
                                  ? "bg-red-100 text-red-800"
                                  : item.priority === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {item.priority}
                            </span>
                            <Button variant="ghost" size="icon" onClick={() => removeWishlistItem(item.id)}>
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Gift className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No items in wishlist</h3>
                      <p className="text-muted-foreground">Add items that {profile.name} would like to receive</p>
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
  )
}

