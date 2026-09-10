import type { Metadata } from "next";

import { CsrBackLink } from "./components/CsrBackLink";
import { CsrQuoteFetcher } from "./components/CsrQuoteFetcher";

export const metadata: Metadata = {
  title: "CSR — Client-Side Rendering",
  description:
    "A page demonstrating client-side rendering by fetching data in the browser after hydration.",
};

export default function CSRPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-8 bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <div className="flex w-full max-w-xl flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Client-Side Rendering (CSR)
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          The shell is server-rendered, then data is fetched in the browser
          after hydration.
        </p>
      </div>
      <CsrQuoteFetcher />
      <CsrBackLink />
    </div>
  );
}
