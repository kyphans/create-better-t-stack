import { api } from "@kps/backend/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import type { Metadata } from "next";

import { AnalyticsClient } from "./analytics-client";

export const metadata: Metadata = {
  title: "Analytics - KPS",
  description: "Convex-backed project creation analytics for KPS.",
  openGraph: {
    title: "Analytics - KPS",
    description: "Convex-backed project creation analytics for KPS.",
    url: "https://kps.pqky.dev/analytics",
    images: [
      {
        url: "https://r2.kps.pqky.dev/og.png",
        width: 1200,
        height: 630,
        alt: "KPS Convex Analytics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Analytics - KPS",
    description: "Convex-backed project creation analytics for KPS.",
    images: ["https://r2.kps.pqky.dev/og.png"],
  },
};

export default async function Analytics() {
  const [preloadedStats, preloadedDailyStats, preloadedMonthlyStats] = await Promise.all([
    preloadQuery(api.analytics.getStats, {}),
    preloadQuery(api.analytics.getDailyStats, { days: 30 }),
    preloadQuery(api.analytics.getMonthlyStats, {}),
  ]);

  return (
    <AnalyticsClient
      preloadedStats={preloadedStats}
      preloadedDailyStats={preloadedDailyStats}
      preloadedMonthlyStats={preloadedMonthlyStats}
    />
  );
}
