"use client";

import { useCompletion } from "ai/react";
import { useEffect, useRef } from "react";
import wtf from "wtf_wikipedia";
//@ts-ignore
import wtfPluginHtml from "wtf-plugin-html";
wtf.extend(wtfPluginHtml);
import ReactHtmlParser from "react-html-parser";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export function WikiCompletion(props: { pagelink: string }) {
  const router = useRouter();
  const hasCompletedRef = useRef(false);
  wtf;

  const { completion, complete, isLoading } = useCompletion({
    api: `/api/ai`,
    headers: {
      pagelink: props.pagelink,
    },
  });

  useEffect(() => {
    if (completion == "setup-your-key") {
      router.push("/set-key?invalidkey=1");
    }
    if (!hasCompletedRef.current && completion.length < 1) {
      complete("");
      hasCompletedRef.current = true;
    }
  }, [completion, complete, router]);

  return (
    <div>
      <div className={`${completion == "setup-your-key" && "hidden"}`}>
        {
          //@ts-ignore
          ReactHtmlParser(wtf(completion).html())
        }
        {isLoading && <Loader size={20} className={`animate-spin`} />}
      </div>
    </div>
  );
}
