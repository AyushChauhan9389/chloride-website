"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Text } from "@/components/retroui/Text";

export default function ShortUrlRedirect() {
  const params = useParams();
  const shortCode = params.shortCode as string;
  const [error, setError] = useState("");

  useEffect(() => {
    const redirect = async () => {
      try {
        const readerUrl = process.env.NEXT_PUBLIC_READER_API_URL || "http://localhost:8080";

        // Fetch the redirect URL from the reader service
        const response = await fetch(`${readerUrl}/${shortCode}`, {
          method: "GET",
          redirect: "manual", // Don't follow redirects, we want to get the URL
        });

        // If the reader service returns a redirect (302/301)
        if (response.type === "opaqueredirect" || response.status === 302 || response.status === 301) {
          // Get the Location header
          const location = response.headers.get("Location");
          if (location) {
            window.location.href = location;
            return;
          }
        }

        // Try to get redirect info from response
        if (response.ok) {
          const data = await response.json();
          if (data.url || data.originalUrl) {
            window.location.href = data.url || data.originalUrl;
            return;
          }
        }

        // If we can't get the redirect, try direct navigation to reader service
        window.location.href = `${readerUrl}/${shortCode}`;

      } catch (err) {
        // Fallback: redirect directly to reader service
        const readerUrl = process.env.NEXT_PUBLIC_READER_API_URL || "http://localhost:8080";
        window.location.href = `${readerUrl}/${shortCode}`;
      }
    };

    if (shortCode) {
      redirect();
    }
  }, [shortCode]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Text as="p" className="text-muted-foreground">
          Redirecting...
        </Text>
        {error && (
          <Text as="p" className="text-destructive mt-2">
            {error}
          </Text>
        )}
      </div>
    </div>
  );
}
