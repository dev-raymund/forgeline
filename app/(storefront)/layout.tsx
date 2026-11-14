import type { ReactNode } from "react";
import { SiteChrome } from "@/components/layout/site-chrome";

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
