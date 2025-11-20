"use client";

import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import { Badge } from "@/components/retroui/Badge";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface FileData {
  id: number;
  name: string;
  keyId: string;
  OriginalViewUrl: string;
  OriginalDownloadUrl: string;
  ShortViewUrl?: string;
  ShortDownloadUrl?: string;
  size: number;
  createdAt: string;
}

interface User {
  id: number;
  email: string;
}

export default function UploadPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<FileData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [fetchingFiles, setFetchingFiles] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const singleFileRef = useRef<HTMLInputElement>(null);
  const multipleFileRef = useRef<HTMLInputElement>(null);

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
      fetchUserFiles(token);
    } catch (err) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const fetchUserFiles = async (token: string) => {
    setFetchingFiles(true);
    try {
      const readerUrl = process.env.NEXT_PUBLIC_READER_API_URL || "http://localhost:8080";
      const response = await fetch(`${readerUrl}/api/files/my-files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || data || []);
      }
    } catch (err) {
      console.error("Failed to fetch files:", err);
    } finally {
      setFetchingFiles(false);
    }
  };

  const handleSingleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await uploadFiles([file], "single");
    if (singleFileRef.current) singleFileRef.current.value = "";
  };

  const handleMultipleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const filesArray = Array.from(fileList);
    await uploadFiles(filesArray, "multiple");
    if (multipleFileRef.current) multipleFileRef.current.value = "";
  };

  const uploadFiles = async (filesToUpload: File[], type: "single" | "multiple") => {
    setUploading(true);
    setUploadError("");
    setUploadSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const writerUrl = process.env.NEXT_PUBLIC_WRITER_API_URL || "http://localhost:8081";
      const formData = new FormData();

      if (type === "single") {
        formData.append("file", filesToUpload[0]);
      } else {
        filesToUpload.forEach((file) => {
          formData.append("files", file);
        });
      }

      const endpoint = type === "single" ? "/api/upload/single" : "/api/upload/multiple";
      const response = await fetch(`${writerUrl}${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadSuccess(
          type === "single"
            ? "File uploaded successfully!"
            : `${filesToUpload.length} files uploaded successfully!`
        );
        fetchUserFiles(token);
      } else {
        setUploadError(data.message || "Upload failed. Please try again.");
      }
    } catch (err) {
      setUploadError("Network error. Please check your connection.");
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = async (url: string, fileId: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(fileId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
            <span className="text-sm text-muted-foreground">Upload</span>
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
              File Upload
            </Text>
            <Text as="p" className="text-muted-foreground">
              Upload and manage your files
            </Text>
          </div>

          {/* Upload Section */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {/* Single File Upload */}
            <Card className="border-foreground border-2 shadow-xl">
              <Card.Header className="border-b-2 border-foreground bg-primary/10">
                <Card.Title>Single File</Card.Title>
                <Card.Description>Upload one file at a time</Card.Description>
              </Card.Header>
              <Card.Content className="pt-6">
                <input
                  ref={singleFileRef}
                  type="file"
                  onChange={handleSingleUpload}
                  className="hidden"
                  id="single-upload"
                />
                <Button
                  variant="default"
                  size="lg"
                  className="w-full border-foreground"
                  onClick={() => singleFileRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Select File"}
                </Button>
              </Card.Content>
            </Card>

            {/* Multiple File Upload */}
            <Card className="border-foreground border-2 shadow-xl">
              <Card.Header className="border-b-2 border-foreground bg-accent/10">
                <Card.Title>Multiple Files</Card.Title>
                <Card.Description>Upload up to 10 files at once</Card.Description>
              </Card.Header>
              <Card.Content className="pt-6">
                <input
                  ref={multipleFileRef}
                  type="file"
                  multiple
                  onChange={handleMultipleUpload}
                  className="hidden"
                  id="multiple-upload"
                />
                <Button
                  variant="default"
                  size="lg"
                  className="w-full border-foreground"
                  onClick={() => multipleFileRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Select Files"}
                </Button>
              </Card.Content>
            </Card>
          </div>

          {/* Upload Status Messages */}
          {uploadError && (
            <div className="mb-6 bg-destructive/10 border-2 border-destructive rounded p-3">
              <Text as="p" className="text-sm text-destructive">
                {uploadError}
              </Text>
            </div>
          )}

          {uploadSuccess && (
            <div className="mb-6 bg-primary/10 border-2 border-primary rounded p-3">
              <Text as="p" className="text-sm text-primary">
                {uploadSuccess}
              </Text>
            </div>
          )}

          {/* Files List */}
          <Card className="border-foreground border-2 shadow-xl">
            <Card.Header className="border-b-2 border-foreground bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <Card.Title>Your Files</Card.Title>
                  <Card.Description>
                    {files.length} file{files.length !== 1 ? "s" : ""} uploaded
                  </Card.Description>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    if (token) fetchUserFiles(token);
                  }}
                  disabled={fetchingFiles}
                  className="border-foreground"
                >
                  {fetchingFiles ? "Loading..." : "Refresh"}
                </Button>
              </div>
            </Card.Header>
            <Card.Content className="pt-6">
              {fetchingFiles && files.length === 0 ? (
                <Text as="p" className="text-muted-foreground text-center py-8">
                  Loading files...
                </Text>
              ) : files.length === 0 ? (
                <Text as="p" className="text-muted-foreground text-center py-8">
                  No files uploaded yet. Upload your first file above!
                </Text>
              ) : (
                <div className="space-y-4">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="border-2 border-foreground rounded p-4 bg-card"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <Text as="p" className="font-bold truncate">
                            {file.name}
                          </Text>
                          <Text as="p" className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)}
                          </Text>
                        </div>
                        <Badge variant="surface" size="sm">
                          #{file.id}
                        </Badge>
                      </div>

                      {/* File URLs */}
                      <div className="mt-4 space-y-2">
                        {/* View URL */}
                        <div className="flex items-center gap-2">
                          <Text as="p" className="text-xs text-muted-foreground w-16">
                            View:
                          </Text>
                          <div className="flex-1 bg-muted/30 border border-foreground rounded px-2 py-1 text-xs truncate">
                            {file.ShortViewUrl || file.OriginalViewUrl}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                file.ShortViewUrl || file.OriginalViewUrl,
                                file.id
                              )
                            }
                            className="border-foreground text-xs px-2"
                          >
                            {copiedId === file.id ? "Copied!" : "Copy"}
                          </Button>
                        </div>

                        {/* Download URL */}
                        <div className="flex items-center gap-2">
                          <Text as="p" className="text-xs text-muted-foreground w-16">
                            Download:
                          </Text>
                          <div className="flex-1 bg-muted/30 border border-foreground rounded px-2 py-1 text-xs truncate">
                            {file.ShortDownloadUrl || file.OriginalDownloadUrl}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                file.ShortDownloadUrl || file.OriginalDownloadUrl,
                                file.id + 1000
                              )
                            }
                            className="border-foreground text-xs px-2"
                          >
                            {copiedId === file.id + 1000 ? "Copied!" : "Copy"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}
