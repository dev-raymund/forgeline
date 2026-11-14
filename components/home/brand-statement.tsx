import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HungPhoto } from "@/components/ui/hung-photo";
import { heroImage } from "@/lib/media";

/** A second, quieter stretch of board with the wide bench photograph. */
export function BrandStatement() {
  return (
    <section aria-labelledby="brand-title" className="bg-board">
      <Container className="grid items-center gap-9 py-section lg:grid-cols-12 lg:gap-14">
        <HungPhoto
          image={heroImage}
          alt="Everyday essentials lined up on an oak bench"
          sizes="(min-width: 90rem) 780px, (min-width: 64rem) 56vw, 100vw"
          imageClassName="object-[34%_50%] sm:object-center"
          className="aspect-[3/2] sm:aspect-[2/1] lg:col-span-7"
        />
        <div className="lg:col-span-5">
          <h2 id="brand-title" className="text-headline font-extrabold font-wide">
            Less clutter. Better choices.
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg">
            We believe everyday products should earn their place. Practical,
            thoughtfully selected essentials without the unnecessary noise.
          </p>
          <ButtonLink href="/about" variant="light" className="mt-7">
            Discover Forgeline
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
