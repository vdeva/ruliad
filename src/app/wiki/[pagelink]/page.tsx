import { RecentPages } from "@/components/recent-pages";
import { RecentPagesLoading } from "@/components/recent-pages-loading";
import { WikiCompletion } from "@/components/wiki-completion";
import "@/styles/wiki.css";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 20;

type Props = {
  params: { pagelink: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params

  // fetch data

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${params.pagelink.replace("_", " ")} - Ruliad`,
    metadataBase: new URL("https://ruliad.vercel.app"),
    openGraph: {
      images: ["/rldmet.png"],
    },
  };
}

export default async function WikiPage({ params, searchParams }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex flex-col sm:flex-row w-full justify-between px-8 pt-12 max-w-[1300px] pb-40">
        <div className="w-full max-w-[300px] flex flex-col items-center">
          <Link
            href={"/"}
            className="flex flex-row gap-3 items-center max-h-16"
          >
            <Image src="/wikilogo.svg" alt="wikilogo" width={48} height={48} />
            <p className="max-w-[240px] w-full text-center text-4xl font-mono pt-2 no-underline">
              Ruliad
            </p>
          </Link>
          <p className="text-sm font-mono pb-2">The Generative Encyclopedia</p>
          <div className="w-full flex flex-col items-center"></div>
          <div className="max-w-[240px] h-[1.2px] w-full bg-neutral-600 mb-5" />
          <div className="max-w-[240px] w-full md:block hidden">
            <Suspense fallback={<RecentPagesLoading />}>
              <RecentPages />
            </Suspense>
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
