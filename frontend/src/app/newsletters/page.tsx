"use client";
// import { useState} from "react";
import dynamic from "next/dynamic";

const NewsletterClient = dynamic(() => import("./newsletteradminClient"), {
  ssr: false,
});

export default function NewslettersPage() {
  return <NewsletterClient />;
}
