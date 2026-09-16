import Link from "next/link";

const HOME_LINK_LABEL = "Back to home";

export function PprBackLink() {
  return (
    <Link
      href="/"
      className="font-medium text-sm text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
    >
      {HOME_LINK_LABEL}
    </Link>
  );
}
