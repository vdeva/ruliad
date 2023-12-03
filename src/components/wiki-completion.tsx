"use client";

import { useCompletion } from "ai/react";
import { useEffect, useRef } from "react";
import wtf from "wtf_wikipedia";
//@ts-ignore
import wtfPluginHtml from "wtf-plugin-html";
wtf.extend(wtfPluginHtml);
import ReactHtmlParser from "react-html-parser";

export function WikiCompletion(props: { pagelink: string }) {
  // const [isLoaded, setIsLoaded] = useState(false);
  const hasCompletedRef = useRef(false);
  wtf;

  const { completion, complete } = useCompletion({
    api: `/api/ai`,
    headers: {
      pagelink: props.pagelink,
    },
  });

  useEffect(() => {
    if (!hasCompletedRef.current && completion.length < 1) {
      complete("");
      hasCompletedRef.current = true;
    }
  }, [completion, complete]);

  return (
    <div>
      <div className="">
        {
          //@ts-ignore
          ReactHtmlParser(wtf(completion).html())
        }
      </div>
    </div>
  );
}
