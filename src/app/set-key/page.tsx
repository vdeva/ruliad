"use client";

import Image from "next/image";
import Link from "next/link";
import { setKey } from "../_actions/key";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import "@/styles/wiki.css";

export default function AddKey() {
  const searchParams = useSearchParams();
  const [aikey, setAikey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBadaikey, setIsBadaikey] = useState(false);

  const aikeyRegex = /^.{5,64}$/;

  const invalidKey = searchParams.get("invalidkey");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsBadaikey(false);
    if (!aikeyRegex.test(aikey)) {
      setIsBadaikey(true);
      setIsLoading(false);
      return;
    }
    const setupres = await setKey(aikey);
    if (setupres == "error") {
      setIsBadaikey(true);
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-8 w-full font-mono">
      {invalidKey && (
        <div>
          <p className="text-red-500 font-medium">
            Your OpenAI API key is either invalid or missing.
          </p>
        </div>
      )}
      <div className="flex flex-col items-center gap-3 mt-5 w-full">
        <div className="flex flex-col gap-0 max-h-24">
          <Link
            href={"/"}
            className="flex flex-row items-center justify-center gap-2 h-16"
          >
            <Image src="/wikilogo.svg" alt="wikilogo" width={50} height={50} />
            <p className="text-center text-5xl font-mono pt-2">Ruliad</p>
          </Link>
          <p className="text-md font-mono">The Generative Encyclopedia</p>
          <div className="w-full flex flex-col items-center"></div>
        </div>
        <div>
          <div className="w-full flex flex-col items-center gap-2">
            <p className="text-emerald-600 font-semibold pb-1 max-w-[340px] text-center">
              An OpenAI API key is required if you want to generate new pages.
            </p>
            <Link
              target="_blank"
              href={"https://platform.openai.com/api-keys"}
              className="underline pb-4"
            >
              Get your key
            </Link>
            <form
              className="bg-white 
              shadow-md ring-[1.2px] ring-neutral-200
              px-6 py-5 flex flex-col gap-5 max-w-[340px]
              "
              onSubmit={handleSubmit}
            >
              {/* <div>
                <p className="text-md font-semibold">Set your OpenAI API key</p>
                <p className=" text-sm text-neutral-500 font-medium">
                  to continue to Ruliad
                </p>
              </div> */}
              <label className="flex flex-col justify-start">
                <p className="pb-2 font-medium text-md">OpenAI API key</p>
                <input
                  className={`py-2 px-4
          focus:outline-none text-sm
          ${
            isBadaikey
              ? `border-red-500`
              : `border-neutral-300 focus:border-blue-600`
          }
          border-[1.5px]
          w-full
          `}
                  disabled={isLoading}
                  type="password"
                  placeholder="sk-xxxxxxxxxxxxxxx"
                  id="email"
                  name="email"
                  value={aikey}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setAikey(event.target.value)
                  }
                />
                {isBadaikey && (
                  <p className="mt-1 text-sm text-red-500">
                    Key must be valid.
                  </p>
                )}
              </label>
              <button
                className={`mt-2 w-full p-2 bg-blue-500 border-2 border-blue-500 text-sm
                hover:bg-blue-800 hover:border-blue-800
                text-white  font-semibold ${isLoading && `animate-pulse`}
                `}
                type="submit"
                disabled={isLoading}
              >
                Submit
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center mt-8 gap-3">
            <p className="text-xs font-sans text-neutral-400">
              Your key must be valid and have access to the gpt-4-1106-preview
              model.
            </p>
            <p className="text-xs font-sans text-neutral-400">
              Your key will be encrypted and saved locally as a cookie. No
              record of it will be saved by Ruliad.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
