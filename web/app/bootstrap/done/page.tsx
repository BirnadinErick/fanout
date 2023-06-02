import Link from "next/link";

export default function BootstrapDone() {
  return (
    <main className="p-8 space-y-4">
      <section className="my-4">
        <h2>All is Done & well Done</h2>
        <p className="subtitle">You are now all set to use the service</p>
      </section>

      <section className="my-4">
        <h3 className="my-2 font-bold underline underline-offset-4">
          Leverage Hashnode for AI goodness
        </h3>
        <p className="text-gray-600 lg:w-1/2">
          You can leverage the AI of hashnode and setup the{" "}
          <b>backup to GitHub</b> feature. This way you can just write and then
          let the service take care of the rest.
        </p>
      </section>

      <section className="my-4">
        <h3 className="my-2 font-bold underline underline-offset-4">
          Fan Out your fans also
        </h3>
        <p className="text-gray-600 lg:w-1/2">You can also share </p>
        <pre>fan-out.birn.cc/[id]</pre>
        <p>
          {" "}
          link to then fan out your fans to their preffered platform. This way
          you get analytics, plus a central place for you to point out. Visit
          dashboard to get the{" "}
        </p>
        <pre>[id]</pre> <p> for particular post.</p>
      </section>

      <div className="my-8">
        <Link className="action-button" href={"/"}>
          Go To Dashboard
        </Link>
      </div>
    </main>
  );
}
