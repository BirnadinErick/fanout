"use client";

import Link from "next/link";
import { useState } from "react";

export default function BootstrapWebhook({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const url = `${
    process.env.NEXT_PUBLIC_HOSTNAME
  }/trigger/${searchParams.uid!}/${searchParams.did!}`;

  const [copyText, setCopyText] = useState("copy to clipboard");
  return (
    <main className="p-8">
      <section>
        <h2>Final Touch</h2>
        <p className="subtitle">Let{"'"}s set up the trigger</p>
      </section>

      <section className="my-8">
        <p className="text-gray-700">
          Add this URL to your GitHub repo&apos;s Webhook
        </p>

        <div className="overflow-auto p-2 my-4 font-mono text-sm text-gray-900 bg-gray-300 lg:w-1/2">
          <pre>{url}</pre>
        </div>

        <button
          className="text-sm text-sky-500 underline lowercase underline-offset-2"
          onClick={() => {
            navigator.clipboard.writeText(url);
            setCopyText("Copied!");
          }}
        >
          {copyText}
        </button>
      </section>

      <section className="my-4">
        <div>
          <Link href="/bootstrap/done" className="action-button">
            Finish
          </Link>
        </div>
      </section>
    </main>
  );
}
