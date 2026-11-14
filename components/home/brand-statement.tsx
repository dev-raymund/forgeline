import { Arrow, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MediaFrame } from "@/components/ui/media-frame";
import { brandImage } from "@/lib/media";

export function BrandStatement() {
  return (
    <section aria-labelledby="brand-title" className="bg-surface">
      <Container className="grid items-center gap-8 py-section md:grid-cols-12 md:gap-10 lg:gap-16">
        <div className="md:order-2 md:col-span-7">
          <Eyebrow className="mb-5">Our approach</Eyebrow>
          <h2 id="brand-title" className="text-headline font-bold uppercase">
            Less clutter.
            <br />
            Better choices.
          </h2>
          <p className="mt-6 max-w-xl text-base text-muted md:text-lg">
            We believe everyday products should earn their place. Practical,
            thoughtfully selected essentials without the unnecessary noise.
          </p>
          <ButtonLink href="/about" variant="secondary" className="mt-8">
            Discover Forgeline
            <Arrow />
          </ButtonLink>
        </div>
        <div className="md:order-1 md:col-span-5">
          <MediaFrame
            image={brandImage}
            alt="A calm, uncluttered shelf with a few well-chosen essentials"
            sizes="(min-width: 90rem) 520px, (min-width: 48rem) 40vw, 100vw"
            className="aspect-[4/3] rounded-sm md:aspect-[4/5]"
          />
        </div>
      </Container>
    </section>
  );
}
