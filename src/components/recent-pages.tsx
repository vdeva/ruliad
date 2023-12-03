import { PagePayload } from "@/lib/types";
import { kv } from "@vercel/kv";
import Link from "next/link";
import "@/styles/wiki.css";

export const revalidate = 20;

export async function RecentPages() {
  const { signal } = new AbortController();

  function truncateStr(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    } else {
      return str;
    }
  }

  // Fetch all page IDs from the sorted set 'pagesByCreation'
  const recentPageIds = await kv.zrange("pagesByCreation", 0, 32, {
    rev: true,
  });

  // Initialize an array to hold the fetched pages
  const results: PagePayload[] = [];

  // Fetch each page's details using the page IDs
  for (const id of recentPageIds) {
    const page = await kv.hgetall(`page:${id}`);
    if (page) {
      results.push(page as PagePayload);
    }
  }

  return (
    <div className="px-6 py-4 shadow-sm border border-neutral-300 bg-neutral-50 w-full flex flex-col">
      <p className="text-md font-semibold w-full text-center pb-2">New Pages</p>
      {results.map((page, i) => (
        <Link className="text-sm" key={page.id} href={`/wiki/${page.title}`}>
          • {truncateStr(page.title, 20)}
        </Link>
      ))}
    </div>
  );
}
