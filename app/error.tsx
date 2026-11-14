"use client"; // Error boundaries must be Client Components.

import Link from "next/link";
import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Wordmark } from "@/components/ui/wordmark";

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    // Replace with an error-reporting service when one is configured.
    console.error(error);
  }, [error]);

  const digest =
    error instanceof Error && "digest" in error && typeof error.digest === "string"
      ? error.digest
      : undefined;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-line">
        <Container className="flex h-16 items-center">
          <Link href="/" aria-label="Forgeline home" className="text-base">
            <Wordmark />
          </Link>
        </Container>
      </header>
      <main id="main" className="flex flex-1 flex-col">
        <Container className="flex flex-1 flex-col justify-center py-section">
          <Eyebrow className="mb-6">Something went wrong</Eyebrow>
          <h1 className="text-headline font-semibold">
            We couldn’t load this page
          </h1>
          <p className="mt-5 max-w-prose text-base text-muted md:text-lg">
            An unexpected error occurred. Please try again, or return to the
            homepage.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => retry()}>Try again</Button>
            <ButtonLink href="/" variant="secondary">
              Back to home
            </ButtonLink>
          </div>
          {digest && (
            <p className="mt-8 font-mono text-xs text-muted">
              Reference: {digest}
            </p>
          )}
        </Container>
      </main>
    </div>
  );
}
