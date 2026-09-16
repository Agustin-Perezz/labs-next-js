import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  content: string;
}

const POSTS_CACHE_TAG = "blog-posts";

// Next.js invalidates this cached fetch at most once every 60 seconds
// when a request comes in after the TTL expired.
async function getPost(id: string): Promise<Post> {
  "use cache";
  cacheTag(POSTS_CACHE_TAG);
  cacheLife({ revalidate: 60, expire: 300 });

  return fetch(`https://api.vercel.app/blog/${id}`).then((res) => res.json());
}

// Next.js will invalidate the cache at most once every 60 seconds when a
// request comes in after the TTL expired. The list of posts is also cached
// so it stays stable across builds.
async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheTag(POSTS_CACHE_TAG);
  cacheLife({ revalidate: 60, expire: 300 });

  return fetch("https://api.vercel.app/blog").then((res) => res.json());
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    id: String(post.id),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <Card className="w-full max-w-xl bg-white text-zinc-900 ring-zinc-200 dark:bg-black dark:text-zinc-50 dark:ring-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {post.title}
          </CardTitle>
          <CardDescription className="text-zinc-600 dark:text-zinc-400">
            Post #{post.id} — rendered with Incremental Static Regeneration
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            {post.content}
          </p>
          <section>
            <h2 className="mb-2 font-medium text-lg">How this example works</h2>
            <ul className="list-disc space-y-1 pl-5 text-zinc-700 text-sm dark:text-zinc-300">
              <li>
                The{" "}
                <code className="rounded bg-zinc-100 px-1 py-0.5 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
                  "use cache"
                </code>{" "}
                directive plus{" "}
                <code className="rounded bg-zinc-100 px-1 py-0.5 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
                  cacheLife({"{"} revalidate: 60 {"}"})
                </code>{" "}
                mark the data fetch as cacheable for 60 seconds
              </li>
              <li>
                <code className="rounded bg-zinc-100 px-1 py-0.5 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
                  generateStaticParams
                </code>{" "}
                enables ISR for the dynamic route by returning the list of posts
                to prerender
              </li>
              <li>
                During{" "}
                <code className="rounded bg-zinc-100 px-1 py-0.5 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
                  next build
                </code>
                , a page is prerendered for each post
              </li>
              <li>
                All requests made to these pages (e.g.{" "}
                <code className="rounded bg-zinc-100 px-1 py-0.5 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
                  /blog/1
                </code>
                ) are cached and instantaneous
              </li>
              <li>
                After 60 seconds has passed, the next request will still return
                the cached (now stale) page
              </li>
              <li>
                The cache is invalidated and a new version of the page begins
                generating in the background
              </li>
              <li>
                Once generated successfully, the next request will return the
                updated page and cache it for subsequent requests
              </li>
              <li>
                If{" "}
                <code className="rounded bg-zinc-100 px-1 py-0.5 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
                  /blog/26
                </code>{" "}
                is requested, and it exists, the page will be generated
                on-demand at request time. If the post does not exist, then 404
                is returned.
              </li>
            </ul>
          </section>
        </CardContent>
      </Card>
      <Link
        href="/"
        className="font-medium text-sm text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
      >
        Back to home
      </Link>
    </div>
  );
}
