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

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (err) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
            <span className="text-sm text-muted-foreground">Account</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/dashboard")}
              className="text-xs hover:underline text-muted-foreground"
            >
              Dashboard
            </button>
            <span className="text-muted-foreground">|</span>
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
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <Text as="h2" className="text-2xl font-bold mb-2">
              Account Settings
            </Text>
            <Text as="p" className="text-muted-foreground">
              Manage your account details and preferences
            </Text>
          </div>

          {/* User Info Cards */}
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

          {/* Danger Zone */}
          <Card className="border-destructive border-2 shadow-xl">
            <Card.Header className="border-b-2 border-destructive bg-destructive/10">
              <Card.Title>Danger Zone</Card.Title>
              <Card.Description>
                Irreversible actions for your account
              </Card.Description>
            </Card.Header>
            <Card.Content className="pt-6">
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="border-foreground"
              >
                Logout from Account
              </Button>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}
