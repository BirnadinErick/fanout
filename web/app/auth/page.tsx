"use client";

import { FormEvent, useState } from "react";
import { Client, Account } from "appwrite";
import { useRouter } from "next/navigation";
import { createId } from "@paralleldrive/cuid2";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, SetName] = useState("");
  const router = useRouter();

  function handleAuthSubmit(
    e: FormEvent<HTMLFormElement>,
    email: string,
    pass: string,
    name: string
  ) {
    e.preventDefault();

    const client = new Client();
    const account = new Account(client);

    // create user and move to next step
    client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

    const uid = createId();

    account
      .create(uid, email, pass, name)
      .then((res) => {
        console.info("sign up done!");
        account
          .createEmailSession(email, pass)
          .then(() => router.push(`/bootstrap?uid=${uid}`))
          .catch((err) => console.error(err));

        router.push(`/bootstrap?uid=${uid}`);
      })
      .catch((err) => {
        console.error("something went wrong");
      });
  }

  return (
    <form
      className="p-8"
      onSubmit={(e) => handleAuthSubmit(e, email, pass, name)}
    >
      <div>
        <h2>Authenticate Yourself</h2>
        <p className="subtitle">
          You need to authenticate yourself to use the service
        </p>
      </div>

      <div className="my-8 space-y-4">
        <input
          className="p-1 border border-black"
          type="text"
          name="name"
          id="name"
          placeholder="Your Display Name"
          autoFocus
          value={name}
          onChange={(e) => SetName(e.target.value)}
        />

        <br />

        <input
          className="p-1 mr-2 border border-black"
          type="email"
          name="mail"
          id="mail"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="p-1 text-white bg-gray-900"
          type="password"
          name="pass"
          id="pass"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <button type="submit" className="action-button">
        Sign Me In
      </button>
    </form>
  );
}
