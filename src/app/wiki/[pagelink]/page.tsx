import { WikiCompletion } from "@/components/wiki-completion";

export default async function WikiPage({
  params,
}: {
  params: { pagelink: string };
}) {
  return (
    <div>
      <WikiCompletion pagelink={params.pagelink} />
    </div>
  );
}
