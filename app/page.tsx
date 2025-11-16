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
                      Claude Code
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

              <Button variant="outline" size="sm" className="border-foreground">
                Sign In
              </Button>
              <Button
                variant="default"
                size="sm"
                className="font-bold border-foreground"
              >
                Get Started →
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
              className="shadow-md"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse border border-foreground" />
                Built for developers
              </span>
            </Badge>

            <div className="relative">
              <Text as="h1" className="leading-tight">
                AI-powered coding
                <br />
                <span className="relative inline-block">
                  at your command
                  <div className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/30 -z-10 -rotate-1" />
                </span>
              </Text>
            </div>

            <Text as="p" className="text-lg text-muted-foreground max-w-lg">
              Interactive CLI tool that helps you write, understand, and improve
              code with AI assistance. Work faster and smarter.
            </Text>

            {/* CTA Buttons */}
            <div className="flex gap-3 flex-wrap pt-2">
              <Button
                variant="default"
                size="lg"
                className="border-foreground group"
              >
                <span className="flex items-center gap-2">
                  Get Claude Code
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
                Documentation
              </Button>
            </div>

            {/* Social proof / stats */}
            <div className="flex gap-4 flex-wrap pt-4">
              <div className="flex items-center gap-2 bg-muted/30 border-2 border-foreground rounded px-3 py-2">
                <span className="text-xl">⭐</span>
                <div>
                  <div className="font-bold text-sm">10K+</div>
                  <div className="text-xs text-muted-foreground">Stars</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-muted/30 border-2 border-foreground rounded px-3 py-2">
                <span className="text-xl">👥</span>
                <div>
                  <div className="font-bold text-sm">50K+</div>
                  <div className="text-xs text-muted-foreground">Users</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-muted/30 border-2 border-foreground rounded px-3 py-2">
                <span className="text-xl">🚀</span>
                <div>
                  <div className="font-bold text-sm">99.9%</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
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
                  <span className="text-primary font-mono text-sm">$</span>
                  <code className="text-sm font-mono flex-1">
                    npm install -g @anthropic/claude-code
                  </code>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-foreground"
                  onClick={() =>
                    copyToClipboard("npm install -g @anthropic/claude-code", 0)
                  }
                >
                  {copiedIndex === 0 ? "✓" : "Copy"}
                </Button>
              </div>
            </Card>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border-2 border-foreground rounded p-4 shadow-sm">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-bold text-sm">Lightning Fast</div>
                <div className="text-xs text-muted-foreground">
                  Instant responses
                </div>
              </div>
              <div className="bg-card border-2 border-foreground rounded p-4 shadow-sm">
                <div className="text-2xl mb-2">🔒</div>
                <div className="font-bold text-sm">Secure</div>
                <div className="text-xs text-muted-foreground">
                  Privacy first
                </div>
              </div>
              <div className="bg-card border-2 border-foreground rounded p-4 shadow-sm">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-bold text-sm">Context Aware</div>
                <div className="text-xs text-muted-foreground">
                  Understands code
                </div>
              </div>
              <div className="bg-card border-2 border-foreground rounded p-4 shadow-sm">
                <div className="text-2xl mb-2">🛠️</div>
                <div className="font-bold text-sm">Multi-Language</div>
                <div className="text-xs text-muted-foreground">All platforms</div>
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
              Powerful features for developers
            </Text>
            <Text as="p" className="text-muted-foreground text-lg">
              Everything you need to code smarter and faster
            </Text>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card hover:shadow-lg transition-all">
              <Card.Header>
                <div className="w-12 h-12 bg-primary rounded mb-4 flex items-center justify-center text-2xl">
                  🚀
                </div>
                <Card.Title>Lightning Fast</Card.Title>
                <Card.Description>
                  Get instant AI-powered suggestions and code completions as you
                  type
                </Card.Description>
              </Card.Header>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-all">
              <Card.Header>
                <div className="w-12 h-12 bg-primary rounded mb-4 flex items-center justify-center text-2xl">
                  🔍
                </div>
                <Card.Title>Code Understanding</Card.Title>
                <Card.Description>
                  Explore and understand complex codebases with AI-powered
                  analysis
                </Card.Description>
              </Card.Header>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-all">
              <Card.Header>
                <div className="w-12 h-12 bg-primary rounded mb-4 flex items-center justify-center text-2xl">
                  ✨
                </div>
                <Card.Title>Smart Refactoring</Card.Title>
                <Card.Description>
                  Automatically improve code quality with intelligent
                  refactoring suggestions
                </Card.Description>
              </Card.Header>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-all">
              <Card.Header>
                <div className="w-12 h-12 bg-primary rounded mb-4 flex items-center justify-center text-2xl">
                  🛠️
                </div>
                <Card.Title>Multi-Language</Card.Title>
                <Card.Description>
                  Support for all major programming languages and frameworks
                </Card.Description>
              </Card.Header>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-all">
              <Card.Header>
                <div className="w-12 h-12 bg-primary rounded mb-4 flex items-center justify-center text-2xl">
                  🔒
                </div>
                <Card.Title>Secure & Private</Card.Title>
                <Card.Description>
                  Your code stays yours. Built with enterprise-grade security
                </Card.Description>
              </Card.Header>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-all">
              <Card.Header>
                <div className="w-12 h-12 bg-primary rounded mb-4 flex items-center justify-center text-2xl">
                  🎯
                </div>
                <Card.Title>Context Aware</Card.Title>
                <Card.Description>
                  AI that understands your project structure and coding style
                </Card.Description>
              </Card.Header>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Section with Tabs */}
      <section id="platform" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <Text as="h2" className="mb-4">
            Available everywhere you code
          </Text>
          <Text as="p" className="text-muted-foreground text-lg">
            Use Claude Code in your favorite development environment
          </Text>
        </div>

        <Tabs>
          <TabsTriggerList className="justify-center mb-8">
            <TabsTrigger className="rounded">Terminal</TabsTrigger>
            <TabsTrigger className="rounded">VS Code</TabsTrigger>
            <TabsTrigger className="rounded">Web</TabsTrigger>
          </TabsTriggerList>

          <TabsPanels>
            <TabsContent className="rounded bg-card">
              <div className="space-y-4">
                <Text as="h3">Command Line Interface</Text>
                <Text as="p" className="text-muted-foreground">
                  Work directly from your terminal with our powerful CLI tool.
                  Get AI assistance without leaving your workflow.
                </Text>
                <div className="bg-secondary/10 border-2 border-border rounded p-6 font-mono text-sm">
                  <div className="text-primary mb-2">$ claude-code</div>
                  <div className="text-muted-foreground">
                    Welcome to Claude Code! 🚀
                  </div>
                  <div className="text-muted-foreground">
                    Type &apos;help&apos; to see available commands
                  </div>
                  <div className="mt-4 text-primary">
                    &gt; analyze src/components
                  </div>
                  <div className="text-foreground mt-2">
                    Analyzing codebase...
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="default">Install CLI</Button>
                  <Button variant="outline">View Docs</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent className="rounded bg-card">
              <div className="space-y-4">
                <Text as="h3">VS Code Extension</Text>
                <Text as="p" className="text-muted-foreground">
                  Seamlessly integrated into Visual Studio Code. Get inline
                  suggestions and AI-powered assistance right in your editor.
                </Text>
                <div className="bg-secondary/10 border-2 border-border rounded p-6">
                  <div className="space-y-3">
                    <Badge variant="surface" size="sm">
                      IntelliSense Integration
                    </Badge>
                    <Badge variant="surface" size="sm">
                      Real-time Suggestions
                    </Badge>
                    <Badge variant="surface" size="sm">
                      Code Actions
                    </Badge>
                    <Badge variant="surface" size="sm">
                      Inline Chat
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="default">Install Extension</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent className="rounded bg-card">
              <div className="space-y-4">
                <Text as="h3">Web Interface</Text>
                <Text as="p" className="text-muted-foreground">
                  Access Claude Code from anywhere with our web interface. No
                  installation required, perfect for quick tasks and
                  collaboration.
                </Text>
                <div className="bg-secondary/10 border-2 border-border rounded p-6 text-center">
                  <div className="text-4xl mb-4">🌐</div>
                  <Text as="p" className="text-muted-foreground">
                    Start coding in your browser instantly
                  </Text>
                </div>
                <div className="flex gap-4">
                  <Button variant="default">Try Web Version</Button>
                  <Button variant="outline">Documentation</Button>
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
              Built for every developer workflow
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
                    Debug Faster
                  </Text>
                  <Text as="p" className="text-muted-foreground">
                    Identify and fix bugs with AI-powered analysis and
                    suggestions
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded flex-shrink-0 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <Text as="h4" className="mb-2">
                    Learn New Languages
                  </Text>
                  <Text as="p" className="text-muted-foreground">
                    Get explanations and examples in any programming language
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
                    Write Tests
                  </Text>
                  <Text as="p" className="text-muted-foreground">
                    Generate comprehensive test suites automatically
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded flex-shrink-0 flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <Text as="h4" className="mb-2">
                    Refactor Legacy Code
                  </Text>
                  <Text as="p" className="text-muted-foreground">
                    Modernize and improve existing codebases with confidence
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
              Ready to transform your coding workflow?
            </Text>
            <Text
              as="p"
              className="text-lg mb-8 max-w-2xl mx-auto opacity-90"
            >
              Join thousands of developers who are coding smarter with Claude
              Code
            </Text>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="secondary" size="lg">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent">
                Contact Sales
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
                <Text as="a" href="#" className="block text-sm">
                  Features
                </Text>
                <Text as="a" href="#" className="block text-sm">
                  Pricing
                </Text>
                <Text as="a" href="#" className="block text-sm">
                  Documentation
                </Text>
              </div>
            </div>

            <div>
              <Text as="h4" className="mb-4">
                Company
              </Text>
              <div className="space-y-2">
                <Text as="a" href="#" className="block text-sm">
                  About
                </Text>
                <Text as="a" href="#" className="block text-sm">
                  Blog
                </Text>
                <Text as="a" href="#" className="block text-sm">
                  Careers
                </Text>
              </div>
            </div>

            <div>
              <Text as="h4" className="mb-4">
                Resources
              </Text>
              <div className="space-y-2">
                <Text as="a" href="#" className="block text-sm">
                  Tutorials
                </Text>
                <Text as="a" href="#" className="block text-sm">
                  API Reference
                </Text>
                <Text as="a" href="#" className="block text-sm">
                  Community
                </Text>
              </div>
            </div>

            <div>
              <Text as="h4" className="mb-4">
                Legal
              </Text>
              <div className="space-y-2">
                <Text as="a" href="#" className="block text-sm">
                  Privacy
                </Text>
                <Text as="a" href="#" className="block text-sm">
                  Terms
                </Text>
                <Text as="a" href="#" className="block text-sm">
                  Security
                </Text>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-border pt-8 text-center">
            <Text as="p" className="text-sm text-muted-foreground">
              © 2024 Claude Code. All rights reserved.
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
}
