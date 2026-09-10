import Link from "next/link";

const HOME_LINK_LABEL = "Back to home";

export function CsrBackLink() {
  return (
    <Link
      href="/"
      className="text-sm font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
    >
      {HOME_LINK_LABEL}
    </Link>
  );
}
