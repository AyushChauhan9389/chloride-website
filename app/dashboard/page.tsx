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

interface FileData {
  id: number;
  name: string;
  size: number;
  ShortViewUrl?: string;
  OriginalViewUrl: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentFiles, setRecentFiles] = useState<FileData[]>([]);
  const [filesLoading, setFilesLoading] = useState(false);

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
      fetchRecentFiles(token);
    } catch (err) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const fetchRecentFiles = async (token: string) => {
    setFilesLoading(true);
    try {
      const readerUrl = process.env.NEXT_PUBLIC_READER_API_URL || "http://localhost:8080";
      const response = await fetch(`${readerUrl}/api/files/my-files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const files = data.files || data || [];
        // Get last 3 files
        setRecentFiles(files.slice(-3).reverse());
      }
    } catch (err) {
      console.error("Failed to fetch files:", err);
    } finally {
      setFilesLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

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
            <span className="text-sm text-muted-foreground">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/account")}
              className="text-xs hover:underline text-muted-foreground"
            >
              Account
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
      <div className="p-6 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 border-2 border-primary rounded-full -z-10 animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/10 border-2 border-accent rounded -z-10 rotate-12" />
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-secondary/10 border-2 border-secondary rounded-full -z-10" />
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-primary/5 border-2 border-primary/50 rounded -z-10 -rotate-6" />
        <div className="absolute top-1/2 left-5 w-16 h-16 bg-accent/5 border-2 border-accent/50 rounded-full -z-10" />

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

          {/* Recent Files */}
          <Card className="border-foreground border-2 shadow-xl mb-8">
            <Card.Header className="border-b-2 border-foreground bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <Card.Title>Recent Files</Card.Title>
                  <Card.Description>
                    Your last 3 uploaded files
                  </Card.Description>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/upload")}
                  className="border-foreground"
                >
                  View All
                </Button>
              </div>
            </Card.Header>
            <Card.Content className="pt-6">
              {filesLoading ? (
                <Text as="p" className="text-muted-foreground text-center py-4">
                  Loading files...
                </Text>
              ) : recentFiles.length === 0 ? (
                <div className="text-center py-8">
                  <Text as="p" className="text-muted-foreground mb-4">
                    No files uploaded yet
                  </Text>
                  <Button
                    variant="default"
                    onClick={() => router.push("/upload")}
                    className="border-foreground"
                  >
                    Upload Your First File
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between border-2 border-foreground rounded p-3 bg-card"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xl">📄</span>
                        <div className="min-w-0">
                          <Text as="p" className="font-medium truncate text-sm">
                            {file.name}
                          </Text>
                          <Text as="p" className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </Text>
                        </div>
                      </div>
                      <Badge variant="surface" size="sm">
                        #{file.id}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card.Content>
          </Card>

          {/* Quick Actions */}
          <Card className="border-foreground border-2 shadow-xl">
            <Card.Header className="border-b-2 border-foreground bg-muted/30">
              <Card.Title>Quick Actions</Card.Title>
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
                  onClick={() => router.push("/account")}
                >
                  <span className="text-2xl">👤</span>
                  <span>Account</span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-foreground h-auto py-4 flex flex-col items-center gap-2"
                  disabled
                >
                  <span className="text-2xl">📊</span>
                  <span>Analytics</span>
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
