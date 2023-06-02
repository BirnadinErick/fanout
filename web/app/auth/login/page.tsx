"use client";

import { Account, Client } from "appwrite";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  function handleFormSubmit(
    e: FormEvent<HTMLFormElement>,
    email: string,
    pass: string
  ) {
    e.preventDefault();

    const client = new Client();
    const account = new Account(client);

    client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

    account
      .createEmailSession(email, pass)
      .then(() => router.push("/"))
      .catch((err) => console.error(err));
  }

  return (
    <section className="p-8">
      <header>
        <h2>LogIn</h2>
        <p className="subtitle">Log In to continue</p>
      </header>

      <div className="my-4">
        <form
          className="space-y-4"
          onSubmit={(e) => handleFormSubmit(e, email, pass)}
        >
          <input
            autoFocus
            className="p-1 bg-gray-100 border border-gray-800"
            placeholder="Email Address"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-1 text-gray-100 bg-gray-800"
            placeholder="Password"
            type="password"
            name="pass"
            id="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button className="block action-button" type="submit">
            Log In
          </button>
        </form>
      </div>
    </section>
  );
}
