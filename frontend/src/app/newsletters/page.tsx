"use client";

import dynamic from "next/dynamic";

const NewsletterClient = dynamic(() => import("./newsletterClient"), {
  ssr: false,
});

export default function NewslettersPage() {
  return <NewsletterClient />;
}
