"use client";

import Link from "next/link";

export function Footer() {
  return (
    <div className="w-full border border-neutral-300 bg-neutral-50 p-5 flex flex-row justify-center gap-8">
      <Link target="_blank" href={`${process.env.NEXT_PUBLIC_GH_LINK}`}>
        Ruliad Github
      </Link>
      <Link
        target="_blank"
        href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_USERNAME}`}
      >
        @{process.env.NEXT_PUBLIC_TWITTER_USERNAME}
      </Link>
    </div>
  );
}
