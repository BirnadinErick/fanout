import Link from "next/link";

export default function Home() {
  return (
    <section className="p-8 space-y-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Fan Out</h1>
        <p className="subtitle">Welcome to the Dashboard!</p>
      </header>

      <p className="subtitle">Authenticate to further proceeed</p>
      <div className="space-x-4">
        <Link href={"/auth"} className="action-button">
          Sign up{" "}
        </Link>
        <Link href={"/auth/login"} className="action-button">
          Log In
        </Link>
      </div>
    </section>
  );
}
