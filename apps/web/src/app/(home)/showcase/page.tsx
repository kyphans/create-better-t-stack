export const dynamic = "force-static";

import { api } from "@kps/backend/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import type { Metadata } from "next";

import { ShowcasePage } from "./_components/showcase-page";

export const metadata: Metadata = {
  title: "Showcase - KPS",
  description: "Projects created with KPS",
  openGraph: {
    title: "Showcase - KPS",
    description: "Projects created with KPS",
    url: "https://kps.pqky.dev/showcase",
    images: [
      {
        url: "https://r2.kps.pqky.dev/og.png",
        width: 1200,
        height: 630,
        alt: "KPS Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Showcase - KPS",
    description: "Projects created with KPS",
    images: ["https://r2.kps.pqky.dev/og.png"],
  },
};

export default async function Showcase() {
  const showcaseProjects = await fetchQuery(api.showcase.getShowcaseProjects);
  return <ShowcasePage showcaseProjects={showcaseProjects} />;
}
