import type { Metadata } from "next";
import { Suspense } from "react";

import { fetchSponsors } from "@/lib/sponsors";

import { StackBuilder } from "./_components/stack-builder";

export const metadata: Metadata = {
  title: "Stack Builder - KPS",
  description: "Interactive Ui to roll your own stack",
  openGraph: {
    title: "Stack Builder - KPS",
    description: "Interactive Ui to roll your own stack",
    url: "https://kps.pqky.dev/new",
    images: [
      {
        url: "https://r2.kps.pqky.dev/og.png",
        width: 1200,
        height: 630,
        alt: "KPS Stack Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stack Builder - KPS",
    description: "Interactive Ui to roll your own stack",
    images: ["https://r2.kps.pqky.dev/og.png"],
  },
};

export default async function FullScreenStackBuilder() {
  const sponsorsData = await fetchSponsors();

  return (
    <Suspense>
      <div className="grid h-[calc(100vh-64px)] w-full flex-1 grid-cols-1 overflow-hidden">
        <StackBuilder specialSponsors={sponsorsData.specialSponsors} />
      </div>
    </Suspense>
  );
}
