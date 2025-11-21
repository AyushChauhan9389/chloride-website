"use client";

import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Text } from "@/components/retroui/Text";
import { Badge } from "@/components/retroui/Badge";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Redirect to dashboard if already logged in
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:8082";
      const response = await fetch(`${apiUrl}/api/auth/signup`, {
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
        setSuccess(true);
        // Redirect to dashboard after short delay
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setError(data.message || "Signup failed. Please try again.");
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
      <div className="absolute top-10 right-10 w-36 h-36 bg-primary/10 border-2 border-primary rounded -z-10 rotate-6" />
      <div className="absolute bottom-10 left-20 w-28 h-28 bg-accent/10 border-2 border-accent rounded-full -z-10" />
      <div className="absolute top-1/3 left-10 w-32 h-32 bg-secondary/10 border-2 border-secondary rounded -z-10 -rotate-12" />

      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-primary border-2 border-foreground rounded px-6 py-3 shadow-md mb-4">
            <Text as="h1" className="flex items-center gap-2 text-primary-foreground">
              Chloride 🧪
            </Text>
          </div>
          <Text as="p" className="text-muted-foreground">
            Create your account and start managing files
          </Text>
        </div>

        {/* Signup Card */}
        <Card className="border-foreground border-2 shadow-xl">
          <Card.Header className="border-b-2 border-foreground bg-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <Card.Title>Create Account</Card.Title>
                <Card.Description>
                  Join Chloride to get started with file management
                </Card.Description>
              </div>
              <Badge variant="surface" size="sm" className="border-2 border-foreground">
                Free
              </Badge>
            </div>
          </Card.Header>
          <Card.Content className="pt-6">
            {success ? (
              <div className="py-8 text-center space-y-4">
                <div className="text-6xl mb-4">🎉</div>
                <Text as="h3" className="text-primary">
                  Account Created Successfully!
                </Text>
                <Text as="p" className="text-muted-foreground">
                  Redirecting you to dashboard...
                </Text>
              </div>
            ) : (
              <form onSubmit={handleSignup} className="space-y-6">
                {/* Free Plan Info */}
                <div className="bg-muted/30 border-2 border-foreground rounded p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🎁</span>
                    <Text as="p" className="font-bold text-sm">
                      Free Plan Includes:
                    </Text>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span> 10 file uploads
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span> 100MB storage
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span> URL shortening
                    </div>
                  </div>
                </div>

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
                  <Text as="p" className="text-xs text-muted-foreground">
                    Must be at least 6 characters
                  </Text>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-bold">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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

                {/* Signup Button */}
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full border-foreground"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account →"}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-card px-4 text-muted-foreground">
                      Already have an account?
                    </span>
                  </div>
                </div>

                {/* Sign In Link */}
                <Link href="/login">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full border-foreground"
                  >
                    Sign In
                  </Button>
                </Link>

                {/* Terms */}
                <Text as="p" className="text-xs text-center text-muted-foreground">
                  By creating an account, you agree to our Terms of Service and
                  Privacy Policy
                </Text>
              </form>
            )}
          </Card.Content>
        </Card>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2">
          <Link href="/">
            <Text className="text-sm hover:underline cursor-pointer">
              ← Back to Home
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
}
