"use client";

import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Badge } from "@/components/retroui/Badge";
import { Text } from "@/components/retroui/Text";
import {
  Tabs,
  TabsContent,
  TabsPanels,
  TabsTrigger,
  TabsTriggerList,
} from "@/components/retroui/Tab";
import { useState } from "react";

export default function Home() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card border-b-4 border-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="bg-primary border-2 border-foreground rounded px-4 py-2 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse border border-foreground" />
                    <Text as="h3" className="font-bold text-primary-foreground text-lg">
                      Chloride 🧪
                    </Text>
                  </div>
                </div>
              </div>
              <Badge
                variant="solid"
                size="sm"
                className="hidden lg:block border-2 border-foreground"
              >
                v1.0
              </Badge>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {/* Navigation Links with unique styling */}
              <div className="flex items-center gap-2 bg-muted/30 border-2 border-foreground rounded p-1">
                <a
                  href="#features"
                  className="px-3 py-1.5 rounded font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-all border-2 border-transparent hover:border-foreground"
                >
                  Features
                </a>
                <a
                  href="#platform"
                  className="px-3 py-1.5 rounded font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-all border-2 border-transparent hover:border-foreground"
                >
                  Platform
                </a>
                <a
                  href="#docs"
                  className="px-3 py-1.5 rounded font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-all border-2 border-transparent hover:border-foreground"
                >
                  Docs
                </a>
              </div>

              <div className="w-px h-8 bg-foreground mx-1" />

              <Button variant="outline" size="sm" className="border-foreground" asChild>
                <a href="/login">Sign In</a>
              </Button>
              <Button
                variant="default"
                size="sm"
                className="font-bold border-foreground"
                asChild
              >
                <a href="/signup">Get Started →</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="outline" size="sm" className="border-foreground">
                Menu
              </Button>
            </div>
          </div>

          {/* Decorative bottom border pattern */}
          <div className="flex gap-2 mt-4">
            <div className="h-1.5 flex-1 max-w-[60px] bg-primary rounded-full border border-foreground" />
            <div className="h-1.5 flex-1 max-w-[40px] bg-secondary rounded-full border border-foreground" />
            <div className="h-1.5 flex-1 max-w-[80px] bg-accent rounded-full border border-foreground" />
            <div className="h-1.5 flex-1 max-w-[30px] bg-destructive rounded-full border border-foreground" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-16 md:py-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 border-2 border-primary rounded-full -z-10" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/10 border-2 border-accent rounded -z-10 rotate-12" />
        <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-secondary/10 border-2 border-secondary rounded-full -z-10" />

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <Badge
              variant="surface"
              size="md"
              className="shadow-md border-0 [&>*]:border-0"
            >
              <span className="flex items-center gap-2 border-0">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse border border-foreground" />
                Built for Windows
              </span>
            </Badge>

            <div className="relative">
              <Text as="h1" className="leading-tight">
                File management
                <br />
                <span className="relative inline-block">
                  made simple
                  <div className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/30 -z-10 -rotate-1" />
                </span>
              </Text>
            </div>

            <Text as="p" className="text-lg text-muted-foreground max-w-lg">
              A powerful and lightweight CLI tool for Windows. Manage your files
              effortlessly with simple commands. Fast, reliable, and built with Rust.
            </Text>

            {/* CTA Buttons */}
            <div className="flex gap-3 flex-wrap pt-2">
              <Button
                variant="default"
                size="lg"
                className="border-foreground group"
              >
                <span className="flex items-center gap-2">
                  Download Chloride
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-foreground hover:bg-secondary hover:text-secondary-foreground"
              >
                View on GitHub
              </Button>
            </div>

            {/* Social proof / stats */}
            <div className="flex gap-4 flex-wrap pt-4">
              <div className="flex items-center gap-2 bg-muted/30 border-2 border-foreground rounded px-3 py-2">
                <span className="text-xl">⚡</span>
                <div>
                  <div className="font-bold text-sm">Blazing</div>
                  <div className="text-xs text-muted-foreground">Fast</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-muted/30 border-2 border-foreground rounded px-3 py-2">
                <span className="text-xl">🦀</span>
                <div>
                  <div className="font-bold text-sm">Rust</div>
                  <div className="text-xs text-muted-foreground">Powered</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-muted/30 border-2 border-foreground rounded px-3 py-2">
                <span className="text-xl">💻</span>
                <div>
                  <div className="font-bold text-sm">Windows</div>
                  <div className="text-xs text-muted-foreground">Native</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Terminal */}
          <div className="space-y-4">
            {/* Terminal-style command box */}
            <Card className="border-foreground border-2 bg-card shadow-lg">
              <div className="bg-secondary border-b-2 border-foreground px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive border border-foreground" />
                  <div className="w-3 h-3 rounded-full bg-accent border border-foreground" />
                  <div className="w-3 h-3 rounded-full bg-green-500 border border-foreground" />
                </div>
                <Text
                  as="p"
                  className="text-xs text-secondary-foreground font-mono"
                >
                  terminal
                </Text>
              </div>
              <div className="p-4 flex items-center justify-between gap-4 bg-card">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-primary font-mono text-sm"></span>
                  <code className="text-sm font-mono flex-1">
                    winget install chloride
                  </code>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-foreground"
                  onClick={() =>
                    copyToClipboard("winget install chloride", 0)
                  }
                >
                  {copiedIndex === 0 ? "✓" : "Copy"}
                </Button>
              </div>
            </Card>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border-2 border-foreground rounded p-4 shadow-sm">
                <div className="text-2xl mb-2">📁</div>
                <div className="font-bold text-sm">Simple Commands</div>
                <div className="text-xs text-muted-foreground">
                  Easy file operations
                </div>
              </div>
              <div className="bg-card border-2 border-foreground rounded p-4 shadow-sm">
                <div className="text-2xl mb-2">🔄</div>
                <div className="font-bold text-sm">Dual Names</div>
                <div className="text-xs text-muted-foreground">
                  chloride or cl
                </div>
              </div>
              <div className="bg-card border-2 border-foreground rounded p-4 shadow-sm">
                <div className="text-2xl mb-2">📦</div>
                <div className="font-bold text-sm">MSI Installer</div>
                <div className="text-xs text-muted-foreground">
                  Windows native
                </div>
              </div>
              <div className="bg-card border-2 border-foreground rounded p-4 shadow-sm">
                <div className="text-2xl mb-2">🦀</div>
                <div className="font-bold text-sm">Rust Built</div>
                <div className="text-xs text-muted-foreground">Fast & reliable</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/20 border-y-2 border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <Text as="h2" className="mb-4">
              Powerful features for Windows users
            </Text>
            <Text as="p" className="text-muted-foreground text-lg">
              Everything you need to manage files efficiently
            </Text>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card hover:shadow-lg transition-all">
              <Card.Header>
                <div className="w-12 h-12 bg-primary rounded mb-4 flex items-center justify-center text-2xl">
                  📁
                </div>
                <Card.Title>Simple Commands</Card.Title>
                <Card.Description>
                  Easy-to-use file operations with intuitive command syntax.
                  Create, remove, and manage files effortlessly.
                </Card.Description>
              </Card.Header>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-all">
              <Card.Header>
                <div className="w-12 h-12 bg-primary rounded mb-4 flex items-center justify-center text-2xl">
                  🔄
                </div>
                <Card.Title>Dual Command Names</Card.Title>
                <Card.Description>
                  Use either chloride or cl for convenience. Short commands for
                  power users, full names for clarity.
                </Card.Description>
              </Card.Header>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-all">
              <Card.Header>
                <div className="w-12 h-12 bg-primary rounded mb-4 flex items-center justify-center text-2xl">
                  💻
                </div>
                <Card.Title>Windows Integration</Card.Title>
                <Card.Description>
                  Native MSI installer with automatic PATH configuration. Seamless
                  integration with your Windows environment.
                </Card.Description>
              </Card.Header>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-all">
              <Card.Header>
                <div className="w-12 h-12 bg-primary rounded mb-4 flex items-center justify-center text-2xl">
                  ⚡
                </div>
                <Card.Title>Lightning Fast</Card.Title>
                <Card.Description>
                  Built with Rust for optimal performance. Execute file operations
                  in milliseconds with minimal overhead.
                </Card.Description>
              </Card.Header>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-all">
              <Card.Header>
                <div className="w-12 h-12 bg-primary rounded mb-4 flex items-center justify-center text-2xl">
                  🦀
                </div>
                <Card.Title>Rust Powered</Card.Title>
                <Card.Description>
                  Memory-safe and reliable. Built with modern Rust for maximum
                  performance and safety.
                </Card.Description>
              </Card.Header>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-all">
              <Card.Header>
                <div className="w-12 h-12 bg-primary rounded mb-4 flex items-center justify-center text-2xl">
                  🎯
                </div>
                <Card.Title>Lightweight</Card.Title>
                <Card.Description>
                  Minimal resource usage with maximum functionality. No bloat, just
                  essential file management features.
                </Card.Description>
              </Card.Header>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Section with Tabs */}
      <section id="platform" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <Text as="h2" className="mb-4">
            Multiple installation options
          </Text>
          <Text as="p" className="text-muted-foreground text-lg">
            Choose the installation method that works best for you
          </Text>
        </div>

        <Tabs>
          <TabsTriggerList className="justify-center mb-8">
            <TabsTrigger className="rounded">MSI Installer</TabsTrigger>
            <TabsTrigger className="rounded">Portable</TabsTrigger>
            <TabsTrigger className="rounded">Build from Source</TabsTrigger>
          </TabsTriggerList>

          <TabsPanels>
            <TabsContent className="rounded bg-card">
              <div className="space-y-4">
                <Text as="h3">MSI Installer (Recommended)</Text>
                <Text as="p" className="text-muted-foreground">
                  Native Windows installer with automatic PATH configuration.
                  Perfect for most users who want a simple setup experience.
                </Text>
                <div className="bg-secondary/10 border-2 border-border rounded p-6 font-mono text-sm">
                  <div className="text-muted-foreground mb-2">
                    1. Download chloride-installer.msi
                  </div>
                  <div className="text-muted-foreground mb-2">
                    2. Run the installer
                  </div>
                  <div className="text-muted-foreground mb-2">
                    3. Restart your terminal
                  </div>
                  <div className="text-primary mt-4">&gt; chloride --help</div>
                  <div className="text-foreground mt-2">
                    Chloride - File Management CLI 🧪
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="default">Download MSI</Button>
                  <Button variant="outline">View Docs</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent className="rounded bg-card">
              <div className="space-y-4">
                <Text as="h3">Portable Executable</Text>
                <Text as="p" className="text-muted-foreground">
                  Standalone executable that requires no installation. Download,
                  rename, and place in your PATH manually.
                </Text>
                <div className="bg-secondary/10 border-2 border-border rounded p-6">
                  <div className="space-y-3">
                    <Badge variant="surface" size="sm">
                      No Installation Required
                    </Badge>
                    <Badge variant="surface" size="sm">
                      Manual PATH Setup
                    </Badge>
                    <Badge variant="surface" size="sm">
                      Portable & Flexible
                    </Badge>
                    <Badge variant="surface" size="sm">
                      Single Executable
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="default">Download .exe</Button>
                  <Button variant="outline">Setup Guide</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent className="rounded bg-card">
              <div className="space-y-4">
                <Text as="h3">Build from Source</Text>
                <Text as="p" className="text-muted-foreground">
                  For developers who want to build Chloride themselves or
                  contribute to the project. Requires Rust toolchain.
                </Text>
                <div className="bg-secondary/10 border-2 border-border rounded p-6 text-left font-mono text-sm">
                  <div className="text-primary mb-2">
                    &gt; git clone https://github.com/chloride-team/chloride
                  </div>
                  <div className="text-primary mb-2">&gt; cd chloride</div>
                  <div className="text-primary mb-2">
                    &gt; cargo build --release
                  </div>
                  <div className="text-muted-foreground mt-4">
                    Binary will be in target/release/
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="default">View on GitHub</Button>
                  <Button variant="outline">Contribution Guide</Button>
                </div>
              </div>
            </TabsContent>
          </TabsPanels>
        </Tabs>
      </section>

      {/* Use Cases Section */}
      <section className="bg-primary/10 border-y-2 border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <Text as="h2" className="mb-4">
              Common file operations made easy
            </Text>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded flex-shrink-0 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <Text as="h4" className="mb-2">
                    Create Files Quickly
                  </Text>
                  <Text as="p" className="text-muted-foreground">
                    Use chloride touch to create single or multiple files
                    instantly with simple commands
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded flex-shrink-0 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <Text as="h4" className="mb-2">
                    Remove with Confidence
                  </Text>
                  <Text as="p" className="text-muted-foreground">
                    Delete files safely with confirmation prompts and batch
                    removal support
                  </Text>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded flex-shrink-0 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <Text as="h4" className="mb-2">
                    Batch Operations
                  </Text>
                  <Text as="p" className="text-muted-foreground">
                    Perform operations on multiple files at once using patterns
                    and wildcards
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded flex-shrink-0 flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <Text as="h4" className="mb-2">
                    Interactive Dashboard
                  </Text>
                  <Text as="p" className="text-muted-foreground">
                    Run chloride without arguments to see the interactive
                    dashboard and explore features
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <Card className="bg-primary text-primary-foreground">
          <Card.Content className="text-center py-16">
            <Text as="h2" className="mb-6">
              Ready to simplify your file management?
            </Text>
            <Text
              as="p"
              className="text-lg mb-8 max-w-2xl mx-auto opacity-90"
            >
              Join Windows users who are managing files faster with Chloride 🧪
            </Text>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="secondary" size="lg">
                Download Now
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent">
                View on GitHub
              </Button>
            </div>
          </Card.Content>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Text as="h4" className="mb-4">
                Product
              </Text>
              <div className="space-y-2">
                <Text as="a" className="block text-sm">
                  Features
                </Text>
                <Text as="a" href="#" className="block text-sm">
                  Releases
                </Text>
                <Text as="a" className="block text-sm">
                  Documentation
                </Text>
              </div>
            </div>

            <div>
              <Text as="h4" className="mb-4">
                Community
              </Text>
              <div className="space-y-2">
                <Text as="a" className="block text-sm">
                  GitHub
                </Text>
                <Text as="a" className="block text-sm">
                  Discussions
                </Text>
                <Text as="a" className="block text-sm">
                  Issues
                </Text>
              </div>
            </div>

            <div>
              <Text as="h4" className="mb-4">
                Resources
              </Text>
              <div className="space-y-2">
                <Text as="a"  className="block text-sm">
                  Getting Started
                </Text>
                <Text as="a"  className="block text-sm">
                  Wiki
                </Text>
                <Text as="a" className="block text-sm">
                  Community
                </Text>
              </div>
            </div>

            <div>
              <Text as="h4" className="mb-4">
                Legal
              </Text>
              <div className="space-y-2">
                <Text as="a" className="block text-sm">
                  MIT License
                </Text>
                <Text as="a" className="block text-sm">
                  Contributing
                </Text>
                <Text as="a" className="block text-sm">
                  Code of Conduct
                </Text>
              </div>
            </div>

          </div>

          <div className="border-t-2 border-border pt-8 text-center">
            <Text as="p" className="text-sm text-muted-foreground">
              © 2024 Chloride Team. Made with ❤️ and Rust 🦀
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
}
