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
    title: `${decodeURI(params.pagelink)} - Ruliad`,
    description: "The Generative Encyclopedia",
    metadataBase: new URL("https://ruliad.vercel.app"),
    openGraph: {
      images: ["/rldmet.png"],
    },
  };
}

export default async function WikiPage({ params, searchParams }: Props) {
  return (
    <div className="max-w-[900px] flex flex-col w-full">
      <p className="md:text-3xl font-semibold w-full md:text-left text-center">
        {decodeURIComponent(params.pagelink)}
      </p>
      <div className="h-[1.2px] w-full bg-neutral-600 mb-5" />
      <WikiCompletion pagelink={params.pagelink} />
    </div>
  );
}
