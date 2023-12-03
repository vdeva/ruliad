import { RecentPages } from "@/components/recent-pages";
import { SearchBar } from "@/components/search-bar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-8 w-full">
      <div className="flex flex-col items-center gap-5 mt-8 w-full">
        <Image src="/wikilogo.svg" alt="wikilogo" width={200} height={200} />
        <div>
          <p className="text-center text-5xl font-mono">Ruliad</p>
          <p className="text-xl font-mono">The Generative Encyclopedia</p>
        </div>
        <div className="max-w-[500px] w-full mb-4">
          <SearchBar />
        </div>
        <div className="max-w-[300px] w-full">
          <RecentPages />
        </div>
      </div>
    </main>
  );
}
