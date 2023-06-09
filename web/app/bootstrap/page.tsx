"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Client, Databases } from "appwrite";
import { COL_ID, DB_ID } from "./ids";
import { createId } from "@paralleldrive/cuid2";
import { useRouter, useSearchParams } from "next/navigation";

function SectionTitle({ title }: { title: string }) {
  return <h3 className="text-lg font-semibold">{title}</h3>;
}

function Section({
  title,
  state,
  setState,
}: {
  title: string;
  state: string;
  setState: any;
}) {
  return (
    <div className="my-8 space-y-2">
      <SectionTitle title={title} />

      <input
        className="p-1 font-mono border border-black"
        type="password"
        name={title.replaceAll(" ", "_").toLowerCase().replaceAll(".", "_")}
        id={title.replaceAll(" ", "_").toLowerCase().replaceAll(".", "_")}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="Token"
      />
    </div>
  );
}

export default function Bootstrap() {
  const [medium, setMedium] = useState("");
  const [dev, setDev] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  let uid: string | null;
  if (searchParams.has("uid")) {
    uid = searchParams.get("uid");
  } else {
    console.error("invalid URL");
    throw new Error("FANOUT Exception: invalid URL, can't proceed further");
  }

  function handleFormSubmit(
    e: FormEvent<HTMLFormElement>,
    med: string,
    dev: string,
    uid: string | null
  ) {
    e.preventDefault();

    if (uid === null) {
      console.error("required param not given");
      return 0;
    }

    const client = new Client();
    const databases = new Databases(client);

    client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

    console.log(uid);

    databases
      .createDocument(DB_ID, COL_ID, createId(), {
        uid: uid,
        med: med,
        dev: dev,
      })
      .then((res) =>
        router.push(`/bootstrap/webhook?uid=${res.uid}&did=${res.$id}`)
      )
      .catch((err) => console.error(err));
  }

  return (
    <section className="p-8">
      <h2>Bootstrap</h2>
      <p className="text-gray-400">
        Please provide following informations to bootstrap the service
      </p>

      <blockquote className="pl-4 my-4 text-gray-600 border-l-2 border-black lg:w-[500px]">
        Fan-Out need this imformation to post blogs to this platform. Token will
        let the service act on your behalf and post to the platform. Please note
        that these tokens are essentialy private to you and the respective
        paltforms are agaist giving out these to 3rd-party. They ask you to
        <span className="pl-2 font-bold text-pink-700">
          treat this like your password
        </span>
        . Please read the{" "}
        <Link
          className="text-blue-400 underline underline-offset-4"
          href={"/disclaimer"}
        >
          disclaimer
        </Link>{" "}
        before proceeding!
      </blockquote>

      <form onSubmit={(e) => handleFormSubmit(e, medium, dev, uid)}>
        <Section
          title="Medium Integration Token"
          state={medium}
          setState={setMedium}
        />

        <Section title="DEV.to Token" state={dev} setState={setDev} />

        <button className="action-button" type="submit">
          Bootstrap
        </button>
      </form>
    </section>
  );
}
