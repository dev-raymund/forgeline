"use client"; // Error boundaries must be Client Components.

import Link from "next/link";
import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
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
      <header className="bg-board">
        <Container className="flex h-14 items-center lg:h-21">
          <Link
            href="/"
            aria-label="Forgeline home"
            className="text-[1.1875rem] lg:text-[1.4375rem]"
          >
            <Wordmark />
          </Link>
        </Container>
      </header>
      <main id="main" className="flex flex-1 flex-col">
        <Container className="flex flex-1 flex-col justify-center py-section">
          <h1 className="text-headline font-extrabold font-wide">
            We couldn’t load this page
          </h1>
          <p className="mt-4 max-w-prose text-lg text-muted">
            Something went wrong on our side. Try again, or go back to the
            homepage.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => retry()}>Try again</Button>
            <ButtonLink href="/" variant="secondary">
              Back to home
            </ButtonLink>
          </div>
          {digest && (
            <p className="mt-8 text-sm text-muted">Reference: {digest}</p>
          )}
        </Container>
      </main>
    </div>
  );
}
