import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/site-chrome";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <SiteChrome>
      <Container className="flex flex-1 flex-col justify-center py-section">
        <div
          aria-hidden="true"
          className="mb-8 flex h-28 w-36 items-center justify-center border-2 border-dashed border-outline text-sm text-muted"
        >
          Nothing here
        </div>
        <h1 className="text-headline font-extrabold font-wide">Page not found</h1>
        <p className="mt-4 max-w-prose text-lg text-muted">
          The page you are looking for does not exist or may have moved
          (error 404).
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/shop">Shop all essentials</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </SiteChrome>
  );
}
