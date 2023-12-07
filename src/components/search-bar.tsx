"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (inputValue.length > 0) {
      router.push(`/wiki/${encodeURI(inputValue)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row w-full shadow-sm">
      <input
        disabled={isLoading}
        className="py-2 px-4 text-lg w-full focus-visible:outline-none border-2 border-neutral-300 focus-visible:border-blue-500"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Go to page..."
      />
      <button
        className="py-2 px-3 text-lg bg-blue-500 text-white font-medium"
        type="submit"
      >
        Go!
      </button>
    </form>
  );
}
