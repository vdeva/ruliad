"use client";

import { useCompletion } from "ai/react";
import { useEffect, useRef } from "react";

export function WikiCompletion(props: { pagelink: string }) {
  // const [isLoaded, setIsLoaded] = useState(false);
  const hasCompletedRef = useRef(false);

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
      <p>{completion}</p>
    </div>
  );
}
