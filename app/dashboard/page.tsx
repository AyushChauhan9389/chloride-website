"use client";

import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import { Badge } from "@/components/retroui/Badge";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  role?: string;
  plan?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      // Not logged in, redirect to login
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (err) {
      // Invalid user data, redirect to login
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    // Clear session
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to home
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Text as="p" className="text-muted-foreground">Loading...</Text>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="border-b-2 border-foreground bg-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">Chloride</span>
            <span className="text-xs text-muted-foreground">/</span>
            <span className="text-sm text-muted-foreground">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/")}
              className="text-xs hover:underline text-muted-foreground"
            >
              Home
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              onClick={handleLogout}
              className="text-xs hover:underline text-destructive"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Decorative background elements */}
        <div className="absolute top-40 left-10 w-32 h-32 bg-primary/10 border-2 border-primary rounded-full -z-10" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 border-2 border-accent rounded -z-10 rotate-12" />
        <div className="absolute top-1/2 right-10 w-24 h-24 bg-secondary/10 border-2 border-secondary rounded-full -z-10" />

        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <Text as="h2" className="text-2xl font-bold mb-2">
              Welcome back!
            </Text>
            <Text as="p" className="text-muted-foreground">
              {user.email}
            </Text>
          </div>

        {/* User Info Card */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="border-foreground border-2 shadow-xl">
            <Card.Header className="border-b-2 border-foreground bg-muted/30">
              <Card.Title>Account Info</Card.Title>
            </Card.Header>
            <Card.Content className="pt-6 space-y-4">
              <div>
                <Text as="p" className="text-sm text-muted-foreground mb-1">
                  Email
                </Text>
                <Text as="p" className="font-bold">
                  {user.email}
                </Text>
              </div>
              <div>
                <Text as="p" className="text-sm text-muted-foreground mb-1">
                  User ID
                </Text>
                <Text as="p" className="font-bold">
                  #{user.id}
                </Text>
              </div>
            </Card.Content>
          </Card>

          <Card className="border-foreground border-2 shadow-xl">
            <Card.Header className="border-b-2 border-foreground bg-primary/10">
              <Card.Title>Current Plan</Card.Title>
            </Card.Header>
            <Card.Content className="pt-6 space-y-4">
              <div>
                <Badge variant="surface" className="shadow-md">
                  <span className="text-lg font-bold">
                    {user.plan || "Free"} Plan
                  </span>
                </Badge>
              </div>
              <Text as="p" className="text-sm text-muted-foreground">
                Upgrade to get more storage and features
              </Text>
            </Card.Content>
          </Card>

          <Card className="border-foreground border-2 shadow-xl">
            <Card.Header className="border-b-2 border-foreground bg-accent/10">
              <Card.Title>Role</Card.Title>
            </Card.Header>
            <Card.Content className="pt-6 space-y-4">
              <div>
                <Badge variant="surface" className="shadow-md">
                  <span className="text-lg font-bold">
                    {user.role || "USER"}
                  </span>
                </Badge>
              </div>
              <Text as="p" className="text-sm text-muted-foreground">
                Your access level in the system
              </Text>
            </Card.Content>
          </Card>
        </div>

        {/* Demo Features Section */}
        <Card className="border-foreground border-2 shadow-xl mb-8">
          <Card.Header className="border-b-2 border-foreground bg-muted/30">
            <Card.Title>Quick Actions</Card.Title>
            <Card.Description>
              Demo dashboard - File management features coming soon
            </Card.Description>
          </Card.Header>
          <Card.Content className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                size="lg"
                className="border-foreground h-auto py-4 flex flex-col items-center gap-2"
                onClick={() => router.push("/upload")}
              >
                <span className="text-2xl">📁</span>
                <span>Upload Files</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-foreground h-auto py-4 flex flex-col items-center gap-2"
                disabled
              >
                <span className="text-2xl">📊</span>
                <span>View Analytics</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-foreground h-auto py-4 flex flex-col items-center gap-2"
                disabled
              >
                <span className="text-2xl">⚙️</span>
                <span>Settings</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-foreground h-auto py-4 flex flex-col items-center gap-2"
                disabled
              >
                <span className="text-2xl">🔗</span>
                <span>Short URLs</span>
              </Button>
            </div>
          </Card.Content>
        </Card>
        </div>
      </div>
    </div>
  );
}
