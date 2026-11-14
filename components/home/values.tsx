import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

const principles = [
  {
    title: "Chosen for use",
    body: "Each product is selected for how well it fits into daily life, not for novelty.",
  },
  {
    title: "Clear information",
    body: "Straightforward descriptions and specifications, so you know what you are choosing.",
  },
  {
    title: "Fewer, better things",
    body: "A focused range across five collections instead of endless choice.",
  },
] as const;

export function Values() {
  return (
    <section aria-labelledby="values-title">
      <Container className="py-section">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-5">What we stand for</Eyebrow>
            <h2 id="values-title" className="text-title font-bold uppercase">
              How we choose every product
            </h2>
          </div>
          <ol className="grid gap-8 sm:grid-cols-3 sm:gap-6 lg:col-span-8 lg:gap-10">
            {principles.map((principle, index) => (
              <li key={principle.title} className="border-t-2 border-foreground pt-5">
                <span
                  aria-hidden="true"
                  className="block font-mono text-4xl font-medium tracking-tight text-accent md:text-5xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-bold uppercase tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{principle.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
