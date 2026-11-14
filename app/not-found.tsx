import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/site-chrome";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <SiteChrome>
      <Container className="flex flex-1 flex-col justify-center py-section">
        <Eyebrow className="mb-6">Error 404</Eyebrow>
        <h1 className="text-headline font-semibold">Page not found</h1>
        <p className="mt-5 max-w-prose text-base text-muted md:text-lg">
          The page you are looking for does not exist or may have moved.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/shop">Shop all essentials</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </SiteChrome>
  );
}
