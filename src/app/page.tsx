import { RecentPages } from "@/components/recent-pages";
import { RecentPagesLoading } from "@/components/recent-pages-loading";
import { SearchBar } from "@/components/search-bar";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 20;

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-8 pt-8 pb-20 w-full">
      <div className="flex flex-col items-center gap-5 mt-8 w-full">
        <Image src="/wikilogo.svg" alt="wikilogo" width={200} height={200} />
        <div className="">
          <p className="text-center text-5xl font-mono">Ruliad</p>
          <p className="text-xl font-mono">The Generative Encyclopedia</p>
          {/* <div className="w-full flex flex-col items-center">
            <Link
              target="_blank"
              href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_USERNAME}`}
              className="text-md font-mono w-full text-center"
            >
              @{process.env.NEXT_PUBLIC_TWITTER_USERNAME}
            </Link>
          </div> */}
        </div>
        <div className="max-w-[500px] w-full mb-4">
          <SearchBar />
        </div>
        <div className="max-w-[300px] w-full">
          <Suspense fallback={<RecentPagesLoading />}>
            <RecentPages />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
