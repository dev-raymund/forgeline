import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: "How to get in touch with FORGELINE.",
  path: "/contact",
});

export default function ContactPage() {
  const channels = [
    {
      label: "Email",
      value: site.contactEmail ? (
        <a
          href={`mailto:${site.contactEmail}`}
          className="underline underline-offset-4"
        >
          {site.contactEmail}
        </a>
      ) : (
        <span className="text-muted">Published at launch</span>
      ),
    },
    {
      label: "Order support",
      value: (
        <span className="text-muted">Available once ordering opens</span>
      ),
    },
  ];

  return (
    <Container className="pb-section">
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description={`${site.name} is preparing for launch. Support channels are being set up and will be listed here before the store opens.`}
      />

      <section
        aria-labelledby="contact-channels"
        className="grid gap-8 py-section md:grid-cols-12 md:gap-12"
      >
        <h2
          id="contact-channels"
          className="text-2xl font-semibold tracking-tight md:col-span-5"
        >
          Support channels
        </h2>
        <dl className="divide-y divide-line border-y border-line md:col-span-7">
          {channels.map((channel) => (
            <div key={channel.label} className="grid grid-cols-3 gap-4 py-4">
              <dt className="font-medium">{channel.label}</dt>
              <dd className="col-span-2">{channel.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="max-w-prose text-sm text-muted">
        In the meantime, you can{" "}
        <Link href="/about" className="text-foreground underline underline-offset-4">
          read more about FORGELINE
        </Link>{" "}
        or{" "}
        <Link href="/shop" className="text-foreground underline underline-offset-4">
          preview the shop
        </Link>
        .
      </p>
    </Container>
  );
}
