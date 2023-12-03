import { RecentPages } from "@/components/recent-pages";
import { RecentPagesLoading } from "@/components/recent-pages-loading";
import { SearchBar } from "@/components/search-bar";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-8 w-full">
      <div className="flex flex-col items-center gap-5 mt-8 w-full">
        <Image src="/wikilogo.svg" alt="wikilogo" width={200} height={200} />
        <div className="">
          <p className="text-center text-5xl font-mono">Ruliad</p>
          <p className="text-xl font-mono">The Generative Encyclopedia</p>
          <div className="w-full flex flex-col items-center">
            <Link
              href={`https://twitter.com/${process.env.TWITTER_USERNAME}`}
              className="text-md font-mono w-full text-center"
            >
              @onetwoval
            </Link>
          </div>
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
