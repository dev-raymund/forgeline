import { Container } from "@/components/ui/container";

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
        <h2 id="values-title" className="max-w-2xl text-headline font-extrabold font-wide">
          How we choose every product
        </h2>
        <ul role="list" className="mt-9 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-10">
          {principles.map((principle) => (
            <li key={principle.title} className="border-t-2 border-foreground pt-5">
              <h3 className="text-xl font-bold">{principle.title}</h3>
              <p className="mt-2 text-muted">{principle.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
