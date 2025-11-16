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
      <nav className="border-b-2 border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Text as="h3" className="font-bold">
              Claude Code
            </Text>
            <div className="hidden md:flex gap-6">
              <Text as="a" href="#features" className="text-sm">
                Features
              </Text>
              <Text as="a" href="#platform" className="text-sm">
                Platform
              </Text>
              <Text as="a" href="#docs" className="text-sm">
                Docs
              </Text>
            </div>
          </div>
          <Button variant="default" size="md">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="surface" size="md" className="mb-4">
            Built for developers
          </Badge>
          <Text as="h1" className="max-w-4xl mx-auto">
            AI-powered coding
            <br />
            at your command
          </Text>
          <Text
            as="p"
            className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground"
          >
            Claude Code is an interactive CLI tool that helps you write,
            understand, and improve code with AI assistance. Work faster and
            smarter with intelligent code completion and analysis.
          </Text>

          {/* Installation Commands */}
          <div className="max-w-3xl mx-auto mt-12 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Card className="flex-1 w-full sm:w-auto">
                <div className="p-4 flex items-center justify-between gap-4">
                  <code className="text-sm font-mono">
                    npm install -g @anthropic/claude-code
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        "npm install -g @anthropic/claude-code",
                        0,
                      )
                    }
                  >
                    {copiedIndex === 0 ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </Card>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="default" size="lg">
                Get Claude Code
              </Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
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
