"use client";

import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Text } from "@/components/retroui/Text";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Redirect to dashboard or home
        window.location.href = "/";
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 border-2 border-primary rounded-full -z-10" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 border-2 border-accent rounded -z-10 rotate-12" />
      <div className="absolute top-1/2 right-10 w-24 h-24 bg-secondary/10 border-2 border-secondary rounded-full -z-10" />

      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-primary border-2 border-foreground rounded px-6 py-3 shadow-md mb-4">
            <Text as="h1" className="flex items-center gap-2 text-primary-foreground">
              Chloride 🧪
            </Text>
          </div>
          <Text as="p" className="text-muted-foreground">
            Welcome back! Log in to your account
          </Text>
        </div>

        {/* Login Card */}
        <Card className="border-foreground border-2 shadow-xl">
          <Card.Header className="border-b-2 border-foreground bg-muted/30">
            <Card.Title>Sign In</Card.Title>
            <Card.Description>
              Enter your credentials to access your account
            </Card.Description>
          </Card.Header>
          <Card.Content className="pt-6">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-2 border-foreground"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="font-bold">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-2 border-foreground"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-destructive/10 border-2 border-destructive rounded p-3">
                  <Text as="p" className="text-sm text-destructive">
                    {error}
                  </Text>
                </div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full border-foreground"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In →"}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-4 text-muted-foreground">
                    Don't have an account?
                  </span>
                </div>
              </div>

              {/* Sign Up Link */}
              <Link href="/signup">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full border-foreground"
                >
                  Create Account
                </Button>
              </Link>
            </form>
          </Card.Content>
        </Card>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2">
          <Link href="/">
            <Text as="a" className="text-sm">
              ← Back to Home
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
}
