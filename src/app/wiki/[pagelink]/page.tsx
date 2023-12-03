import { RecentPages } from "@/components/recent-pages";
import { WikiCompletion } from "@/components/wiki-completion";
import "@/styles/wiki.css";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

export default async function WikiPage({
  params,
}: {
  params: { pagelink: string };
}) {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex flex-col sm:flex-row w-full justify-between px-8 pt-12 max-w-[1300px] pb-40">
        <div className="w-full max-w-[300px] flex flex-col items-center">
          <Link href={"/"} className="flex flex-row gap-3 items-center">
            <Image src="/wikilogo.svg" alt="wikilogo" width={50} height={50} />
            <p className="max-w-[240px] w-full text-center text-4xl font-mono pt-1 no-underline">
              Ruliad
            </p>
          </Link>
          <p className="text-sm font-mono">The Generative Encyclopedia</p>
          <div className="max-w-[240px] h-[1.2px] w-full bg-neutral-600 mb-5" />
          <div className="max-w-[240px] w-full">
            <RecentPages />
          </div>
        </div>
        <div className="max-w-[900px] flex flex-col w-full">
          <p className="text-3xl font-semibold w-full">{params.pagelink}</p>
          <div className="h-[1.2px] w-full bg-neutral-600 mb-5" />
          <WikiCompletion pagelink={params.pagelink} />
        </div>
      </div>
    </div>
  );
}
