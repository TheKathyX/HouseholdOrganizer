import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  CheckSquare,
  Home,
  Package,
  Users,
  Sparkles,
} from "lucide-react";

export default function Dashboard() {
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
              className="text-sm font-medium transition-colors hover:text-primary"
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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12">
          <div className="grid gap-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Organize Your Home, Simplify Your Life
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Keep your family organized with profiles, inventory tracking,
                task management, and a shared calendar.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Family Profiles
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4 Members</div>
                  <p className="text-xs text-muted-foreground">
                    Manage family member profiles
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/profiles" className="w-full">
                    <Button className="w-full" variant="outline">
                      View Profiles
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Inventory
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24 Items</div>
                  <p className="text-xs text-muted-foreground">
                    Track household items and supplies
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/inventory" className="w-full">
                    <Button className="w-full" variant="outline">
                      Manage Inventory
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasks</CardTitle>
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12 Tasks</div>
                  <p className="text-xs text-muted-foreground">
                    Manage and assign household chores
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/tasks" className="w-full">
                    <Button className="w-full" variant="outline">
                      View Tasks
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Calendar
                  </CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8 Events</div>
                  <p className="text-xs text-muted-foreground">
                    Shared family calendar
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/calendar" className="w-full">
                    <Button className="w-full" variant="outline">
                      View Calendar
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Cleaning Routine
                  </CardTitle>
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7 Days</div>
                  <p className="text-xs text-muted-foreground">
                    Weekly cleaning schedule
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/cleaning-routine" className="w-full">
                    <Button className="w-full" variant="outline">
                      View Schedule
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
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
